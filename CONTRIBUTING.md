# Contributing to makeitopen.com

We want to make contributing to this project as easy and transparent as
possible.

## Code of Conduct

The code of conduct is described in [`CODE_OF_CONDUCT.md`](/CODE_OF_CONDUCT.md)

## Pull Requests

We actively welcome your pull requests.

_Before_ submitting a pull request, please make sure the following is done…

1. Fork the repo and create your branch from `master`. A guide on how to fork a repository: https://help.github.com/articles/fork-a-repo/

   Open terminal (e.g. Terminal, iTerm, Git Bash or Git Shell) and type:

   ```sh
   git clone https://github.com/<your_username>/makeitopen
   cd makeitopen
   git checkout -b my_branch
   ```

   Note: Replace `<your_username>` with your GitHub username

2. makeitopen.com uses [Yarn](https://code.facebook.com/posts/1840075619545360) for running a local development server. If you haven't already done so, please [install yarn](https://yarnpkg.com/en/docs/install).

3. Install makeitopen.com dependencies by running the following in terminal:

   ```sh
   cd website
   yarn
   ```

4. Run the development server locally to test your install:

   ```sh
   yarn start
   ```

   Follow the prompts to view the website and verify your changes.

5. If you haven't already, complete the Contributor License Agreement ("CLA").

## Contributor License Agreement ("CLA")
In order to accept your pull request, we need you to submit a CLA. You only need
to do this once to work on any of Facebook's open source projects.

Complete your CLA here: <https://code.facebook.com/cla>

## Issues
We use GitHub issues to track public bugs. Please ensure your description is
clear and has sufficient instructions to be able to reproduce the issue.

### Security Bugs

Facebook has a [bounty program](https://www.facebook.com/whitehat/) for the safe
disclosure of security bugs. In those cases, please go through the process
outlined on that page and do not file a public issue.

## Writing Style
All contributions will be reviewed for both writing style and any code correctness.

## License
By contributing to this repo, you agree that your contributions will be licensed
under its license.
