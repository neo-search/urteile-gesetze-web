import React from "react";
import Layout from "../layout/MainLayout";
// import css from "styled-jsx/css";
import Container from "reactstrap/lib/Container";
import Col from "reactstrap/lib/Col";
import Row from "reactstrap/lib/Row";

// const contentStyles = css`
//   div.content {
//     background-color: white;
//     padding-top: 20px;
//     padding-bottom: 40px;
//   }
// `;

export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  render() {
    return (
      <Layout>
        <div className="content">
          {/* <style jsx>{contentStyles}</style> */}
          <Container>
            <Row>
              <Col md="10">
                {this.props.statusCode ? (
                  <div
                    style={{
                      textAlign: "center",
                      paddingTop: 50,
                      paddingBottom: 50
                    }}
                  >
                    <h1>Dokument nicht gefunden.</h1>
                    <p>
                      Dieses Dokument befindet sich leider nicht in unserer
                      juristischen Datenbank. Mit unserer Suchfunktion können
                      Sie nach ähnlichen Dokumenten suchen.
                    </p>
                  </div>
                ) : (
                  <div>
                    <h1>Interner Fehler</h1>
                    <p>
                      Sie brauchen nichts zu tun. Wir wurden benachrichtigt und
                      werden gleich den Fehler beheben!
                    </p>
                  </div>
                )}{" "}
              </Col>
            </Row>
          </Container>
        </div>
      </Layout>
    );
  }
}
