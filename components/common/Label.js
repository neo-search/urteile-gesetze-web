import { colors } from './Constants'

import css from 'styled-jsx/css'

const styles = css`
  div > :global(.btn.btn-outline-secondary:hover) {
    background-color: ${colors.hoverBackgroundColor};
    -webkit-box-shadow: 0px 1px 1px gr;
    -moz-box-shadow: 0px 1px 1px #de1dde;
    box-shadow: 0px 1px 1px #de1dde;
  }
`
export default (props) => (
  <a
    className="btn btn-outline-secondary"
    style={{
      marginRight: 24,
      backgroundColor: 'white',
      marginBottom: 18,
      border: 'none',
      boxShadow: `0px 1px 1px grey`,

      color: colors.primaryAction
    }}
    outline
  >
    <div>
      {props.children}
      <style jsx>{styles}</style>
    </div>
  </a>
)
