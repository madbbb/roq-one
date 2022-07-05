import { yup } from 'modules/common/validation';

export interface AppPrivateConfigInterface {
  backend: {
    apiKey: string;
  };
  platform: {
    tenantId: string;
    apiKey: string;
    serviceAccount: string
  };
  google: {
    clientId: string;
    clientSecret: string;
  };
  linkedin: {
    clientId: string;
    clientSecret: string;
  };
  apple: {
    clientId: string;
    clientSecret: string;
  };
  nextAuth: {
    secret: string;
    session: {
      maxAge?: number;
    };
    jwt: {
      secret?: string;
    };
  };
}

let serverConfig: AppPrivateConfigInterface;

if (typeof window === 'undefined') {
  // will be cutted by webpack on client side
  serverConfig = Object.freeze({
    backend: {
      apiKey: yup.string().trim().default('CHANGE_ME_3').validateSync(process.env.NEXT_PUBLIC_BACKEND_API_KEY),
    },
    platform: {
      tenantId: yup.string().trim().default('CHANGE_ME_2').validateSync(process.env.TENANT_ID),
      apiKey: yup.string().trim().default('CHANGE_ME_2').validateSync(process.env.API_KEY),
      serviceAccount: yup.string().trim().default('project-service-account@roq.tech').validateSync(process.env.ROQ_PLATFORM_SERVICE_ACCOUNT_EMAIL)
    },
    google: {
      clientId: yup
        .string()
        .trim()
        .default('285701372632-tnfg6ts212bnqoeio1hrhosmrte00hqc.apps.googleusercontent.com')
        .validateSync(process.env.GOOGLE_CLIENT_ID),
      clientSecret: yup
        .string()
        .trim()
        .default('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')
        .validateSync(process.env.GOOGLE_CLIENT_SECRET),
    },
    linkedin: {
      clientId: yup.string().trim().default('77ur05vja2ehus').validateSync(process.env.LINKEDIN_CLIENT_ID),
      clientSecret: yup.string().trim().default('LjxYohan153uz9PR').validateSync(process.env.LINKEDIN_CLIENT_SECRET),
    },
    apple: {
      clientId: yup.string().trim().default('com.roq-one.development').validateSync(process.env.APPLE_CLIENT_ID),
      clientSecret: yup
        .string()
        .trim()
        .default(
          'eyJhbGciOiJFUzI1NiIsInR5cCI6Imp3dCIsImtpZCI6IkpNV1A1MjRBTTkifQ.eyJpc3MiOiI1OUpLQzM4TDU0IiwiYXVkIjoiaHR0cHM6Ly9hcHBsZWlkLmFwcGxlLmNvbSIsInN1YiI6ImNvbS5yb3Etb25lLmRldmVsb3BtZW50IiwiaWF0IjoxNjQ3MzcxNjU3LCJleHAiOjE2NjMxMzk2NTd9.4xme3wp3x_fJbImAJqJxyGmmLINDy9PVZTA7695hbdQ9AGmG-awZYSFyi8jxbJ_qpk4_ZW3QeuFp4PN8je0wIg',
        )
        .validateSync(process.env.APPLE_CLIENT_SECRET),
    },
    nextAuth: {
      secret: yup.string().trim().default('CHANGE_ME_4').validateSync(process.env.NEXTAUTH_SECRET),
      session: {
        maxAge: yup
          .number()
          .default(30 * 24 * 60 * 60)
          .validateSync(process.env.NEXTAUTH_SESSION_TTL),
      },
      jwt: {
        secret: yup.string().trim().default('CHANGE_ME_5').validateSync(process.env.NEXTAUTH_ENCRYPTION_KEY),
      },
    },
  });
}
export { serverConfig };
