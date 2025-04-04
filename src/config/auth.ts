export const AUTH_CONFIG = {
  clientId: 'Ov23li8WiEu9TmRU700s',
  redirectUri: `${window.location.origin}/auth/callback`,
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  scope: 'read:user user:email codespace',
  tokenEndpoint: 'https://fastify-serverless-function-olive.vercel.app/token',
  userInfoEndpoint: 'https://api.github.com/user',
  setTokenEndpoint: 'http://localhost:3000/return_token',
}; 