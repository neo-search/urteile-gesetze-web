// import css from "styled-jsx/css";
import React, { Component } from "react";
import Router from "next/router";
import InputGroup from "reactstrap/lib/InputGroup";
import Input from "reactstrap/lib/Input";
import Button from "reactstrap/lib/Button";
import { colors } from "../common/Constants";

import SearchSvg from "../icons/SearchSvg";

// const styles = css`
//   form {
//     min-width: 200px;
//     max-width: 500px;
//   }

//   div :global(input) {
//     background-color: #f1f1f1;
//     border: none;
//   }

//   div :global(.btn) {
//     background-color: #f1f1f1;
//     border-radius: 0;
//     color: ${colors.primaryAction};
//   }

//   div :global(.btn:focus),
//   div :global(.btn:hover) {
//     color: white;
//     background-color: ${colors.primaryAction};
//   }
// `;

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.query = props.query;
    this.state = {
      query: props.query 
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
    // debugger;
    return (
      <div>
        <style jsx>{styles}</style>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <InputGroup>
            <Input
              type="text"
              onChange={this.handleInput.bind(this)}
              value={this.state.query}
              placeholder="Gesetz oder Urteil suchen"
            />

            <Button color="background">
           
            <SearchSvg style={{width:24, height:16}}/>
               {/* <FontAwesomeIcon icon={faSearch} style={{width:24, height:16}}/> */}
            </Button>
          </InputGroup>
        </form>
      </div>
    );
  }
}
