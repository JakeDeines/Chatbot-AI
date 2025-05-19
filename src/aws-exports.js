const awsExports = {
  Auth: {
    Cognito: {
      userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
      userPoolClientId: process.env.REACT_APP_COGNITO_CLIENT_ID,
      loginWith: { oauth: true },
      oauth: {
        domain: process.env.REACT_APP_COGNITO_DOMAIN,
        scopes: ['openid', 'email', 'profile'],
        redirectSignIn: ['http://localhost:3000/'],
        redirectSignOut: ['http://localhost:3000/'],
        responseType: 'code',
      },
    },
  },
};

export default awsExports;
