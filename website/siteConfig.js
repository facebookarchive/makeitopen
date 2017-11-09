/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* List of projects/orgs using your project for the users page */
const users = [];

const siteConfig = {
  title: "makeitopen.com" /* title for your website */,
  tagline: "Building the F8 2016 App",
  url: "http://makeitopen.com" /* your website url */,
  baseUrl: "/" /* base url for your project */,
  projectName: "makeitopen.com",
  headerLinks: [
    { languages: true },
  ],
  users,
  /* path to images for header/footer */
  headerIcon: "images/logo.png",
  footerIcon: "images/oss_logo.png",
  favicon: "images/favicon_junction.png",
  /* colors for website */
  colors: {
    primaryColor: "#dc6f62",
    secondaryColor: "#f8f8f8",
    prismColor:
      "rgba(220, 111, 98, 0.03)", /* primaryColor in rgba form, with 0.03 alpha */
    splashColor: "rgba(220, 111, 98, 0.7)",
    splashFade: "rgba(220, 98, 127, 0.7)",
    splashTextShadow: "#87291e",
  },
  // This copyright info is used in /core/Footer.js and blog rss/atom feeds.
  copyright:
    "Copyright © " +
    new Date().getFullYear() +
    " Your Name or Your Company Name",
  gaTrackingId: "UA-44373548-14",
  editUrl: "https://github.com/facebook/makeitopen/edit/master/docs/",
  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks
    theme: "atelier-savanna-dark"
  },
};

module.exports = siteConfig;
