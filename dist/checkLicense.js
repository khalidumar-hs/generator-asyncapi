"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/checkLicense.ts
var checkLicense_exports = {};
__export(checkLicense_exports, {
  default: () => checkLicense_default
});
module.exports = __toCommonJS(checkLicense_exports);
var import_chalk = __toESM(require("chalk"));

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
    console.log(import_chalk.default.bgRed(`
This plugin requires a license key to use`));
    console.log(import_chalk.default.redBright(`
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
    console.log(import_chalk.default.bgRed(`
Invalid license key`));
    console.log(import_chalk.default.redBright("Please check your plugin license key or purchase a license at https://eventcatalog.cloud/"));
    process.exit(1);
  }
  if (response.status === 200) {
    const data = await response.json();
    if (package_default.name !== data.plugin) {
      console.log(import_chalk.default.bgRed(`
Invalid license key for this plugin`));
      console.log(import_chalk.default.redBright("Please check your plugin license key or purchase a license at https://eventcatalog.cloud/"));
      process.exit(1);
    }
    if (data.is_trial) {
      console.log(import_chalk.default.bgBlue(`
You are using a trial license for this plugin`));
    }
  }
  return Promise.resolve();
};
//# sourceMappingURL=checkLicense.js.map