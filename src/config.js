const processEnv = {};
const envs = {...process.env, ...process.client_envs};

Object.keys(envs).forEach((k) => {
  processEnv[k.toUpperCase()] = envs[k];
});

const nonSensitiveSharedConfig = {
  AuthServiceEndpoint: 'https://login.universalconnectproject.org/api',
  Component: 'uvcs-demo',
  CryptoAlgorithm: 'aes-256-cbc',
  SophtronApiServiceEndpoint: 'https://api.sophtron.com/api',
  SophtronVCServiceEndpoint: 'https://vc.sophtron.com/api/',
}

const keysToPullFromEnv = [
  "LogLevel",
  "Port",
  "Env",

  "UcpClientId",
  "UcpClientSecret",
  "UcpEncryptionKey",

  "SophtronApiUserId",
  "SophtronApiUserSecret",

  "MxClientId",
  "MxApiSecret", 
  "MxClientIdProd",
  "MxApiSecretProd",

  "AkoyaClientId",
  "AkoyaApiSecret", 
  "AkoyaClientIdProd",
  "AkoyaApiSecretProd",

  "FinicityPartnerId",
  "FinicityAppKey",
  "FinicitySecret",
  "FinicityPartnerIdProd",
  "FinicityAppKeyProd",
  "FinicitySecretProd",
]

const config = keysToPullFromEnv.reduce((acc, envKey) => {
  return {
    ...acc,
    [envKey]: processEnv[envKey.toUpperCase()]
  }
}, {
  ...nonSensitiveSharedConfig
})

module.exports = config;
