import Facette from "./Facette";
import css from "styled-jsx/css";

import Button from "reactstrap/lib/Button";
import Modal from "reactstrap/lib/Modal";
import ModalBody from "reactstrap/lib/ModalBody";
import ModalFooter from "reactstrap/lib/ModalFooter";

const styles = css`
  div {
    // padding-top: 12px;
    padding-bottom: 24px;
    // padding-left: 12px;

    min-width: 190px;
    max-width: 230px;
  }

  // ::global(.modal.fade .modal-dialog) {
  //   transform: translate3d(0, 100vh, 0);
  // }
  // ::global(.modal.in .modal-dialog) {
  //   transform: translate3d(0, 0, 0);
  // }
`;

const FilterButton = props => (
  <Button
    {...props}
    // color="primary"
    style={{
      position: "fixed",
      zIndex: 100,
      background: "#e12830",
      borderColor: "#d12727",
      borderRadius: 18,
      left: "50%",
      transform: "translateX(-50%)",
      bottom: 15
    }}
  >
    Dokumente Filtern
  </Button>
);

export default class Facetten extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFilter: false
    };
    this.toggleFilterPopup = this.toggleFilterPopup.bind(this);
  }

  toggleFilterPopup() {
    this.setState({ showFilter: !this.state.showFilter });
  }

  renderFilterPopup(facetten, urlparams) {
    // if (this.state.showFilter)
    return (
      <Modal
        isOpen={this.state.showFilter}
        toggle={this.toggle}
        className={this.props.className}
      >
        {/* <ModalHeader toggle={this.toggle}>Modal title</ModalHeader> */}
        <ModalBody style={{ height: 400, overflowY: "auto" }}>
          {facetten //
            .filter(({ values }) => values.length !== 0) //
            .map(({ name, id, values }) => (
              <div key={id}>
                <Facette
                  name={name}
                  id={id}
                  values={values}
                  urlparams={urlparams}
                />
                <style jsx>{styles}</style>
              </div>
            ))}{" "}
        </ModalBody>
        <ModalFooter>
          {/* <Button color="primary" onClick={this.toggle}>
              
            </Button>{" "} */}
          <FilterButton color="primary" onClick={this.toggleFilterPopup}>
            Dokumente Filtern
          </FilterButton>
        </ModalFooter>
      </Modal>
    );
  }

  renderButton() {
    if (!this.state.showFilter)
      return (
        <FilterButton
          id="button1"
          onClick={this.toggleFilterPopup}
          color="primary"
          style={{
            position: "fixed",
            zIndex: 100,
            background: "#e12830",
            borderColor: "#d12727",
            borderRadius: 18,
            left: "50%",
            transform: "translateX(-50%)",
            bottom: 15
          }}
        >
          Dokumente Filtern
        </FilterButton>
      );
  }

  render() {
    const { facetten, urlparams } = this.props.facettenData;
    return (
      <>
        <div className="d-none d-sm-block">
          {facetten //
            .filter(({ values }) => values.length !== 0) //
            .map(({ name, id, values }) => (
              <div key={id}>
                <Facette
                  name={name}
                  id={id}
                  values={values}
                  urlparams={urlparams}
                />
                <style jsx>{styles}</style>
              </div>
            ))}
        </div>

        <div className="d-sm-none d-md-none d-lg-none d-xl-none">
          {this.renderButton()}
          {this.renderFilterPopup(facetten, urlparams)}
        </div>
      </>
    );
  }
}
