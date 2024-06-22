// NxrenderCredentialsApi.credentials.d.ts
import { ICredentialType, INodeProperties, IHttpRequestMethods } from 'n8n-workflow';

export class NxrenderCredentialsApi implements ICredentialType {
  name = 'nxrenderCredentialsApi';
  displayName = 'NXRender Credentials API';
  properties: INodeProperties[] = [
    {
      displayName: 'Server URL',
      name: 'baseUrl',
      type: 'string',
      default: 'http://my.server.com:3050',
      placeholder: 'http://my.server.com:3050',
      description: 'The base URL for the programmatic server',
    },
    {
      displayName: 'Nexrender Secret',
      name: 'secret',
      type: 'string',
      default: 'myapisecret',
      placeholder: 'myapisecret',
      description: 'To be sent in the nexrender-secret header',
    },
    {
      displayName: 'Default Template Source',
      name: 'templateDefault',
      type: 'string',
      default: 'file:///myProject.aep',
      placeholder: 'file:///myProject.aep',
      description: 'Path or URL to the AE Project file',
    },
    {
      displayName: 'Default Output Extension',
      name: 'outputExtDefault',
      type: 'string',
      default: 'mov',
      placeholder: 'mov',
    },
    {
      displayName: 'Default Output Module',
      name: 'outputModuleDefault',
      type: 'string',
      default: 'Lossless',
      placeholder: 'Lossless',
    },
    {
      displayName: 'Default Render Settings',
      name: 'renderSettingsDefault',
      type: 'string',
      default: 'Best Settings',
      placeholder: 'Best Settings',
    },
  ];
  authenticate = {
    type: 'generic' as const,  // Ensures 'generic' is the exact string type
    properties: {
      headers: {
        'nexrender-secret': '={{ $credentials.secret }}',
      },
    },
  };
  test = {
    request: {
      baseURL: '={{ $credentials.baseUrl }}',
      url: '/api/v1/health',
      method: 'GET' as IHttpRequestMethods,  // Ensures method is one of the allowed HTTP methods
    },
  };
}
