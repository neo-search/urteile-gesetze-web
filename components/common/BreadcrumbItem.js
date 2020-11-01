import { colors } from './Constants'
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

const BreadcrumbItem = props => {
  const { markup, children } = props

  if (markup)
    return (
      <li
        {...props}
        itemscope=""
        itemProp="itemListElement"
        itemType="https://schema.org/ListItem"
      >
        <style jsx>{styles}</style>
        {children}
      </li>
    )

  return (
    <li {...props}>
      <style jsx>{styles}</style>
      {children}
    </li>
  )
};

export default BreadcrumbItem;
