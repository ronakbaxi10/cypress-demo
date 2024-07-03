module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node" : true
    },
    "extends": [
    "eslint:recommended",
    "plugin:cypress/recommended"
    ],
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    }
};
