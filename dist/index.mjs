// src/index.ts
import { Parser, fromFile, fromURL } from "@asyncapi/parser";
import utils from "@eventcatalog/sdk";
import { readFile } from "node:fs/promises";
import argv from "minimist";
import yaml from "js-yaml";
import { z } from "zod";
import chalk2 from "chalk";
import path from "path";
import { AvroSchemaParser } from "@asyncapi/avro-schema-parser";

// src/utils/schemas.ts
var getFileExtentionFromSchemaFormat = (format = "") => {
  if (format.includes("avro")) return "avsc";
  if (format.includes("yml")) return "yml";
  if (format.includes("json")) return "json";
  if (format.includes("openapi")) return "openapi";
  if (format.includes("protobuf")) return "protobuf";
  if (format.includes("yaml")) return "yaml";
  return "json";
};

// src/utils/messages.ts
var defaultMarkdown = (_document, message) => {
  return `
## Architecture
<NodeGraph />

${messageHasSchema(message) && messageIsJSON(message) ? `
## Schema
<SchemaViewer file="${getSchemaFileName(message)}" title="Message Schema" maxHeight="500" />
` : ""}
${messageHasSchema(message) && !messageIsJSON(message) ? `
## Schema
<Schema file="${getSchemaFileName(message)}" title="Message Schema" maxHeight="500" />
` : ""}

${message.externalDocs() ? `
## External documentation
- [${message.externalDocs()?.description()}](${message.externalDocs()?.url()})
` : ""}

`;
};
var getSummary = (message) => {
  const messageSummary = message.hasSummary() ? message.summary() : "";
  const messageDescription = message.hasDescription() ? message.description() : "";
  let eventCatalogMessageSummary = messageSummary;
  if (!eventCatalogMessageSummary) {
    eventCatalogMessageSummary = messageDescription && messageDescription.length < 150 ? messageDescription : "";
  }
  return eventCatalogMessageSummary;
};
var messageHasSchema = (message) => {
  return message.hasPayload() && message.schemaFormat();
};
var messageIsJSON = (message) => {
  const fileName = getSchemaFileName(message);
  return fileName.endsWith(".json");
};
var getSchemaFileName = (message) => {
  const extension = getFileExtentionFromSchemaFormat(message.schemaFormat());
  return `schema.${extension}`;
};
var getMessageName = (message) => {
  return message.hasTitle() && message.title() ? message.title() : message.id();
};
var getChannelsForMessage = (message, channels, document) => {
  let channelsForMessage = [];
  const globalVersion = document.info().version();
  for (const channel of channels) {
    for (const channelMessage of channel.messages()) {
      if (channelMessage.id() === message.id()) {
        channelsForMessage.push(channel);
      }
    }
  }
  for (const messageChannel of message.channels()) {
    channelsForMessage.push(messageChannel);
  }
  const uniqueChannels = channelsForMessage.filter(
    (channel, index, self) => index === self.findIndex((t) => t.id() === channel.id())
  );
  return uniqueChannels.map((channel) => {
    const channelVersion = channel.extensions().get("x-eventcatalog-channel-version")?.value() || globalVersion;
    return {
      id: channel.id(),
      version: channelVersion
    };
  });
};

// src/utils/services.ts
var defaultMarkdown2 = (document) => {
  return `

${document.info().hasDescription() ? `${document.info().description()}` : ""}  

## Architecture diagram
<NodeGraph />

${document.info().externalDocs() ? `
## External documentation
- [${document.info().externalDocs()?.description()}](${document.info().externalDocs()?.url()})
` : ""}
`;
};
var getSummary2 = (document) => {
  const summary = document.info().hasDescription() ? document.info().description() : "";
  return summary && summary.length < 150 ? summary : "";
};

// src/utils/domains.ts
var defaultMarkdown3 = (document) => {
  return `

## Architecture diagram
<NodeGraph />

`;
};

// src/utils/channels.ts
var getChannelProtocols = (channel) => {
  const protocols = [];
  const bindings = channel.bindings();
  for (const binding of bindings) {
    protocols.push(binding.protocol());
  }
  return protocols;
};
var defaultMarkdown4 = (_document, channel) => {
  return `
  ${channel.hasDescription() ? `
  ## Overview
  ${channel.description()}
  ` : ""}

  <ChannelInformation />

  ${channel.json()?.externalDocs ? `
  ## External documentation
  - [${channel.json()?.externalDocs?.description}](${channel.json()?.externalDocs?.url})
  ` : ""}
  
  `;
};

// src/checkLicense.ts
import chalk from "chalk";

// package.json
var package_default = {
  name: "@khalidumar-hs/generator-asyncapi",
  version: "2.7.5",
  description: "AsyncAPI generator for EventCatalog",
  scripts: {
    build: "tsup",
    test: "vitest",
    format: "prettier --write .",
    "format:diff": "prettier --list-different .",
    changeset: "changeset",
    release: "changeset publish"
  },
  publishConfig: {
    access: "public"
  },
  keywords: [],
  author: "khalidumar-hs",
  license: "ISC",
  devDependencies: {
    "@changesets/cli": "^2.27.9",
    "@types/fs-extra": "^11.0.4",
    "@types/js-yaml": "^4.0.9",
    "@types/lodash": "^4.17.7",
    "@types/minimist": "^1.2.5",
    "@types/node": "^20.16.1",
    prettier: "^3.3.3",
    tsup: "^8.1.0",
    typescript: "^5.5.3",
    vitest: "^2.0.2"
  },
  files: [
    "dist",
    "package.json"
  ],
  main: "./dist/index.js",
  module: "./dist/index.mjs",
  types: "./dist/index.d.ts",
  dependencies: {
    "@asyncapi/avro-schema-parser": "^3.0.24",
    "@asyncapi/parser": "^3.3.0",
    "@eventcatalog/sdk": "^1.4.4",
    chalk: "^4",
    "fs-extra": "^11.2.0",
    glob: "^11.0.0",
    "gray-matter": "^4.0.3",
    "js-yaml": "^4.1.0",
    lodash: "^4.17.21",
    minimist: "^1.2.8",
    slugify: "^1.6.6",
    zod: "^3.23.8"
  },
  directories: {
    example: "examples"
  },
  repository: {
    type: "git",
    url: "https://github.com/khalidumar-hs/generator-asyncapi.git"
  },
  bugs: {
    url: "https://github.com/khalidumar-hs/generator-asyncapi/issues"
  },
  homepage: "https://github.com/khalidumar-hs/generator-asyncapi#readme"
};

// src/checkLicense.ts
var checkLicense_default = async (licenseKey) => {
  const LICENSE_KEY = process.env.EVENTCATALOG_LICENSE_KEY_ASYNCAPI || licenseKey || null;
  if (!LICENSE_KEY) {
    console.log(chalk.bgRed(`
This plugin requires a license key to use`));
    console.log(chalk.redBright(`
Visit https://eventcatalog.cloud/ to get a 14 day trial or purchase a license`));
    process.exit(1);
  }
  const response = await fetch("https://api.eventcatalog.cloud/functions/v1/license", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LICENSE_KEY}`,
      "Content-Type": "application/json"
    }
  });
  if (response.status !== 200) {
    console.log(chalk.bgRed(`
Invalid license key`));
    console.log(chalk.redBright("Please check your plugin license key or purchase a license at https://eventcatalog.cloud/"));
    process.exit(1);
  }
  if (response.status === 200) {
    const data = await response.json();
    if (package_default.name !== data.plugin) {
      console.log(chalk.bgRed(`
Invalid license key for this plugin`));
      console.log(chalk.redBright("Please check your plugin license key or purchase a license at https://eventcatalog.cloud/"));
      process.exit(1);
    }
    if (data.is_trial) {
      console.log(chalk.bgBlue(`
You are using a trial license for this plugin`));
    }
  }
  return Promise.resolve();
};

// src/index.ts
var parser = new Parser();
parser.registerSchemaParser(AvroSchemaParser());
var cliArgs = argv(process.argv.slice(2));
var optionsSchema = z.object({
  licenseKey: z.string().optional(),
  services: z.array(
    z.object({
      id: z.string({ required_error: "The service id is required. please provide the service id" }),
      path: z.string({ required_error: "The service path is required. please provide the path to specification file" }),
      name: z.string().optional(),
      version: z.string().optional()
    }),
    { message: "Please provide correct services configuration" }
  ),
  domain: z.object({
    id: z.string({ required_error: "The domain id is required. please provide a domain id" }),
    name: z.string({ required_error: "The domain name is required. please provide a domain name" }),
    version: z.string({ required_error: "The domain version is required. please provide a domain version" })
  }).optional(),
  debug: z.boolean().optional(),
  parseSchemas: z.boolean().optional(),
  parseChannels: z.boolean().optional(),
  saveParsedSpecFile: z.boolean({ invalid_type_error: "The saveParsedSpecFile is not a boolean in options" }).optional()
});
var validateOptions = (options) => {
  try {
    optionsSchema.parse(options);
  } catch (error) {
    if (error instanceof z.ZodError) throw new Error(JSON.stringify(error.issues, null, 2));
  }
};
var index_default = async (config, options) => {
  if (!process.env.PROJECT_DIR) {
    process.env.PROJECT_DIR = process.cwd();
  }
  if (!process.env.PROJECT_DIR) {
    throw new Error("Please provide catalog url (env variable PROJECT_DIR)");
  }
  await checkLicense_default(options.licenseKey);
  const {
    writeService,
    writeEvent,
    writeCommand,
    writeQuery,
    getService,
    versionService,
    getDomain,
    writeDomain,
    addServiceToDomain,
    getCommand,
    getEvent,
    getQuery,
    versionCommand,
    versionEvent,
    versionQuery,
    addSchemaToCommand,
    addSchemaToEvent,
    addSchemaToQuery,
    addFileToService,
    versionDomain,
    getSpecificationFilesForService,
    writeChannel,
    getChannel,
    versionChannel
  } = utils(process.env.PROJECT_DIR);
  const MESSAGE_OPERATIONS = {
    event: {
      write: writeEvent,
      version: versionEvent,
      get: getEvent,
      addSchema: addSchemaToEvent
    },
    command: {
      write: writeCommand,
      version: versionCommand,
      get: getCommand,
      addSchema: addSchemaToCommand
    },
    query: {
      write: writeQuery,
      version: versionQuery,
      get: getQuery,
      addSchema: addSchemaToQuery
    }
  };
  validateOptions(options);
  const { services, saveParsedSpecFile = false, parseSchemas = true, parseChannels = false } = options;
  console.log(chalk2.green(`Processing ${services.length} AsyncAPI files...`));
  for (const service of services) {
    console.log(chalk2.gray(`Processing ${service.path}`));
    const { document, diagnostics } = service.path.startsWith("http") ? await fromURL(parser, service.path).parse({
      parseSchemas
    }) : await fromFile(parser, service.path).parse({
      parseSchemas
    });
    if (!document) {
      console.log(chalk2.red("Failed to parse AsyncAPI file"));
      if (options.debug || cliArgs.debug) {
        console.log(diagnostics);
      } else {
        console.log(chalk2.red("Run with debug option in the generator to see diagnostics"));
      }
      continue;
    }
    const operations = document.allOperations();
    const channels = document.allChannels();
    const documentTags = document.info().tags().all() || [];
    const serviceId = service.id;
    const serviceName = service.name || document.info().title();
    const version = service.version || document.info().version();
    let sends = [];
    let receives = [];
    let owners = null;
    let repository = null;
    let serviceSpecifications = {};
    let serviceSpecificationsFiles = [];
    let serviceMarkdown = defaultMarkdown2(document);
    if (options.domain) {
      const { id: domainId, name: domainName, version: domainVersion } = options.domain;
      const domain = await getDomain(options.domain.id, domainVersion || "latest");
      const currentDomain = await getDomain(options.domain.id, "latest");
      console.log(chalk2.blue(`
Processing domain: ${domainName} (v${domainVersion})`));
      if (currentDomain && currentDomain.version !== domainVersion) {
        await versionDomain(domainId);
        console.log(chalk2.cyan(` - Versioned previous domain (v${currentDomain.version})`));
      }
      if (!domain || domain && domain.version !== domainVersion) {
        await writeDomain({
          id: domainId,
          name: domainName,
          version: domainVersion,
          markdown: defaultMarkdown3(document)
          // services: [{ id: serviceId, version: version }],
        });
        console.log(chalk2.cyan(` - Domain (v${domainVersion}) created`));
      }
      if (currentDomain && currentDomain.version === domainVersion) {
        console.log(chalk2.yellow(` - Domain (v${domainVersion}) already exists, skipped creation...`));
      }
      await addServiceToDomain(domainId, { id: serviceId, version }, domainVersion);
    }
    if (parseChannels) {
      for (const channel of channels) {
        const channelAsJSON = channel.json();
        const channelId = channel.id();
        const params = channelAsJSON?.parameters || {};
        const protocols = getChannelProtocols(channel);
        const channelVersion = channel.extensions().get("x-eventcatalog-channel-version")?.value() || version;
        let channelMarkdown = defaultMarkdown4(document, channel);
        console.log(chalk2.blue(`Processing channel: ${channelId} (v${channelVersion})`));
        const paramsForCatalog = Object.keys(params).reduce(
          (acc, key) => {
            const param = params[key];
            acc[key] = {};
            if (param.enum) acc[key].enum = param.enum;
            if (param.default) acc[key].default = param.default;
            if (param.examples) acc[key].examples = param.examples;
            if (param.description) acc[key].description = param.description;
            return acc;
          },
          {}
        );
        const catalogedChannel = await getChannel(channelId, "latest");
        if (catalogedChannel) {
          channelMarkdown = catalogedChannel.markdown;
          if (catalogedChannel.version !== channelVersion) {
            await versionChannel(channelId);
            console.log(chalk2.cyan(` - Versioned previous channel: ${channelId} (v${channelVersion})`));
          }
        }
        await writeChannel(
          {
            id: channelId,
            name: channelAsJSON?.title || channel.id(),
            markdown: channelMarkdown,
            version: channelVersion,
            ...Object.keys(paramsForCatalog).length > 0 && { parameters: paramsForCatalog },
            ...channel.address() && { address: channel.address() },
            ...channelAsJSON?.summary && { summary: channelAsJSON.summary },
            ...protocols.length > 0 && { protocols }
          },
          { override: true }
        );
        console.log(chalk2.cyan(` - Message ${channelId} (v${version}) created`));
      }
    }
    for (const operation of operations) {
      for (const message of operation.messages()) {
        const eventType = message.extensions().get("x-eventcatalog-message-type")?.value() || "event";
        const messageVersion = message.extensions().get("x-eventcatalog-message-version")?.value() || version;
        const serviceOwnsMessageContract = isServiceMessageOwner(message);
        const isReceived = operation.action() === "receive" || operation.action() === "subscribe";
        const isSent = operation.action() === "send" || operation.action() === "publish";
        const messageId = message.id().toLowerCase();
        if (eventType !== "event" && eventType !== "command" && eventType !== "query") {
          throw new Error("Invalid message type");
        }
        const {
          write: writeMessage,
          version: versionMessage,
          get: getMessage,
          addSchema: addSchemaToMessage
        } = MESSAGE_OPERATIONS[eventType];
        let messageMarkdown = defaultMarkdown(document, message);
        const badges = message.tags().all() || [];
        console.log(chalk2.blue(`Processing message: ${getMessageName(message)} (v${messageVersion})`));
        if (serviceOwnsMessageContract) {
          const catalogedMessage = await getMessage(message.id().toLowerCase(), "latest");
          if (catalogedMessage) {
            messageMarkdown = catalogedMessage.markdown;
            if (catalogedMessage.version !== messageVersion) {
              await versionMessage(messageId);
              console.log(chalk2.cyan(` - Versioned previous message: (v${catalogedMessage.version})`));
            }
          }
          const channelsForMessage = parseChannels ? getChannelsForMessage(message, channels, document) : [];
          await writeMessage(
            {
              id: messageId,
              version: messageVersion,
              name: getMessageName(message),
              summary: getSummary(message),
              markdown: messageMarkdown,
              badges: badges.map((badge) => ({ content: badge.name(), textColor: "blue", backgroundColor: "blue" })),
              schemaPath: messageHasSchema(message) ? getSchemaFileName(message) : void 0,
              ...channelsForMessage.length > 0 && { channels: channelsForMessage }
            },
            {
              override: true,
              path: message.id()
            }
          );
          console.log(chalk2.cyan(` - Message (v${messageVersion}) created`));
          if (messageHasSchema(message)) {
            const schema = message.payload()?.extensions()?.get("x-parser-original-payload")?.json() || message.payload()?.json();
            await addSchemaToMessage(
              messageId,
              {
                fileName: getSchemaFileName(message),
                schema: JSON.stringify(schema, null, 4)
              },
              messageVersion
            );
            console.log(chalk2.cyan(` - Schema added to message (v${messageVersion})`));
          }
        } else {
          console.log(chalk2.yellow(` - Skipping external message: ${getMessageName(message)}(v${messageVersion})`));
        }
        if (isSent) sends.push({ id: messageId, version: messageVersion });
        if (isReceived) receives.push({ id: messageId, version: messageVersion });
      }
    }
    const latestServiceInCatalog = await getService(serviceId, "latest");
    console.log(chalk2.blue(`Processing service: ${serviceId} (v${version})`));
    if (latestServiceInCatalog) {
      serviceMarkdown = latestServiceInCatalog.markdown;
      owners = latestServiceInCatalog.owners || [];
      repository = latestServiceInCatalog.repository || null;
      if (latestServiceInCatalog.version !== version) {
        await versionService(serviceId);
        console.log(chalk2.cyan(` - Versioned previous service (v${latestServiceInCatalog.version})`));
      }
      if (latestServiceInCatalog.version === version) {
        serviceMarkdown = latestServiceInCatalog.markdown;
        serviceSpecifications = latestServiceInCatalog.specifications ?? {};
        sends = latestServiceInCatalog.sends ? [...latestServiceInCatalog.sends, ...sends] : sends;
        receives = latestServiceInCatalog.receives ? [...latestServiceInCatalog.receives, ...receives] : receives;
        serviceSpecificationsFiles = await getSpecificationFilesForService(serviceId, version);
      }
    }
    const fileName = path.basename(service.path);
    await writeService(
      {
        id: serviceId,
        name: serviceName,
        version,
        summary: getSummary2(document),
        badges: documentTags.map((tag) => ({ content: tag.name(), textColor: "blue", backgroundColor: "blue" })),
        markdown: serviceMarkdown,
        sends,
        receives,
        schemaPath: fileName || "asyncapi.yml",
        specifications: {
          ...serviceSpecifications,
          asyncapiPath: fileName || "asyncapi.yml"
        },
        ...owners && { owners },
        ...repository && { repository }
      },
      {
        override: true
      }
    );
    const specFiles = [
      // add any previous spec files to the list
      ...serviceSpecificationsFiles,
      {
        content: saveParsedSpecFile ? getParsedSpecFile(service, document) : await getRawSpecFile(service),
        fileName: path.basename(service.path) || "asyncapi.yml"
      }
    ];
    for (const specFile of specFiles) {
      await addFileToService(
        serviceId,
        {
          fileName: specFile.fileName,
          content: specFile.content
        },
        version
      );
    }
    console.log(chalk2.cyan(` - Service (v${version}) created`));
    console.log(chalk2.green(`
Finished generating event catalog for AsyncAPI ${serviceId} (v${version})`));
  }
};
var getParsedSpecFile = (service, document) => {
  const isSpecFileJSON = service.path.endsWith(".json");
  return isSpecFileJSON ? JSON.stringify(document.meta().asyncapi.parsed, null, 4) : yaml.dump(document.meta().asyncapi.parsed, { noRefs: true });
};
var getRawSpecFile = async (service) => {
  if (service.path.startsWith("http")) {
    try {
      const response = await fetch(service.path);
      return response.text();
    } catch (error) {
      console.log(chalk2.red(`
Failed to request AsyncAPI file from ${service.path}`));
      return "";
    }
  } else {
    return await readFile(service.path, "utf8");
  }
};
var isServiceMessageOwner = (message) => {
  const value = message.extensions().get("x-eventcatalog-role")?.value() || "provider";
  return value === "provider";
};
export {
  index_default as default
};
//# sourceMappingURL=index.mjs.map