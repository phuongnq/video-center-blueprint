import Video from '../../containers/Video/Video';

export default function VideoPage(props) {
  return (
    <Video {...props} />
  );
};

export async function getServerSideProps(context) {
  console.log(context);
  const slug = context.query.slug ?? [];
  const [ id, videoName] = slug;
  const url = `/stream/${id}/${videoName}`;
  return {
    props: { id, url },
  }
};