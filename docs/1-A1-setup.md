---
id: 1-A1-local-setup
title: Running the App Locally
sidebar_label: Appendix I: Running the App Locally
---

While you can run the F8 App on your mobile device by downloading it from the [iOS App Store](https://itunes.apple.com/us/app/f8/id853467066), or the [Google Play Store](https://play.google.com/store/apps/details?id=com.facebook.f8), you might want to run it locally while reading these tutorials.

Follow this short guide to setup and run the source code locally on OSX (the Android version of React Native has [some support](http://facebook.github.io/react-native/docs/linux-windows-support.html#content) for Windows and Linux testing).

### Requirements

Before you get started, you'll need to install some pre-requisites:

1. [React Native](http://facebook.github.io/react-native/docs/getting-started.html) (follow iOS and Android guides)
2. [CocoaPods](http://cocoapods.org) 1.0+ (only for iOS)
3. [MongoDB](https://www.mongodb.org/downloads) (needed to run Parse Server locally)

### Setup

#### 1. **Clone the repo**

```
$ git clone https://github.com/fbsamples/f8app.git
$ cd f8app
```

#### 2. **Install dependencies** (npm v3+):

```
$ npm install
$ (cd ios; pod install)        # only for iOS version
```

#### 3. **Make sure MongoDB is running:**

```
$ lsof -iTCP:27017 -sTCP:LISTEN
```

or if using external MongoDB server, set `DATABASE_URI`:

```
$ export DATABASE_URI=mongodb://example-mongo-hosting.com:1337/my-awesome-database
```

#### 4. **Start Parse/GraphQL servers:**

```
$ npm start
```

#### 5. **Import sample data** (the local Parse Server should be running):

```
$ npm run import-data
```

Make sure everything works by visiting:

* Parse Dashboard: [http://localhost:8080/dashboard](http://localhost:8080/dashboard)
* Graph*i*QL: [http://localhost:8080/graphql](http://localhost:8080/graphql?query=query+%7B%0A++schedule+%7B%0A++++title%0A++++speakers+%7B%0A++++++name%0A++++++title%0A++++%7D%0A++++location+%7B%0A++++++name%0A++++%7D%0A++%7D%0A%7D)

![Parse Dashboard](/images/screenshot-server@2x.png)

#### 6. **Running the Android version**:

```
$ react-native run-android
$ adb reverse tcp:8081 tcp:8081   # required to ensure the Android app can
$ adb reverse tcp:8080 tcp:8080   # access the Packager and GraphQL server
```


#### 7. **Running the iOS version:**

```
$ react-native run-ios
```