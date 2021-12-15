import List from '../../containers/List/List';

export default function ListPage(props) {
  return (
    <List {...props} />
  );
};

export async function getServerSideProps(context) {
  const slug = context.query.slug ?? [];
  let [ categoryName, query, sort] = slug;
  if (!categoryName) {
    categoryName = '';
  }
  if (!query) {
    query = null;
  }
  if (!sort) {
    sort = null;
  }
  return {
    props: { params: { categoryName, query, sort } },
  }
};