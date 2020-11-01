import css from 'styled-jsx/css'

const styles = css`
  div {
    padding-top: 20px;
    padding-bottom: 35px;
  }
  span {
    margin-right: 10px;
    margin-left: 10px;
  }
  a {
    margin-left: 0;
    margin-right: 10px;
  }
`

const InfoBar = ({ children }) => (
  <div className="infobar">
    <style jsx>{styles}</style>
    {children}
  </div>
)

export default InfoBar
