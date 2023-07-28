type ConfigAppDefaultType = {
  [key: string]: string;
}

const ConfigAppDefault: ConfigAppDefaultType = {
  ENV_APP_NAME: 'nestjs-template-claro',
  ENV_METHOD_NAME: 'method-name',
  ENV_TIMEOUT_HTTP: '28000',
  ENV_BACKEND_APP_NAME: 'jsonplaceholder',
  ENV_URL_BACKEND: 'https://jsonplaceholder.typicode.com/users',
};

export default ConfigAppDefault;