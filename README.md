# eslint-plugin-export-default-last

rr

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `@exodus/eslint-plugin-export-default-last`:

```sh
npm install eslint-plugin-export-default-last --save-dev
```

## Usage

Add `export-default-last` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "export-default-last"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "eslint-plugin-export-default-last/default-last": 2
    }
}
```

