---
pageid: 1-1-planning
title: Building the F8 App
subtitle: Planning The App
layout: docs
permalink: /tutorials/building-the-f8-app/planning/
seriesintro: >
  <p>Every year, as part of the F8 conference, Facebook builds iOS and Android apps. The apps give attendees a schedule for the conference, let them learn more about the talks and speakers, and, in previous years, have provided reminders for upcoming talks and ad-hoc announcements to attendees.</p>

  <p>This year, we wanted to not only release the source code, but also to produce a series of tutorials designed to introduce React Native and its Open Source ecosystem in plain English, written alongside the building of the F8 2016 app for Android and iOS.</p>
seriessplash: /static/images/f8_app_splash.png
intro: >
  In this first part, we're going to talk about how we planned the app, and how and why we picked the stack of technologies to use.
---

## Planning the App

*This is a series of tutorials designed to introduce React Native and its Open Source ecosystem in plain English, written alongside the building of the F8 2016 app for Android and iOS.*

Every year, as part of [the F8 conference](https://www.fbf8.com/), Facebook builds iOS and Android apps. The apps give attendees a schedule for the conference, let them learn more about the talks and speakers, and, in previous years, have provided reminders for upcoming talks and ad-hoc announcements to attendees. The source code of the 2014 version of the app is [available on Github](https://github.com/ParsePlatform/f8DeveloperConferenceApp). In 2016, we are not only releasing the source code, but we also wanted to discuss Open Source projects used to make the app, and provide insight into the decisions that were made when building it.

We're going to grow this tutorial series as the app is built. Elements, such as code samples, will evolve and improve over time. Comments and feedback are welcome via [GitHub issues](https://github.com/facebook/junction/issues).

In this first part, we're going to talk about how we planned the app; in later parts we will share sample code, discuss multi-platform design considerations, analyze the data layer in our app, and explain our testing strategy.

### Switching to React Native

In 2015, the F8 iOS app was built using React Native, but the Android version used native code, and in previous years both were built using native iOS and Android code. Since then, React Native has been released for Android, which presented an opportunity to cut the surface area of the app's logic and UI code. Some Facebook teams have seen [around 85% re-use of app code](https://code.facebook.com/posts/1189117404435352/react-native-for-android-how-we-built-the-first-cross-platform-react-native-app/) when using React Native.

React Native also provides the benefit of being able to quickly prototype visual components in a tight loop with UI designers - something we'll discuss in [part two]({{ site.baseurl }}/tutorials/building-the-f8-app/design/).

So, if we're switching to React Native, what else do we need to consider? Let's start with the content.

### Choosing a Data Layer

The 2014 and '15 apps had both used [Parse Cloud Code](https://parse.com/) as a data backend. Therefore when beginning to plan the 2016 app, Parse had an advantage in being able to re-use existing data structures, providing a faster way to get started on building.

There were other considerations too - much of the content displayed within the app needs to be updated with great frequency, up to and including during the conference itself, and it needs to be updatable without requiring any technical expertise (beyond familiarity with spreadsheet editing, for example).

Given these requirements, and the existing usage of it in earlier apps, Parse became the best choice for this app's data backend. Sadly, however, in January 2016 Parse [announced](http://blog.parse.com/announcements/moving-on/) they'd be winding down their service, and discontinuing it in 2017. This doesn't affect the 2016 F8 app as the conference will be finished by the time the Parse service is closed. However, we wanted the app's source code (and this tutorial) to be useful to the open source community, so we decided to use the newly open-sourced [Parse Server](http://blog.parse.com/announcements/introducing-parse-server-and-the-database-migration-tool/).

Luckily, React Native doesn't need to be tightly connected to a data layer; development of the UI and app logic could continue, using mock data, in parallel with making decisions over Parse.

### Data Access with React Native

When it comes to Parse and React Native working together, there is an existing [Parse + React package](https://github.com/ParsePlatform/ParseReact) that would provide the necessary binding tools, but there is a problem - due to the vagaries of conference wi-fi and connectivity, the F8 app must be able to work offline. Since Parse + React does not yet support offline syncing of data, so we will have to build our own offline support.

There's another factor in making this decision - team size. Some of the options available would be more appropriate for a larger team working at scale, but the F8 app is being built by one person, with a few others in support. This will influence which data access method gets chosen.

What about [GraphQL](http://graphql.org/) and [Relay](https://facebook.github.io/relay/)? While they work extremely well with React Native, Relay does not ([yet](https://github.com/facebook/relay/wiki/Roadmap#in-progress)) have built-in support for offline usage, and GraphQL isn't supported out of the box by Parse. Building the app using them would require building APIs for GraphQL-Parse, and hacking together an offline storage method for Relay. This could be an option, but GraphQL server setup is also relatively complex for one person with a short deadline. Bearing in mind we want the simplest and fastest option, what other choices are there?

Given the above requirements, [Redux](https://github.com/rackt/redux) looks like the best choice for the app. Redux offers a simple implementation of the [Flux architecture](https://facebook.github.io/flux/), providing more control over how the data can be stored and cached, essentially enabling the app to sync one-way from Parse Cloud. In the future we might revisit this decision, for example if the scale of the app were to grow, Relay might become a more favourable option. For now Redux provides the best balance of functionality and ease of use for this app.

### Our Development Stack

With React Native as our chosen app framework, and Redux used for the data layer, we need to pick some supporting technologies and tools:

* The open-sourced [Parse Server](https://github.com/ParsePlatform/parse-server) will provide data storage - running on [Node.js](https://nodejs.org/en/).
* [Flow](http://flowtype.org/) is enabled to catch typing errors in our React Native JavaScript code.
* Unit tests for the [Jest framework](http://facebook.github.io/jest/) will be written for more complex functions.
* Use the [React Native Facebook SDK](https://github.com/facebook/react-native-fbsdk) for quick iOS and Android access to Facebook integration.
* We'll be using Facebook's [Nuclide](http://nuclide.io/) editor on OSX with its [built-in support for React Native](http://nuclide.io/docs/platforms/react-native/).
* We'll use git for version control, and store progress on GitHub.

We'll also highlight some additional small packages as we go through each part.

<!---
TOWATCH: Update info about Parse Server
-->

*Before you continue with later sections, we recommend you know the basics about [React.js from the project's own tutorial](http://facebook.github.io/react/docs/tutorial.html) - specifically its [concept of modular components](http://facebook.github.io/react/docs/thinking-in-react.html#step-1-break-the-ui-into-a-component-hierarchy) and [JSX syntax](http://facebook.github.io/react/docs/jsx-in-depth.html). Then [React Native's tutorial](http://facebook.github.io/react-native/docs/tutorial.html#content) will show you the basics about applying this to mobile apps.*

[*In the next part, we'll look at cross-platform design in React Native.*]({{ site.baseurl }}/tutorials/building-the-f8-app/design/)
