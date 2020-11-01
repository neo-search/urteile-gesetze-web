import Link from 'next/link'

const GesetzLink = props => <Link {...props} as={props.url} href={`/gesetz?kanonischeUrl=${props.url}`} />;

export default GesetzLink;
