export default {
  expo: {
    name: "Bandit Artist",
    slug: "bandit-artist-mobile-app",
    version: "1.0.0",
    orientation: "portrait",
    userInterfaceStyle: "automatic",
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.banditartist.app",
      buildNumber: "1.0.0"
    },
    android: {
      package: "com.banditartist.app",
      versionCode: 1
    },
    web: {
      bundler: "metro",
      output: "static"
    },
    plugins: [
      "expo-router"
    ],
    experiments: {
      typedRoutes: true
    },
    scheme: "bandit-artist",
    extra: {
      apiUrl: process.env.API_URL || "https://api.banditartist.com",
      environment: process.env.NODE_ENV || "development",
      eas: {
        projectId: "your-project-id-here"
      }
    }
  }
};