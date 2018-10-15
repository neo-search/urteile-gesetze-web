import css from "styled-jsx/css";
import React, { Component } from "react";
import Router from "next/router";
import InputGroup from "reactstrap/lib/InputGroup";
import Input from "reactstrap/lib/Input";
import Button from "reactstrap/lib/Button";
import { colors } from "../common/Constants";

import SearchSvg from "../icons/SearchSvg";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import  faSearch  from '@fortawesome/free-solid-svg-icons/faSearch'

const styles = css`
  // form {
  //   width: 500px;
  // }

  div :global(input) {
    // background-color: #f1f1f1;
    border: none;
  }

  div :global(.btn) {
    // background-color: #f1f1f1;
    border-radius: 0;
    color: ${colors.primaryAction};
  }

  div :global(.btn:focus),
  div :global(.btn:hover) {
    color: white;
    background-color: ${colors.primaryAction};
  }

  @keyframes greenPulse {
    from {
      -webkit-box-shadow: 0px 0px 0px 5px rgba(161, 205, 255, 0.62);
    }
    50% {
      -webkit-box-shadow: 0px 0px 0px 11px rgba(161, 205, 255, 0.99);
    }
    to {
      -webkit-box-shadow: 0px 0px 0px 5px rgba(161, 205, 255, 0.62);
    }
  }

  div :global(div.input-group:not(focus)) {
    animation: greenPulse 3s infinite;
  }
`;

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.query = props.query;
    this.state = {
      query: "",
      active: false
    };
  }

  handleInput(event) {
    this.setState({ query: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    Router.push({
      pathname: "/suche",
      query: { q: this.state.query }
    });
  }

  render() {
    const { placeholder, light } = this.props;
    const backgroundColor = light ? "white" : "#f1f1f1";
    const border = light
      ? `1px  solid ${colors.primaryAction}`
      : "transparent 1px solid";

    return (
      <div>
        <style jsx>{styles}</style>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <InputGroup style={{ border }}>
            <Input
              style={{ backgroundColor }}
              // length={500}
              type="text"
              onChange={this.handleInput.bind(this)}
              value={this.query}
              placeholder={placeholder || "Gesetz oder Urteil suchen"}
            />
            <Button
              color="background"
              style={{ backgroundColor }}
              aria-label="Suchen"
            >
              <SearchSvg style={{width:24, height:16}}/>
            </Button>
          </InputGroup>
        </form>
      </div>
    );
  }
}
