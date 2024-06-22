// Nxrender.node.ts

import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  NodeOperationError,
  IDataObject,
} from 'n8n-workflow';
import { createClient } from '@nexrender/api';

class Nxrender implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'NXRender',
    name: 'Nxrender',
    group: ['transform'],
    version: 1,
    description: 'Programmatic Nexrender n8n Node',
    defaults: {
      name: 'NXRender',
    },
    inputs: ['main'],
    outputs: ['main'],
    properties: [
      {
        displayName: 'API Endpoint',
        name: 'apiEndpoint',
        type: 'options',
        options: [
          {
            name: 'Create Job',
            value: 'createJob',
          },
          {
            name: 'Delete Job',
            value: 'deleteJob',
          },
          {
            name: 'Get Job Info',
            value: 'getJobInfo',
          },
          {
            name: 'Health Check',
            value: 'healthCheck',
          },
          {
            name: 'List Jobs',
            value: 'listJobs',
          },
          {
            name: 'Update Job',
            value: 'updateJob',
          },
        ],
        default: 'listJobs',
        description: 'Select the API endpoint to use',
      },
      {
        displayName: 'Job UID',
        name: 'uid',
        type: 'string',
        default: '',
        description: 'The UID of the new or existing job',
        displayOptions: {
          show: {
            apiEndpoint: ['getJobInfo', 'updateJob', 'deleteJob', 'createJob'],
          },
        },
        required: true,
      },
      {
        displayName: 'Template Source',
        name: 'templateSrc',
        type: 'string',
        default: 'templateDefault',
        placeholder: 'templateDefault',
        description: 'Path or URL to the After Effects project file',
        required: true,
        displayOptions: {
          show: {
            apiEndpoint: ['createJob', 'updateJob'],
          },
        },
      },
      {
        displayName: 'Composition',
        name: 'composition',
        type: 'string',
        default: 'main',
        placeholder: 'main',
        description: 'Name of the composition to render',
        required: true,
        displayOptions: {
          show: {
            apiEndpoint: ['createJob', 'updateJob'],
          },
        },
      },
      {
        displayName: 'Custom Output Config',
        name: 'customOutput',
        type: 'boolean',
        default: false,
        description: 'Whether to use custom output config',
        displayOptions: {
          show: {
            apiEndpoint: ['createJob', 'updateJob'],
          },
        },
      },
      {
        displayName: 'Output Extension',
        name: 'outputExtUser',
        type: 'string',
        default: undefined,
        placeholder: 'mov',
        displayOptions: {
          show: {
            apiEndpoint: ['createJob', 'updateJob'],
            customOutput: [true],
          },
        },
      },
      {
        displayName: 'Output Module',
        name: 'outputModuleUser',
        type: 'string',
        default: undefined,
        placeholder: 'Lossless',
        displayOptions: {
          show: {
            apiEndpoint: ['createJob'],
            customOutput: [true],
          },
        },
      },
      {
        displayName: 'Render Settings',
        name: 'renderSettingsUser',
        type: 'string',
        default: undefined,
        placeholder: 'Best Settings',
        displayOptions: {
          show: {
            apiEndpoint: ['createJob', 'updateJob'],
            customOutput: [true],
          },
        },
      },
      {
        displayName: 'Custom IN/OUT Points',
        name: 'customINOUT',
        type: 'boolean',
        default: false,
        description: 'Whether to use custom BEGIN & END frames',
        displayOptions: {
          show: {
            apiEndpoint: ['createJob', 'updateJob'],
            customOutput: [true],
          },
        },
      },
      {
        displayName: 'Frame Start',
        name: 'frameStart',
        type: 'number',
        default: undefined,
        placeholder: '0',
        description: 'Frame number to BEGIN on',
        required: true,
        displayOptions: {
          show: {
            customINOUT: [true],
            apiEndpoint: ['createJob', 'updateJob'],
            customOutput: [true],
          },
        },
      },
      {
        displayName: 'Frame End',
        name: 'frameEnd',
        type: 'number',
        default: undefined,
        placeholder: 'undefined',
        description: 'Frame number to END on',
        required: true,
        displayOptions: {
          show: {
            customINOUT: [true],
            apiEndpoint: ['createJob', 'updateJob'],
            customOutput: [true],
          },
        },
      },
      {
        displayName: 'Import Media',
        name: 'customMedia',
        type: 'boolean',
        default: false,
        description: 'Whether to import custom footge files',
        displayOptions: {
          show: {
            apiEndpoint: ['createJob', 'updateJob'],
          },
        },
      },
      {
        displayName: 'Media1 File',
        name: 'image1Src',
        type: 'string',
        default: undefined,
        placeholder: '/URL/or/Path/to/media.ext',
        displayOptions: {
          show: {
            apiEndpoint: ['createJob', 'updateJob'],
            customMedia: [true],
          },
        },
      },
      {
        displayName: 'Media1 Layer Name',
        name: 'image1Layer',
        type: 'string',
        default: undefined,
        placeholder: 'Layer Name for the Footage',
        displayOptions: {
          show: {
            apiEndpoint: ['createJob', 'updateJob'],
            customMedia: [true],
          },
        },
      },
      {
        displayName: 'Media2 Layer Source',
        name: 'image2Src',
        type: 'string',
        default: undefined,
        placeholder: '/URL/or/Path/to/media.ext',
        displayOptions: {
          show: {
            apiEndpoint: ['createJob', 'updateJob'],
            customMedia: [true],
          },
        },
      },
      {
        displayName: 'Media2 Layer Name',
        name: 'image2Layer',
        type: 'string',
        default: undefined,
        placeholder: 'Layer Name for the Footage',
        displayOptions: {
          show: {
            apiEndpoint: ['createJob', 'updateJob'],
            customMedia: [true],
          },
        },
      },
      {
        displayName: 'Audio Source',
        name: 'audioSrc',
        type: 'string',
        default: undefined,
        placeholder: '/path/to/audio.mp3',
        displayOptions: {
          show: {
            apiEndpoint: ['createJob', 'updateJob'],
            customMedia: [true],
          },
        },
      },
      {
        displayName: 'Audio Layer Name',
        name: 'audioLayer',
        type: 'string',
        default: undefined,
        placeholder: 'Layer Name for the audio file',
        displayOptions: {
          show: {
            apiEndpoint: ['createJob'],
            customMedia: [true],
          },
        },
      },
      {
        displayName: 'Change SourceText Values',
        name: 'customText',
        type: 'boolean',
        default: false,
        description: 'Whether to swap SourceText values',
        displayOptions: {
          show: {
            apiEndpoint: ['createJob', 'updateJob'],
          },
        },
      },
      {
        displayName: 'Text1 Value',
        name: 'text1Value',
        type: 'string',
        default: undefined,
        placeholder: 'SourceText for Text1',
        displayOptions: {
          show: {
            apiEndpoint: ['createJob', 'updateJob'],
            customText: [true],
          },
        },
      },
      {
        displayName: 'Text1 Layer Name',
        name: 'text1Layer',
        type: 'string',
        default: undefined,
        placeholder: 'Layer Name for Text1',
        displayOptions: {
          show: {
            apiEndpoint: ['createJob', 'updateJob'],
            customText: [true],
          },
        },
      },
      {
        displayName: 'Text2 Value',
        name: 'text2Value',
        type: 'string',
        default: undefined,
        placeholder: 'SourceText for Text2',
        displayOptions: {
          show: {
            apiEndpoint: ['createJob', 'updateJob'],
            customText: [true],
          },
        },
      },
      {
        displayName: 'Text2 Layer Name',
        name: 'text2Layer',
        type: 'string',
        default: undefined,
        placeholder: 'Layer Name for Text2',
        displayOptions: {
          show: {
            apiEndpoint: ['createJob', 'updateJob'],
            customText: [true],
          },
        },
      },
      {
        displayName: 'Additional Assets (Advanced)',
        name: 'customAssets',
        type: 'boolean',
        default: false,
        description: 'Whether to use JSON arrays for Asset Definitions',
        displayOptions: {
          show: {
            apiEndpoint: ['createJob', 'updateJob'],
          },
        },
      },
      {
        displayName: 'Custom JSON Assets',
        name: 'customJson',
        type: 'json',
        description: 'Custom JSON Data',
        typeOptions: {
          rows: 15,
        },
        displayOptions: {
          show: {
            apiEndpoint: ['createJob', 'updateJob'],
            customAssets: [true],
          },
        },
        default: `[
                    {
                        "type": "data",
                        "layerName": "my text layer",
                        "property": "Source Text",
                        "value": "My custom text"
                    },
                    {
                        "type": "data",
                        "layerName": "MyNicePicture.jpg",
                        "property": "Position",
                        "value": [500, 100]
                    },
                    {
                        "type": "data",
                        "layerName": "my text field",
                        "property": "Source Text",
                        "expression": "time > 100 ? 'Bye bye' : 'Hello world'"
                    },
                    {
                        "type": "data",
                        "layerName": "my text field",
                        "property": "Source Text.font",
                        "value": "Arial-BoldItalicMT"
                    },
                    {
                        "type": "data",
                        "layerName": "background",
                        "property": "Effects.Skin_Color.Color",
                        "value": [1, 0, 0]
                    },
                    {
                        "type": "data",
                        "layerIndex": 15,
                        "property": "Scale",
                        "expression": "[time * 0.1, time * 0.1]"
                    },
                    {
                        "src": "http://example.com/assets/something.json",
                        "type": "static"
                    },
                    {
                        "src": "http://example.com/assets/something_else.csv",
                        "name": "mydata.csv",
                        "type": "static"
                    },
                    {
                        "src": "file:///D:/assets/MyBigAsset.wav",
                        "type": "audio",
                        "useOriginal": true,
                        "layerIndex": 15
                    }
                ]`,
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: IDataObject[] = [];

    for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
      try {
        const credentials = (await this.getCredentials('NxrenderCredentialsApi')) as IDataObject;
        const apiEndpoint = this.getNodeParameter('apiEndpoint', itemIndex) as string;
        const uid = this.getNodeParameter('uid', itemIndex, '') as string;

        const client = createClient({
          host: credentials.baseUrl as string,
          secret: credentials.secret as string,
          polling: 3000,
        });
        switch (apiEndpoint) {
        case 'listJobs': {
          const result = await client.listJobs();
          returnData.push({ json: result });
          break;
        }
        case 'getJobInfo': {
          const result = await client.fetchJob(uid);
          returnData.push({ json: result });
          break;
        }
        case 'createJob': {
          const templateSrc = this.getNodeParameter('templateSrc', itemIndex) as string;
          const composition = this.getNodeParameter('composition', itemIndex) as string;

          const job: IDataObject = {
            template: {
              provider: 'file',
              src: templateSrc,
              composition: composition,
            },
            assets: [],
          };

          const image1Src = this.getNodeParameter('image1Src', itemIndex) as string;
          const image1Layer = this.getNodeParameter('image1Layer', itemIndex) as string;
          if (image1Src) {
            (job.assets as IDataObject[]).push({
              type: 'image',
              provider: 'file',
              src: image1Src,
              layer: image1Layer,
            });
          }

          const image2Src = this.getNodeParameter('image2Src', itemIndex) as string;
          const image2Layer = this.getNodeParameter('image2Layer', itemIndex) as string;
          if (image2Src) {
            (job.assets as IDataObject[]).push({
              type: 'image',
              provider: 'file',
              src: image2Src,
              layer: image2Layer,
            });
          }

          const audioSrc = this.getNodeParameter('audioSrc', itemIndex) as string;
          const audioLayer = this.getNodeParameter('audioLayer', itemIndex) as string;
          if (audioSrc) {
            (job.assets as IDataObject[]).push({
              type: 'audio',
              provider: 'file',
              src: audioSrc,
              layer: audioLayer,
            });
          }

          const customJson = this.getNodeParameter('customJson', itemIndex, '[]') as string;
          if (customJson) {
            const customAssets = JSON.parse(customJson) as IDataObject[];
            (job.assets as IDataObject[]).push(...customAssets);
          }

          const customOutput = this.getNodeParameter('customOutput', itemIndex) as boolean;
          if (customOutput) {
            const outputExt = this.getNodeParameter('outputExtUser', itemIndex) as string;
            const outputModule = this.getNodeParameter('outputModuleUser', itemIndex) as string;
            const renderSettings = this.getNodeParameter('renderSettingsUser', itemIndex) as string;
            job.outputExt = outputExt;
            job.outputModule = outputModule;
            job.renderSettings = renderSettings;
          }

          const customINOUT = this.getNodeParameter('customINOUT', itemIndex) as boolean;
          if (customINOUT) {
            const frameStart = this.getNodeParameter('frameStart', itemIndex) as number;
            const frameEnd = this.getNodeParameter('frameEnd', itemIndex) as number;
            (job.template as IDataObject).frameStart = frameStart;
            (job.template as IDataObject).frameEnd = frameEnd;
          }

          const result = await client.addJob(job);
          returnData.push({ json: result });
          break;
        }
        case 'updateJob': {
          // Implement updateJob logic
          break;
        }
        case 'deleteJob': {
          const result = await client.removeJob(uid);
          returnData.push({ json: result });
          break;
        }
        /**  case 'pickupJob': {
            const result = await client.pickupJob();
            returnData.push({ json: result });
            break;
          }
          case 'pickupJobWithTags': {
            // Implement pickupJobWithTags logic
            break;
          }
            */
        case 'healthCheck': {
          const result = await client.health();
          returnData.push({ json: result });
          break;
        }
        default: {
          throw new NodeOperationError(this.getNode(), `Unknown API Endpoint: ${apiEndpoint}`);
        }
        }


        returnData.push({ json: result });
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ json: { error: error.message } });
        } else {
          throw new NodeOperationError(this.getNode(), error);
        }
      }
    }

    return [this.helpers.returnJsonArray(returnData)];
  }
}

export { Nxrender };
