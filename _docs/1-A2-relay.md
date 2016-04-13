---
pageid: 1-A2-relay
series: buildingf8app
partlabel: Appendix II
type: appendix
title: Using Relay and GraphQL
layout: docs
permalink: /tutorials/building-the-f8-app/relay/
---

When we originally planned the app [we discussed the choice of data layer](tutorials/building-the-f8-app/planning/#data-access-with-react-native) and compared [Redux](https://github.com/rackt/redux) (which was eventually used), with an alternative Facebook Open Source project called [Relay](https://facebook.github.io/relay/).

At the time, Redux was chosen because it offered the simpler data impementation of the two, and was quicker and easier to integrate with our Parse data storage.

Once the app was released to the iOS and Android app stores, we wanted to revisit that choice, and look at how Relay could work with our app.

### Gradual Evolution

With traditional native app development, the choice to switch the data layer would usually lead to a whole-scale rewrite of the entire app, where the existing functionality would be entirely swapped out.

React Native is very different - we can retain the majority of our existing data setup (Redux, Parse, and the relevant bindings) while also switching to a new data layer for an individual View. Instead of having to rebuild the app from scratch, or do a messy refactor, we can simply adjust one section of the app to use a new data layer and let the rest continue to use the existing layer.

It is worth stating just how huge a benefit this is to continued development of an app - the ability to progressively enhance an app reduces the overhead for maintenance and updates drastically.

So how does using Relay and GraphQL compare to the Redux model of thinking about data?

### Introducing Relay and GraphQL

Firstly, and in very simple terms, [Relay](https://facebook.github.io/relay/) is the data framework that lives inside the app, and [GraphQL](http://graphql.org/) is a query language used within Relay to represent the data schema. GraphQL is also run on a server separately from the app to provide a data source for Relay to interact with (we will be covering the GraphQL server setup in a future tutorial, stay tuned!).

Relay isn't derived from the Flux architecture and is used only with GraphQL, which immediately means a big difference from the Redux model. The Store/Reducer/Component interaction we covered in the [data tutorial](tutorials/building-the-f8-app/data/) does not really exist with Relay. It takes a different approach, and removes a lot of the building work you normally need to do when integrating data.

With Relay, each React component specifies exactly what data it depends on, using GraphQL. Relay handles everything about fetching that data, providing the component with updates when the data changes, and caching the data client-side. Anytime the app wants to change the data itself, it creates a [GraphQL Mutation](https://facebook.github.io/relay/docs/guides-mutations.html#content) instead of an Action as with Redux.

### An Example from the F8 App

Given the ability to progressively change a small part of a React Native app, we chose, as a kind of proof-of-concept, to swap Redux for Relay in the Info View of the F8 app:

![Info view of F8 iOS app](static/images/info_view.png)

This part of the app is pretty much entirely separate from the rest, with largely non-interactive content, making it an ideal place to start.

The view itself contains an `<InfoList>` component that is pretty simple:

```js
/* from js/tabs/info/F8InfoView.js */
function InfoList({viewer: {config, faqs, pages}, ...props}) {
  return (
    <PureListView
      renderEmptyList={() => (
        <View>
          <WiFiDetails
            network={config.wifiNetwork}
            password={config.wifiPassword}
          />
          <CommonQuestions faqs={faqs} />
          <LinksList title="Facebook pages" links={pages} />
          <LinksList title="Facebook policies" links={POLICIES_LINKS} />
        </View>
      )}
      {...props}
    />
  );
}
```

This is just a basic layout with some other simple info displaying components inside of it, but where are the `props` and arguments in the component coming from? Well, inside the same .js file, we have a connected GraphQL fragment:

```js
/* from js/tabs/info/F8InfoView.js */
InfoList = Relay.createContainer(InfoList, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        config {
          wifiNetwork
          wifiPassword
        }
        faqs {
          question
          answer
        }
        pages {
          title
          url
          logo
        }
      }
    `,
  },
});
```

Here we're defining exactly what data the `<InfoList>` component needs to be displayed, as a GraphQL fragment. This corresponds to the GraphQL object that we are defining on our GraphQL server:

```js
/* from server/schema/schema.js */
var F8UserType = new GraphQLObjectType({
  name: 'User',
  description: 'A person who uses our app',
  fields: () => ({
    id: globalIdField('User'),
    name: {
      type: GraphQLString,
    },
    ...
    faqs: {
      type: new GraphQLList(F8FAQType),
      resolve: () => new Parse.Query(FAQ).find(),
    },
    pages: {
      type: new GraphQLList(F8PageType),
      resolve: () => new Parse.Query(Page).find(),
    },
    config: {
      type: F8ConfigType,
      resolve: () => Parse.Config.get(),
    }
  }),
  ...
});
```

You can see how the data is fetched by the GraphQL server, then Relay takes care of grabbing all the required data specified in the fragment. This data becomes available to the `<InfoList>` component as the `viewer` argument, and using some [destructuring assignments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment), in turn this creates the `config`, `faqs`, `pages` variables which are used within the component.

Thanks to Relay's built-in logic, we don't need to worry about subscribing to data changes, or caching data in a Store, or anything else - we just tell Relay what data our component should have, and we design our component in the standard React way. With our GraphQL server already set up, that's all we need to do.

We have no data changes in this view, however if you want to learn more about how they work, please [read the Relay docs on mutations](https://facebook.github.io/relay/docs/guides-mutations.html#content).
