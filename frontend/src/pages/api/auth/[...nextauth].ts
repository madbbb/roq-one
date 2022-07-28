/* eslint-disable @roq/no-eslint-disable */
/* eslint-disable @roq/dir-contains-index */
import { i18n, localeMapping,publicConfig, serverConfig } from 'configuration/app';
import { AUTH_LOCALE_COOKIE_NAME } from 'modules/auth/constants';
import { createAuthBackendRequests } from 'modules/auth/utils/auth-backend-requests';
import { LoginCredentialsEnum } from 'modules/common/enums';
import { parseJwt } from 'modules/common/utils';
import { processLinkedinProfile } from 'modules/linkedin/utils';
import type { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import AppleProvider from 'next-auth/providers/apple';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import LinkedinProvider from 'next-auth/providers/linkedin';

const backend = createAuthBackendRequests(`${publicConfig.backend.graphqlUri}`, `${serverConfig.backend.apiKey}`);
export default (req: NextApiRequest, res: NextApiResponse): void | Promise<void> =>
  NextAuth(req, res, {
    // if NEXTAUTH_SECRET env variable is not configured/empty, then automatically generated by NextAuth is used
    secret: serverConfig.nextAuth.secret,
    session: serverConfig.nextAuth.session,
    jwt: serverConfig.nextAuth.jwt,
    pages: {
      signIn: '/login',
      error: '/login',
    },
    providers: [
      CredentialsProvider({
        id: LoginCredentialsEnum.Credentials,
        credentials: {
          email: { type: 'email' },
          password: { type: 'password' },
          keepMeLoggedIn: { type: 'boolean' },
        },
        authorize: (credentials) =>
          backend.login({
            email: credentials.email,
            password: credentials.password,
            keepMeLoggedIn: credentials.keepMeLoggedIn?.toLowerCase() === 'true',
          }),
      }),
      CredentialsProvider({
        id: LoginCredentialsEnum.AccountActivate,
        name: 'Account activation',
        credentials: {
          token: { type: 'text' },
        },
        authorize: (credentials) => backend.accountActivate({ token: credentials.token }),
      }),
      CredentialsProvider({
        id: LoginCredentialsEnum.RestorePassword,
        name: 'Restore password',
        credentials: {
          token: { type: 'text' },
          password: { type: 'password' },
        },
        authorize: (credentials) =>
          backend.restorePassword({ token: credentials.token, password: credentials.password }),
      }),
      GoogleProvider({
        clientId: serverConfig.google.clientId,
        clientSecret: serverConfig.google.clientSecret,
        profile(profile) {
          return {
            id: profile.id || profile.sub,
            email: profile.email,
            firstName: profile.given_name,
            lastName: profile.family_name,
            avatar: profile.picture,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any;
        },
      }),
      LinkedinProvider({
        clientId: serverConfig.linkedin.clientId,
        clientSecret: serverConfig.linkedin.clientSecret,
        profile: processLinkedinProfile,
      }),
      AppleProvider({
        clientId: serverConfig.apple.clientId,
        clientSecret: serverConfig.apple.clientSecret,
        /* eslint-disable @roq/no-spaces-in-object-definition */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        profile(profile: any) {
          return {
            id: profile.sub,
            email: profile.email,
            ...(profile.user?.name
              ? {
                  firstName: profile.user.name.firstName,
                  lastName: profile.user.name.lastName,
                }
              : {}),
          };
        },
      }),
    ],
    callbacks: {
      redirect({ url, baseUrl }) {
        if (url.startsWith(baseUrl)) return url;
        else if (url.startsWith('/')) return new URL(url, baseUrl).toString();
        return baseUrl;
      },
      jwt: async ({ token: originalTokenData, user, account }) => {
        const tokenData = { ...originalTokenData };
        const localeFromClientCookie = req.cookies[AUTH_LOCALE_COOKIE_NAME];
        const userLocale =
          localeMapping[i18n.locales.find((locale) => localeFromClientCookie === locale) || i18n.defaultLocale];

        if (user?.id && account?.provider) {
          const data = {
            providerId: account.provider,
            providerUserId: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            avatar: user.avatar,
            locale: userLocale,
          };
          user = await backend.providerLogin(data);
        }

        if (user) {
          const { accessToken, refreshToken, platformAccessToken } = user;
          let providerId = null;
          if (account?.provider && account?.type !== 'credentials') {
            providerId = account.provider;
          }
          Object.assign(tokenData, {
            accessToken,
            refreshToken,
            platformAccessToken,
            providerId,
          });
        }

        // See https://next-auth.js.org/tutorials/refresh-token-rotation for reference
        if (tokenData.accessToken && tokenData.refreshToken) {
          const now = Math.floor(new Date().getTime() / 1000);
          const parsedAccessToken = parseJwt(tokenData.accessToken as string);
          if (parsedAccessToken.exp < now) {
            const { accessToken, refreshToken } = await backend.refreshTokens(tokenData.refreshToken);

            Object.assign(tokenData, {
              accessToken,
              refreshToken,
            });
          }

          // if resultToken was not refreshed we reset session
          if (!tokenData.accessToken) {
            return {};
          }

          if (tokenData.platformAccessToken) {
            const parsedAccessTokenJwt = parseJwt(tokenData.platformAccessToken as string);

            if (parsedAccessTokenJwt.exp < now) {
              const { accessToken: platformAccessToken } = await backend.createPlatformToken(tokenData.accessToken);

              Object.assign(tokenData, {
                platformAccessToken,
              });
            }
          }
        }
        return tokenData;
      },
      session: async ({ session, token }) => {
        session.accessToken = token.accessToken as string;
        session.platformAccessToken = token.platformAccessToken;
        session.providerId = token.providerId;
        session.user = await backend.getUserInfo(token.accessToken, token.platformAccessToken);
        session.updatedAt = Date.now(); // to control updates on client

        return session;
      },
    },
    events: {
      async signOut({ token }) {
        if (token.accessToken) {
          await backend.logout(token.refreshToken);
        }
      },
    },
  });
