import Link from 'next/link'

export default (props) => (
  <Link
    {...props}
    as={props.url}
    href={`/rechtsprechung?kanonischeUrl=${props.url}`}
  />
)
