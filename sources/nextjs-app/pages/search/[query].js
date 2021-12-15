import Search from '../../containers/Search/Search';

export default function SearchPage(props) {
  const { query } = props;
  return (
    <Search query={query} />
  );
};

export async function getServerSideProps(context) {
  const query = context.query.query ?? '';
  return {
    props: { query },
  }
}