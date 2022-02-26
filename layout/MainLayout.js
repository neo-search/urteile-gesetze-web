import Head from "next/head";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import Footer from "../components/footer/Footer";
import Header from "../components/header/";
import { initGA, logPageView } from "../services/analytics";

class LayoutWithHeaderAndFooter extends Component {
  constructor(props) {
    super(props);
    this.showTrackingOverlay = this.showTrackingOverlay.bind(this);
    this.changeTrackingSettings = this.changeTrackingSettings.bind(this);
    const { trackingAllowed } = parseCookies(this.props);
    this.state = { showTrackingInfo: false, trackingAllowed: trackingAllowed };
  }

  renderCanonical(canonical) {
    if (canonical) {
      if (canonical.endsWith("inhaltsuebersicht"))
        canonical = canonical.replace("/inhaltsuebersicht", "");
      return (
        <link rel="canonical" href={"https://urteile-gesetze.de" + canonical} />
      );
    }
  }

  renderDescription(description) {
    if (description)
      return (
        <>
          <meta property="og:description" content={description} />
          <meta name="description" content={description} />
        </>
      );
  }

  componentDidMount() {
    const prod = process.env.NODE_ENV === "production";
    if (prod) this.trackIfAllowed();
  }

  trackIfAllowed() {
    // debugger;
    if (
      this.state.trackingAllowed === undefined ||
      this.state.trackingAllowed === "true"
    ) {
      if (!window.GA_INITIALIZED) {
        initGA();
        window.GA_INITIALIZED = true;
      }

      logPageView();
    }
  }

  showTrackingOverlay() {
    this.setState({ trackingAllowed: true });
    this.setState({ showTrackingInfo: true });
  }

  renderTrackingFooter() {
    if (this.state.trackingAllowed === undefined) {
      return (
        <div id="stickyFooter">
          <p>
            Wir nutzen Cookies und Webtracking um unser Webangebot für Sie zu
            verbessern. Hier können Sie die Webtracking-Einstellungen ändern:{" "}
            <a
              onClick={() => {
                this.showTrackingOverlay();
              }}
              style={{ "text-decoration": "underline" }}
            >
              Webtracking-Einstellungen
            </a>{" "}
            <button
              onClick={() => {
                this.state.trackingAllowed = "true";
                this.changeTrackingSettings();
              }}
            >
              OK
            </button>
          </p>
        </div>
      );
    }
  }

  renderTrackingOverlay() {
    if (this.state.showTrackingInfo === true) {
      return (
        <div id="trackingOverlay">
          <div id="trackingOverlayDiv">
            <h2>Webtracking-Einstellungen</h2>
            <Form>
              <FormGroup>
                <Input
                  type="radio"
                  name="trackingAllowed"
                  value={this.state.trackingAllowed}
                  onChange={() => this.setState({ trackingAllowed: true })}
                  checked
                />
                <Label for="trackingAllowed">
                  Webtracking und Cookies erlauben um die Seite an Ihre
                  Bedürfnisse anzupassen
                </Label>
              </FormGroup>
              <FormGroup>
                <Input
                  type="radio"
                  name="trackingAllowed"
                  value={this.state.trackingAllowed}
                  onChange={() => this.setState({ trackingAllowed: false })}
                />
                <Label for="trackingAllowed">
                  Webtracking verbieten und Tracking-Cookies jetzt löschen
                </Label>
              </FormGroup>
              <Button onClick={this.changeTrackingSettings}>Speichern</Button>
            </Form>
          </div>
        </div>
      );
    }
  }

  changeTrackingSettings() {
    if (this.state.trackingAllowed === "false") {
      const cookies = parseCookies(this.props);
      for (var cookieName in cookies) {
        destroyCookie(this.props, cookieName);
      }
    }

    this.setState({ showTrackingInfo: false });
    setCookie(this.props, "trackingAllowed", this.state.trackingAllowed);
  }

  render() {
    const {
      title,
      children,
      query,
      description,
      noSearchbar = false,
      canonical,
    } = this.props;
    return (
      <div>
        <Head>
          <title>{title}</title>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicon-16x16.png"
          />
          <link
            rel="mask-icon"
            href="/static/safari-pinned-tab.svg"
            color="#5bbad5"
          />
          <meta name="theme-color" content="#ffffff" />
          <meta property="og:title" content={title} />
          {this.renderDescription(description)}
          {this.renderCanonical(canonical)}
          <meta property="og:site_name" content="Urteile & Gesetze" />
          <meta property="og:image" content="/static/apple-touch-icon.png" />
          <meta property="og:type" content="article" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Header query={query} noSearchBar={noSearchbar} />

        <div
          className="d-sm-none d-md-none d-lg-none d-xl-none"
          style={{ height: noSearchbar ? 0 : 38 }}
        />

        <div className="spaceUnderSearchbar" />
        <div>{children}</div>

        {this.renderTrackingFooter()}
        {this.renderTrackingOverlay()}
        <Footer />
      </div>
    );
  }
}

LayoutWithHeaderAndFooter.propTypes = {
  title: PropTypes.string.isRequired,
};

export default LayoutWithHeaderAndFooter;
