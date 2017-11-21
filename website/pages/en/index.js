/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require("react");
const classNames = require("classnames");

const CompLibrary = require("../../core/CompLibrary.js");
const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const siteConfig = require(process.cwd() + "/siteConfig.js");
const tutorialData = require(process.cwd() + "/data/Tutorials.js");
const appendixData = require(process.cwd() + "/data/Appendices.js");
const featureData = require(process.cwd() + "/data/Features.js");

class Button extends React.Component {
  render() {
    return (
      <div className="pluginWrapper buttonWrapper">
        <a className="button splashButton" href={this.props.href} target={this.props.target}>
          {this.props.children}
        </a>
      </div>
    );
  }
}

Button.defaultProps = {
  target: "_self"
};

class MyGridBlock extends React.Component {
  renderBlock(block) {
    const blockClasses = classNames("blockElement", this.props.className, {
      alignCenter: this.props.align === "center",
      alignRight: this.props.align === "right",
      fourByGridBlock: this.props.layout === "fourColumn",
      threeByGridBlock: this.props.layout === "threeColumn",
      twoByGridBlock: this.props.layout === "twoColumn"
    });
    const pageLink = siteConfig.baseUrl +
      "docs/" +
      this.props.language +
      "/" +
      block.linkId +
      ".html"
    const blockContentClasses = classNames("blockContent", {
      appendixContent: !this.props.tutorial
    })
    return (
      <div className={blockClasses} key={block.title}>
        <div className={blockContentClasses}>
          <h4>
            <span>{block.label}</span>
            {!this.props.tutorial && <hr />}
            <a href={pageLink}>{block.title}</a>
          </h4>
          {block.content &&
            <div className="tutorialContent">
              <MarkdownBlock>
                {block.content}
              </MarkdownBlock>
              <p><a href={pageLink}>Read More</a></p>
            </div>
          }
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="gridBlock">
        {this.props.contents.map(this.renderBlock, this)}
      </div>
    );
  }
}

class HomeSplash extends React.Component {
  render() {
    return (
      <div className="homeContainer">
        <div className="homeSplash" 
             style={{
              backgroundImage: "url('"+
                siteConfig.baseUrl +
                "images/f8_app_splash.png')"
            }}>
          <div className="homeSplashFade">
            <div className="wrapper homeWrapper">
              <div className="inner">
                <h2 className="projectTitle">
                  {siteConfig.tagline}
                </h2>
                <div className="section promoSection">
                  <div className="promoRow">
                    <div className="pluginRowBlock">
                      <Button
                        href={
                          siteConfig.baseUrl +
                          "docs/" +
                          this.props.language +
                          "/1-1-planning.html"
                        }
                      >
                        Start Reading
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Features extends React.Component {
  renderProject(project) {
    return (
      <li>
        <a
          href={project.link}
          target="_blank"
        >{project.title}</a>
      </li>
    );
  }

  renderFeature(feature) {
    return (
      <div className="featuredGroup">
        <h3>{feature.title}</h3>
        <ul>
          {feature.items.map(this.renderProject, this)}
        </ul>
      </div>
    );
  }

  render() {
    return(
      <div className="featuredTech">
        <h2 className="blockHeader">Featured In This Series</h2>
        <div className="features">
          {this.props.features.map(this.renderFeature, this)}
        </div>
      </div>
    );
  }
}

class Index extends React.Component {
  render() {
    let language = this.props.language || "en";
    const showcase = siteConfig.users
      .filter(user => {
        return user.pinned;
      })
      .map(user => {
        return (
          <a href={user.infoLink}>
            <img src={user.image} title={user.caption} />
          </a>
        );
      });

    return (
      <div>
        <HomeSplash language={language} />
        <div className="mainContainer">
          <Container padding={["bottom", "top"]}>
            <p>
              Every year, as part of the F8 conference, Facebook builds
              iOS and Android apps that give attendees a schedule for
              the conference, and let them learn more about the talks and
              speakers. The apps have also provided reminders for upcoming
              talks and ad-hoc announcements to attendees.
            </p>

            <p>
              In 2016, we released the <a href="https://github.com/fbsamples/f8app/" target="_blank">
              source code on GitHub</a>, and produced a series of tutorials.
              These were designed to introduce React Native and its Open
              Source ecosystem in plain English.
            </p>

            <p>
              This tutorial series is typically updated during the app's
              development. Elements, such as code samples, will continue
              to evolve and improve over time after the app has been
              released. We plan to continue refreshing the app and the
              related tutorials as part of future F8 conferences.
            </p>

            <p>
              Comments and feedback are welcome via <a href="https://github.com/facebook/makeitopen/issues">
              GitHub issues</a>. The tutorials are designed to be
              readable individually, but we recommend reading through
              in sequence.
            </p>

          </Container>
          <Container padding={["bottom"]}>
            <MyGridBlock
              language={language}
              tutorial={true}
              contents={tutorialData}
              layout="fourColumn"
            />
          </Container>
          <Container padding={["bottom"]}>
            <MyGridBlock
              language={language}
              tutorial={false}
              contents={appendixData}
              layout="fourColumn"
            />
          </Container>
        </div>
        <div className="featuredContainer">
          <Container padding={["bottom"]}>
            <Features features={featureData} />
          </Container>
        </div>
      </div>
    );
  }
}

module.exports = Index;
