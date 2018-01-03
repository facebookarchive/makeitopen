---
id: 1-1-planning
title: Planning The App
sidebar_label: Part 1: Planning The App
permalink: /tutorials/building-the-f8-app/planning/
---

*This is a series of tutorials designed to introduce React Native and its Open Source ecosystem in plain English, written alongside the building of the F8 2016 app for [Android](https://play.google.com/store/apps/details?id=com.facebook.f8) and [iOS](https://itunes.apple.com/us/app/f8/id853467066).*

In this first part, we're going to talk about how we planned the app; in later parts we will share sample code, discuss multi-platform design considerations, analyze the data layer in our app, and explain our testing strategy.

### Switching to React Native

In 2015 the F8 iOS app was built using React Native, but the Android version used native code; in previous years both were built using native iOS and Android code. Since then, React Native has been released for Android, which presented an opportunity to cut the surface area of the app's logic and UI code. Some Facebook teams have seen [around 85% re-use of app code](https://code.facebook.com/posts/1189117404435352/react-native-for-android-how-we-built-the-first-cross-platform-react-native-app/) when using React Native.

React Native also provides the benefit of being able to quickly prototype visual components in a tight loop with UI designers - something we'll discuss in [part two](1-2-design.md).

So, if we've switched to React Native, what else do we need to consider? Let's start with the content.

### Choosing a Data Layer

The 2014 and 2015 apps both used [Parse Cloud Code](https://parse.com/) as a data backend. Therefore when beginning to plan the 2016 app, Parse had the advantage by allowing re-use of existing data structures and getting started quickly.

There were other reasons for using Parse - much of the content displayed within the app needs to be updated with great frequency, up to and including during the conference itself, and it needs to be updatable without requiring any technical expertise (beyond familiarity with spreadsheet editing, for example). The Parse Cloud Code dashboard was the perfect tool to meet these needs.

Given all this, Parse became the best choice for this app's data backend. In light of the [Parse Cloud Code shutdown announcement](http://blog.parse.com/announcements/moving-on/), we decided to transition to use the newly open-sourced [Parse Server](http://blog.parse.com/announcements/introducing-parse-server-and-the-database-migration-tool/) and [Parse Dashboard](https://github.com/ParsePlatform/parse-dashboard) projects.

React Native doesn't need to be tightly connected to a data layer. For example, development of the UI and app logic in a React Native app can be done with simple mock data. This means that as long as the structure of the data remains the same, you can swap the data source of a fully built app with minimal amounts of adjustment. For the F8 App this meant we could very easily transition from Parse Cloud Code to the open source Parse Server after the app had already been developed. We'll cover this more in the [data tutorial](1-3-data.md).

### Data Access with React Native

To get Parse and React Native working together, there is an existing [Parse + React package](https://github.com/ParsePlatform/ParseReact) that provides the necessary binding tools, but there was a problem - due to the vagaries of conference wi-fi and connectivity, the F8 app must be able to work offline. Since Parse + React did not support offline syncing of data when the F8 app was being built, we had to construct our own offline support.

There was another factor in choosing our data access layer - team size. For example, Relay, a JavaScript framework for accessing data, would be more appropriate for a larger team working at scale, but the F8 app was being developed by one person, with a few others in support for design. This had a big influence on the type of data access method we chose in the F8 app.

What about [GraphQL](http://graphql.org/) and [Relay](https://facebook.github.io/relay/)? While they work extremely well with React Native, Relay did not ([at the time](https://github.com/facebook/relay/wiki/Roadmap#in-progress)) have built-in support for offline usage, and GraphQL wasn't supported out of the box by Parse. Building the app using them would have required building APIs for GraphQL-Parse, and hacking together an offline storage method for Relay.

GraphQL server setup was also relatively complex for one person with a short deadline. Bearing in mind that when the app was being developed for release in the app stores, we wanted the simplest and fastest options, what other choices were there?

Given the above, [Redux](https://github.com/rackt/redux) was the best choice for the app. Redux offers a simple implementation of the [Flux architecture](https://facebook.github.io/flux/), providing more control over how the data can be stored and cached, essentially enabling the app to sync one-way from Parse Cloud.

For the app's store version, Redux provided the best balance of functionality and ease of use for this app. After the app was released, we revisited this and built some usage of Relay and GraphQL into parts of the app, and we'll cover that transition in the [Relay and GraphQL Addendum](tutorials/building-the-f8-app/relay/).

### Our Development Stack

With React Native as our chosen app framework, and Redux used for the data layer, we needed to pick some supporting technologies and tools:

* The open-sourced [Parse Server](https://github.com/ParsePlatform/parse-server) provided data storage - running on [Node.js](https://nodejs.org/en/).
* [Flow](http://flowtype.org/) was enabled to catch typing errors in our React Native JavaScript code.
* Unit tests for the [Jest framework](http://facebook.github.io/jest/) were written for more complex functions.
* We used the [React Native Facebook SDK](https://github.com/facebook/react-native-fbsdk) for quick iOS and Android access to Facebook integration.
* We used Facebook's [Nuclide](http://nuclide.io/) editor on OSX with its [built-in support for React Native](http://nuclide.io/docs/platforms/react-native/).
* We used git for version control, and stored progress on [GitHub](https://github.com/fbsamples/f8app).

There are some additional small packages we used that we'll highlight as we go through each tutorial.

*Before you continue with later sections, we recommend you learn the basics about [React.js from the project's own tutorial](http://facebook.github.io/react/docs/tutorial.html) - specifically its [concept of modular components](http://facebook.github.io/react/docs/thinking-in-react.html#step-1-break-the-ui-into-a-component-hierarchy) and [JSX syntax](http://facebook.github.io/react/docs/jsx-in-depth.html). Then [follow React Native's introductory tutorial](http://facebook.github.io/react-native/docs/tutorial.html#content) which will show you the basics about applying this to mobile apps.*
