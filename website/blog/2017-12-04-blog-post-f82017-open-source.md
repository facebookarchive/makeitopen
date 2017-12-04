---
title: F8 2017 App Open Source
author: Johnston Jiaa
authorTitle: Software Engineer at Facebook
authorURL: https://github.com/oclbdk
authorFBID: 752670135
authorTwitter: oclbdk
category: announcements
---

Since 2015, we've open sourced the F8 conference app. This gives developers insights into how we build at Facebook and is a great showcase for how Facebook open source projects work together. We've even heard from developers that the F8 app is a great resource for learning how to build a relatively complex React Native project.

![F8 2017 App](/images/f8app-2017-app.png)

We didn't want this year to be any different so today, we're releasing the code behind the 2017 app and refreshing the [supporting website](http://makeitopen.com/).

As we planned our open-source efforts, we wanted to make sure the developer experience was as smooth as possible whilst showcasing recent best practices. For example, when we started out we found that developers needed to install the required npm packages, install MongoDB, import the sample data, setup the Parse and GraphQL servers, then run the React Native apps. There were many friction and potential failure points. We decided to use [Docker](https://www.docker.com/) and [Yarn](https://yarnpkg.com/) for the setup, cutting the required steps down to just three:

Run the server:

```console
yarn server
```

Run the client:

```console
yarn
yarn ios / yarn android
```

This results in a reproducible, consistent environment so developers can quickly get up and running looking at code rather than wrangling with install-related issues.

We added [Prettier](https://prettier.io/) to the developer workflow as a commit hook to improve code consistency. We hope this will reduce churn around code reviews related to conforming to code conventions. 

We updated the app to show how GraphQL and Relay Modern could be integrated within React Native.

We revamped the underlying website infrastructure, making it easier to support language translations and versioning. Our hope is that this will encourage localization efforts and introduce open source to wider audiences.

Check this project out if you're building a conference app and need somewhere to start. Work through the documentation and code if you want to learn more about how you can integrate React Native, Jest, Flow, GraphQL, Relay, Redux, and Parse Server. We look forward to your feedback and would love to see contributions to the project to make it better - whether you're improving the code, the infrastructure, or even the documentation.

Last but not least, see you next year at [F8 2018](https://www.f8.com/)!
