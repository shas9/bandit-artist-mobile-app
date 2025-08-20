const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add support for additional file extensions
config.resolver.assetExts.push(
  // Audio formats
  'mp3',
  'wav',
  'aac',
  'flac',
  'm4a',
  // Video formats
  'mp4',
  'mov',
  'avi',
  'mkv',
  // Document formats
  'pdf',
  'doc',
  'docx',
  // Font formats
  'otf'
);

// Add support for SVG
config.resolver.assetExts = config.resolver.assetExts.filter((ext) => ext !== 'svg');
config.resolver.sourceExts.push('svg');

// Enable CSS support for web (if needed)
config.resolver.sourceExts.push('css');

// Configure transformer for better performance
config.transformer.minifierConfig = {
  mangle: {
    keep_fnames: true,
  },
};

// Enable symlinks (useful for monorepos)
config.resolver.unstable_enableSymlinks = true;

// Configure watchman for better file watching
config.watchFolders = [__dirname];

module.exports = config;