import Video from '../../containers/Video/Video';

export default function VideoPage(props) {
  return (
    <Video {...props} />
  );
};

export async function getServerSideProps(context) {
  const id = context.query.id ?? '';
  const url = `/video/${id}`;
  return {
    props: { id, url },
  }
};