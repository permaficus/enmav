# enMAV 

<p align="left">
<code><img src="https://img.shields.io/badge/Only-blue?logo=TypeScript&logoSize=auto&labelColor=white"></code>
<code><img src="https://img.shields.io/badge/npm-red?logo=npm&logoSize=auto&labelColor=white"></code>
</p>

Just another auto semantic versioning for NPM publisher

### 👀 How it works ?

Every time you build or patch your TypeScript project, enMAV will automatically increment the patch/build value in the package.json file. It's as simple as that, and then you can publish it to NPM.

### Installation

```shell
npm i enmav -g
```

### Usage

```shell
# init will create enMAV config file
enmav --init

# Or

# you can add your favourite bundler on init
enmav --init --bundler rollup
# default bundler would be tsc if you don`t specified any
# this will add extra script command in your package.json
```

The output would be :
```json
{
  "name": "your-ts-app",
  "version": "1.0.0",
  "main": "index.ts",
  "scripts": {
    "build:asv": "enmav --update-version && rollup"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": ""
}
```

### Configuration

To specify the maximum build number and minor version number, refer to the example below. The configuration file is located in the root of your project folder.

`enmav.config.json`

```json
{
  "updaterOptions": {
    "packageFile": "./package.json",
    "buildMax": 100,
    "minorMax": 20,
    "bundler": "tsc"
  }
}
```


