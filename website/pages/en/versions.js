/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require("react");

const CompLibrary = require("../../core/CompLibrary");
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const CWD = process.cwd();

const siteConfig = require(CWD + "/siteConfig.js");
const versions = require(CWD + "/versions.json");

class Versions extends React.Component {
  render() {
    const latestVersion = versions[0];
    return (
      <div className="docMainWrapper wrapper">
        <Container className="mainContainer versionsContainer">
          <div className="post">
            <header className="postHeader">
              <h2>{siteConfig.title + " Versions"}</h2>
            </header>
            <p>New versions of this project are released periodically.</p>
            <a name="latest" />
            <h3>Current version (Stable)</h3>
            <table className="versions">
              <tbody>
                <tr>
                  <th>
                    {latestVersion}
                  </th>
                  <td>
                    <a href={"../"}>Documentation</a>
                  </td>
                  <td>
                    <a href={"https://github.com/facebook/makeitopen/releases/tag/v"+latestVersion}>Release Notes</a>
                  </td>
                </tr>
              </tbody>
            </table>
            <p>
              This is the current stable version of the project.
            </p>
            <a name="rc" />
            <h3>Pre-release versions</h3>
            <table className="versions">
              <tbody>
                <tr>
                  <th>master</th>
                  <td>
                    <a href={
                      siteConfig.baseUrl +
                      "docs/" +
                      this.props.language +
                      "/next" +
                      "/1-1-planning.html"
                    }>Documentation</a>
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <p>These are the latest changes that have yet to be released.</p>           
            {versions && versions.length > 1 &&
              <div>
                <a name="archive" />
                <h3>Past Versions</h3>
                <table className="versions">
                  <tbody>
                    {versions.map(
                      version =>
                        version !== latestVersion &&
                        <tr>
                          <th>
                            {version}
                          </th>
                          <td>
                            <a href={
                              siteConfig.baseUrl +
                              "docs/" +
                              this.props.language +
                              "/" +
                              version +
                              "/1-1-planning.html"
                            }>Documentation</a>
                          </td>
                          <td>
                            <a href={"https://github.com/facebook/makeitopen/releases/tag/v"+version}>Release Notes</a>
                          </td>
                        </tr>
                    )}
                  </tbody>
                </table>
              </div>
            }
            <p>
              You can find past versions of this project{" "}
              <a href="https://github.com/facebook/makeitopen/"> on GitHub </a>.
            </p>
          </div>
        </Container>
      </div>
    );
  }
}

module.exports = Versions;
