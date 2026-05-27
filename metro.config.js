const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// expo-sqlite no soporta web — tratar .wasm como asset
config.resolver.assetExts.push('wasm');

// Priorizar archivos nativos sobre web para Android/iOS
config.resolver.platforms = ['android', 'ios', 'native', 'web'];

module.exports = withNativeWind(config, { input: './global.css' });
