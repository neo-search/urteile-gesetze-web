import { colors } from '../../common/Constants'
import css from 'styled-jsx/css'

const styles = css`
  li {
    color: green;
    font-weight: normal;
    color: ${colors.lightForegroundColor};
  }

  li + li {
    padding-left: 0.5rem;
  }

  li + li:before {
    display: inline-block;
    padding-right: 0.5rem;
    content: '/';
  }
`

const TrefferBreadcrumbItem = props => <li {...props}>
  <style jsx>{styles}</style>
  {props.children}
</li>;

export default TrefferBreadcrumbItem;
