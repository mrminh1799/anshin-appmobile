const presets = ['module:metro-react-native-babel-preset']
const plugins = []

plugins.push([
    'module-resolver',
    {
        root: ['./src'],
        extensions: ['.js', '.json'],
        alias: {
            '@': './src',
        },
    },
])
plugins.push([
    "module:react-native-dotenv",
    {
        "envName": "APP_ENV",
        "moduleName": "@env",
        "path": ".env",
        "blocklist": null,
        "allowlist": null,
        "blacklist": null, // DEPRECATED
        "whitelist": null, // DEPRECATED
        "safe": false,
        "allowUndefined": true,
        "verbose": false
    },
])

plugins.push([
    "react-native-reanimated/plugin"
])

module.exports = {
    presets,
    plugins,
}
