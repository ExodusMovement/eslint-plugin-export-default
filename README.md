# @exodus/eslint-plugin-export-default

checks if default export is last line in the file

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `@exodus/eslint-plugin-export-default`:

```sh
yarn add -D @exodus/eslint-plugin-export-default
```

## Usage

Add `@exodus/eslint-plugin-export-default` to the plugins section of your `eslint.config.js` configuration file.

```js
{
    "plugins": [
        "export-default": "@exodus/eslint-plugin-export-default"
    ]
}
```


Then configure the rules you want to use under the rules section.

```js
{
    "rules": {
        "@exodus/export-default/last": "error",
        "@exodus/export-default/named": "error"
    }
}
```
