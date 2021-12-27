import Video from '../../containers/Video/Video';
import { absoluteUrl } from '../../utils';

export default function VideoPage(props) {
  return (
    <Video {...props} />
  );
};

export async function getServerSideProps(context) {
  const id = context.query.id ?? '';
  const req = context.req;
  const url = `/video/${id}`;
  const fullUrl = absoluteUrl(req).origin + url;
  return {
    props: { id, url, fullUrl },
  }
};

