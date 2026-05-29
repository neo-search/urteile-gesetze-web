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
  div :global(div.input-group) {
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
    transition: box-shadow 0.2s ease;
  }

  div :global(div.input-group:focus-within) {
    box-shadow: 0 0 0 3px rgba(1, 79, 164, 0.18), 0 1px 4px rgba(0, 0, 0, 0.1);
  }

  div :global(input) {
    border: none;
    outline: none;
    box-shadow: none !important;
    font-size: 1rem;
    padding: 10px 16px;
  }

  div :global(input:focus) {
    box-shadow: none !important;
  }

  div :global(.btn-search) {
    background-color: ${colors.primaryAction};
    border: none;
    border-radius: 0;
    padding: 0 18px;
    color: white;
    transition: background-color 0.15s ease;
    display: flex;
    align-items: center;
  }

  div :global(.btn-search:hover),
  div :global(.btn-search:focus) {
    background-color: ${colors.primaryActionHover};
    color: white;
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

    return (
      <div>
        <style jsx>{styles}</style>
        <form
          onSubmit={this.handleSubmit.bind(this)}
          role="search"
          aria-label="Gesetze und Urteile suchen"
        >
          <label htmlFor="main-search" className="visually-hidden">
            Gesetz oder Urteil suchen
          </label>
          <InputGroup>
            <Input
              id="main-search"
              style={{ backgroundColor }}
              type="search"
              onChange={this.handleInput.bind(this)}
              value={this.query}
              placeholder={placeholder || "Gesetz oder Urteil suchen"}
              aria-label="Suchbegriff eingeben"
              autoComplete="off"
            />
            <Button
              className="btn-search"
              type="submit"
              aria-label="Suche starten"
            >
              <SearchSvg style={{ width: 18, height: 18 }} aria-hidden="true" />
            </Button>
          </InputGroup>
        </form>
      </div>
    );
  }
}
