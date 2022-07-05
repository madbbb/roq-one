const routes = require('../names');

const en = {
  [routes.acceptInvite]: {
    pathname: '/accept-invite',
  },
  [routes.accountActivate]: {
    pathname: '/account-activate',
  },
  [routes.accountActivateProviderLink]: {
    pathname: '/account-activate-provider-link',
  },
  [routes.forgotPassword]: {
    pathname: '/forgot-password',
  },
  [routes.login]: {
    pathname: '/login',
  },
  [routes.messageCenter]: {
    pathname: '/message-center',
  },
  [routes.profile]: {
    pathname: '/profile/[userId]/[[...action]]',
  },
  [routes.register]: {
    pathname: '/register',
  },
  [routes.restorePassword]: {
    pathname: '/restore-password',
  },
  [routes.settings]: {
    pathname: '/settings',
  },
  [routes.users]: {
    pathname: '/users',
  },
  [routes.usersActive]: {
    pathname: '/users/active',
  },
  [routes.usersInvited]: {
    pathname: '/users/invited',
  },
  [routes.usersCanceled]: {
    pathname: '/users/canceled',
  },
  [routes.userEdit]: {
    pathname: '/users/edit/[id]',
  },
  [routes.files]: {
    pathname: '/files',
  },
  [routes.filesEdit]: {
    pathname: '/files/edit/[id]',
  },
  [routes.typography]: {
    pathname: '/typography',
  },
  [routes.home]: {
    pathname: '/',
  },
  [routes.imprint]: {
    pathname: '/imprint',
  },
  [routes.terms]: {
    pathname: '/terms',
  },
  [routes.privacy]: {
    pathname: '/privacy',
  },
  [routes.dataPreferences]: {
    pathname: '/data-preferences',
  },
  [routes.exampleAuthors]: {
    pathname: '/example/authors',
  },
  [routes.exampleBooks]: {
    pathname: '/example/books',
  },
  [routes.exampleCreateAuthor]: {
    pathname: '/example/author/create',
  },
  [routes.exampleEditAuthor]: {
    pathname: '/example/author/edit/[id]',
  },
  [routes.exampleCreateBook]: {
    pathname: '/example/book/create',
  },
  [routes.exampleEditBook]: {
    pathname: '/example/book/edit/[id]',
  },
};

module.exports = en;