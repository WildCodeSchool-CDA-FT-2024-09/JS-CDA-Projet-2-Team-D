import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://api_data:4000",
  documents: ["src/schema/*.ts"],
  generates: {
    "./src/types/graphql-types.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
        "named-operations-object",
      ],
      config: {
        withHooks: true,
        scalars: {
          DateTimeISO: "string",
        },
      },
    },
  },
  overwrite: true,
};

export default config;
