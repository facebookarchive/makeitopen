---
id: 1-A1-local-setup
title: Running the App Locally
sidebar_label: Appendix I: Running the App Locally
---

While you can run the F8 App on your mobile device by downloading it from the [iOS App Store](https://itunes.apple.com/us/app/f8/id853467066) or the [Google Play Store](https://play.google.com/store/apps/details?id=com.facebook.f8), you might want to run it locally while reading these tutorials.

Follow this short guide to set up and run the source code locally on macOS (the Android version of React Native has [some support](http://facebook.github.io/react-native/docs/linux-windows-support.html#content) for Windows and Linux testing).

## Clone the repo

```
git clone https://github.com/fbsamples/f8app.git
cd f8app
```

## Install dependencies

### All platforms

[Yarn](https://yarnpkg.com/en/docs/install), for installing the NPM dependencies and running helper scripts.

[Watchman](https://facebook.github.io/watchman/docs/install.html), for the React Native packager to automatically detect your changes.

[Docker](https://docs.docker.com/engine/installation/), for running the local development server.

[Docker Compose](https://docs.docker.com/compose/install/), for running the local development server (included with Docker for Mac and Windows).

### Android

[Android Studio](https://developer.android.com/studio/install.html), for the Android SDK and tools.

_Make sure to install the SDK and build tools for API level 23 (see [here](https://facebook.github.io/react-native/docs/getting-started.html) for more details)._

### iOS

[Xcode 8.3 +](https://developer.apple.com/download/), for the iOS build toolchain and simulators.

Facebook SDK ([iOS](https://developers.facebook.com/docs/ios/)), for building Facebook functionality into the app.

_Make sure the files are in `~/Documents/FacebookSDK/`_

## Start the server


1. Start the local development server.

   ```
   yarn server
   ```

2. Check that the server is working correctly.
   
   _Go to the Parse Dashboard ([http://localhost:4040/apps/F8/](http://localhost:4040/apps/F8/)).
   Enter the username and password as admin to login, and it should look like this:_

   <img src="/images/parse-dashboard@2x.png" width="800">
   
   Login Credentials
   
   **Username**: admin
   
   **Password**: admin
   
## Run the App

### All platforms

1. Install the NPM dependencies.

  ```
  yarn
  ```

### Android

1. Connect a device or open an emulator.

2. Build and run the app.

  ```
  yarn android
  ```

### iOS

1. Open the Xcode project.

  ```
  yarn ios
  ```

2. Build and run the app in a simulator (`⌘R`).
