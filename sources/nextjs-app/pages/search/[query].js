import Search from '../../containers/Search/Search';

export default function SearchPage(props) {
  return (
    <Search {...props} />
  );
};

export async function getServerSideProps(context) {
  const query = context.query.query ?? '';
  return {
    props: { query },
  }
}