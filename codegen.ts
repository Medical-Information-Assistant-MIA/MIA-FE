import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'https://80c588ca-d345-476a-9b32-91010b89634f.mock.pstmn.io/graphql',
  documents: ['src/**/*.tsx'],
  generates: {
    './src/types.ts': {
      preset: 'client',
      plugins: ['typescript'],
      presetConfig: {
        gqlTagName: 'gql',
      }
    }
  },
  ignoreNoDocuments: true,
};

export default config;