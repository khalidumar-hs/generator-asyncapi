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
export {
  checkLicense_default as default
};
//# sourceMappingURL=checkLicense.mjs.map