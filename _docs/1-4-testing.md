---
pageid: 1-4-testing
series: buildingf8app
partlabel: Part 4
title: Testing a React Native App
layout: docs
permalink: /tutorials/building-the-f8-app/testing/
intro: >
  Explore how you can use Nuclide, Flow, and Jest with React Native to improve the quality of your code as you're writing it.
---

*This is a series of tutorials designed to introduce React Native and its Open Source ecosystem in plain English, written alongside the building of the F8 2016 app for [Android](https://play.google.com/store/apps/details?id=com.facebook.f8) and [iOS](https://itunes.apple.com/us/app/f8/id853467066).*

In classic software development life cycles, the testing phase is always seen as just that - a distinct phase that usually happens near the end of development. This can be even more true when working with freshly minted Open Source frameworks, because their releases tend to not be accompanied by any kind of testing technology.

Luckily, React Native was built by Facebook from the very beginning with continuous testing techniques in mind. In this part we'll explore how you can use [Nuclide](http://nuclide.io), [Flow](http://flowtype.org), and [Jest](http://facebook.github.io/jest/) with React Native to improve the quality of your code as you're writing it.

### Flow: Type-checking to Stop Writing Bad Code

[Flow](http://flowtype.org) provides JavaScript with [static type checking](http://flowtype.org/docs/about-flow.html#_), and works in a gradual way, allowing you to slowly add Flow features to your code. This is really useful because we can introduce type checking in particular parts of the code without having to re-write the entire app to be Flow-compatible.

In our F8 app, we decided from the start to use React Native with Flow in its most complete form, adding [type annotations](http://flowtype.org/docs/type-annotations.html#_) everywhere necessary, and letting Flow work its magic as we progressed.

For example, lets look at one of the simple Actions we described in the [Data tutorial]({{ site.baseurl }}/tutorials/building-the-f8-app/data/):

```js
/* from js/actions/login.js */

/*
 * @flow
 */

...

function skipLogin(): Action {
  return {
    type: 'SKIPPED_LOGIN',
  };
}
```

We've added the `@flow` flag to the file header (which [tells Flow to check the code](http://flowtype.org/docs/getting-started.html#_)) and then we're using Flow's [type annotations](http://flowtype.org/docs/type-annotations.html#_) to indicate that whatever is returned by `skipLogin()` must be of type `Action`. But that type isn't built into React Native, or Redux, so we have defined it ourselves:

```js
/* from js/actions/types.js */

export type Action =
    { type: 'LOADED_ABOUT', list: Array<ParseObject> }
  | { type: 'LOADED_NOTIFICATIONS', list: Array<ParseObject> }
  | { type: 'LOADED_MAPS', list: Array<ParseObject> }
  | { type: 'LOADED_FRIENDS_SCHEDULES', list: Array<{ id: string; name: string; schedule: {[key: string]: boolean}; }> }
  | { type: 'LOADED_CONFIG', config: ParseObject }
  | { type: 'LOADED_SESSIONS', list: Array<ParseObject> }
  | { type: 'LOADED_SURVEYS', list: Array<Object> }
  | { type: 'SUBMITTED_SURVEY_ANSWERS', id: string; }
  | { type: 'LOGGED_IN', data: { id: string; name: string; sharedSchedule: ?boolean; } }
  | { type: 'RESTORED_SCHEDULE', list: Array<ParseObject> }
  | { type: 'SKIPPED_LOGIN' }
  | { type: 'LOGGED_OUT' }
  | { type: 'SESSION_ADDED', id: string }
  | { type: 'SESSION_REMOVED', id: string }
  | { type: 'SET_SHARING', enabled: boolean }
  | { type: 'APPLY_TOPICS_FILTER', topics: {[key: string]: boolean} }
  | { type: 'CLEAR_FILTER' }
  | { type: 'SWITCH_DAY', day: 1 | 2 }
  | { type: 'SWITCH_TAB', tab: 'schedule' | 'my-schedule' | 'map' | 'notifications' | 'info' }
  | { type: 'TURNED_ON_PUSH_NOTIFICATIONS' }
  | { type: 'REGISTERED_PUSH_NOTIFICATIONS' }
  | { type: 'SKIPPED_PUSH_NOTIFICATIONS' }
  | { type: 'RECEIVED_PUSH_NOTIFICATION', notification: Object }
  | { type: 'SEEN_ALL_NOTIFICATIONS' }
  | { type: 'RESET_NUXES' }
  ;

```

Here we have created a [Flow type alias](http://flowtype.org/docs/type-aliases.html#_) that says that anything of type `Action` must be one of a series of different potential object shapes. The `SKIPPED_LOGIN` Action must only contain its own type label, whereas for comparison, a `LOADED_SURVEYS` Action must return the type label and a list item. We can see that the relevant Action Creator does just that:

```js
/* from js/actions/surveys.js */
async function loadSurveys(): Promise<Action> {
  const list = await Parse.Cloud.run('surveys');
  return {
    type: 'LOADED_SURVEYS',
    list,
  };
}
```

Because we are using lots of different Actions in the app, this strong typing check lets us know simple things like having a typo in the type label, or more important things like the data payload being in the wrong format.

We also then get the same strong typing checks in our Reducers:

```js
/* from js/reducers/surveys.js */
function surveys(state: State = [], action: Action): State {
  if (action.type === 'LOADED_SURVEYS') {
    return action.list;
  }
  ...
  return state;
}
```

Because the `action` argument is typed as the same `Action` as above, the Reducer function must use an `action.type` that is valid. We can also use type aliases to define shapes for the Reducer's `state` tree section:

```js
/* from js/reducers/user.js */
export type State = {
  isLoggedIn: boolean;
  hasSkippedLogin: boolean;
  sharedSchedule: ?boolean;
  id: ?string;
  name: ?string;
};

const initialState = {
  isLoggedIn: false,
  hasSkippedLogin: false,
  sharedSchedule: null,
  id: null,
  name: null,
};

function user(state: State = initialState, action: Action): State {
  ...
}
```

We showed you this `initialState` object in the [data tutorial]({{ site.baseurl }}/tutorials/building-the-f8-app/data/), but now you can see how we have forced this `state` tree section to conform to a defined Flow type. If the Reducer is sent, or tries to return, any `state` that doesn't conform to this same shape, we'll see a Flow type checking error.

Note that Flow checks are run at compile-time only, and the React Native packager [strips them automatically](https://github.com/facebook/react-native/blob/master/babel-preset/configs/main.js#L32) - this means using Flow in your code doesn't have any kind of runtime performance penalty.

Of course, right now, we still have to manually run the Flow type-checker every time we want to test some code (using the [Flow command line interface](http://flowtype.org/docs/cli.html#_)) but we can also use Nuclide to get this kind of verification *as we write the code*.

### Nuclide: A React Native-aware Development Environment

The [Nuclide website](http://nuclide.io/docs/platforms/react-native/) contains a full rundown of the kind of React Native tailored features it offers, but suffice to say, it's a first-class IDE for React Native, built for the same people at Facebook who created React Native, and who use it to write Facebook apps every day.

The Flow integration is what we're specifically interested in though. Here we can see a sample of code from the same user Reducer that we showed with the typed `state` object above:

```js
  if (action.type === 'SKIPPED_LOGIN') {
    return {
      isLoggedIn: false,
      hasSkippedLogin: true,
      sharedSchedule: null,
      id: null,
      name: null,
    };
  }
```

As we said before, we have defined the shape that the Reducer function must return, and with Nuclide, we can see our mistakes happening in real-time:

<video width="1174" height="1002" autoplay loop>
  <source src="static/videos/flow.mp4" type="video/mp4">
  Your browser does not support the HTML5 video tag.
</video>

If we leave out any part of the State type, something that could happen accidentally but frequently when rapidly building an app, we get instant feedback that we aren't returning the correct type of object.

Nuclide will do this for all of our relevant Flow type-checking. This means, instead of waiting until the app is nearly completely built, type errors are spotted, and mistakes corrected, as the code is being written.

It might seem unintuitive, but this actually sped up development - unravelling un-typed code can be really difficult, and doing it all when you've already built your app can be messy.

### Jest: Unit Testing for Bug-Free Changes

[Jest](http://facebook.github.io/jest/) provides a unit test framework for JavaScript, and works well with [React Native apps](http://facebook.github.io/react-native/docs/testing.html#content).

We are using these unit tests to ensure that already built, functional code isn't modified in a way that introduces bugs (also called regression testing).

For example, we want to have a Jest test that ensures the Reducer handling maps data continued to work as expected:

```js
jest.autoMockOff();

const Parse = require('parse');
const maps = require('../maps');

describe('maps reducer', () => {

  it('is empty by default', () => {
    expect(maps(undefined, {})).toEqual([]);
  });

  it('populates maps from server', () => {
    let list = [
      new Parse.Object({mapTitle: 'Day 1', mapImage: new Parse.File('1.png')}),
      new Parse.Object({mapTitle: 'Day 2', mapImage: new Parse.File('2.png')}),
    ];

    expect(
      maps([], {type: 'LOADED_MAPS', list})
    ).toEqual([{
      id: jasmine.any(String),
      title: 'Day 1',
      url: '1.png',
    }, {
      id: jasmine.any(String),
      title: 'Day 2',
      url: '2.png',
    }]);
  });

});
```

Jest is really easy to read (note that even our Jest tests are Flow typed!), but we'll break it down. At line 4 we're including the maps Reducer function (`js/reducers/maps.js`) so that it can be used directly in the unit test (Reducer functions being [pure functions](https://en.wikipedia.org/wiki/Pure_function) means this is easily done).

The first test at line 8 is then ensuring that the Reducer function returns an empty array. If you look at the Reducer code itself in `js/reducers/maps.js` you'll see that it doesn't have any initial state, which is why we want an empty array from the unit test.

The second test at line 12 is ensuring that when the map data is retrieved from the Parse API it is correctly transformed by the Reducer function into the correct structure for the `state` tree. In this test we are using mock data objects that fully mimic the structure of the actual Parse-stored data - this would avoid any API connection issues causing this test to fail.

Now we have to make running the Jest tests part of our development workflow - for example, before every Git commit - and we can be more confident that changes to existing code won't silently break the app.

The fact that Redux Reducers mutate the `state` tree in our app makes it absolutely vital that bugs aren't introduced, especially as bugs with `state` mutation could easily be missed as they might not break anything functionally, instead just sending the wrong data to our Parse Server. Their pure function nature also makes them ideal candidates for regression testing because we can more accurately predict how they should perform every time.

### Debugging

When you're trying to locate a bug, or find a fix for one, it's helpful to have some debugging tools on hand. We've already described [how we built a system for debugging our app's visual elements]({{ site.baseurl }}/tutorials/building-the-f8-app/design/#the-design-iteration-cycle), but what about the data?

We're using the [Chrome Developer Tools](https://facebook.github.io/react-native/docs/debugging.html#chrome-developer-tools) through [Nuclide](http://nuclide.io/docs/features/debugger/) along with the [Redux Logger](http://evgenyrodionov.github.io/redux-logger/) middleware, which provides the console with additional Redux context such as Actions or `state` changes in Reducers:

![Redux Logger Middleware in action with additional console context](static/images/redux_logger.png)

You can see how we enable this via our `configureStore` function:

```js
/* from js/store/configureStore.js */
var createLogger = require('redux-logger');
...
var isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;
var logger = createLogger({
  predicate: (getState, action) => isDebuggingInChrome,
  collapsed: true,
  duration: true,
});

var createF8Store = applyMiddleware(thunk, promise, array, logger)(createStore);

function configureStore(onComplete: ?() => void) {
  const store = autoRehydrate()(createF8Store)(reducers);
  persistStore(store, {storage: AsyncStorage}, onComplete);
  if (isDebuggingInChrome) {
    window.store = store;
  }
  return store;
}
```

At line 5 we're creating the Logger middleware [with some options](https://github.com/fcomb/redux-logger#options-1) and then at line 10 we're applying it using Redux's [`applyMiddleware()` function](http://redux.js.org/docs/api/applyMiddleware.html). This is all we need to do in order to see those logging entries show up in the console.

At line 4 we're triggering extra debugging functionality by using a [global variable](http://www.w3schools.com/js/js_scope.asp) called `__DEV__` that'll let us switch into and out of debugging mode with a simple boolean change. Not only does this determine whether the created logger middleware actually logs actions (using the [`predicate` option](https://github.com/fcomb/redux-logger#predicate--getstate-function-action-object--boolean)), but also at line 17 it adds a copy of the current Store object to the [Window object](http://www.w3schools.com/jsref/obj_window.asp). This just saves having to add it to the Window everytime, which in turn makes it easier to browse directly via the console.


