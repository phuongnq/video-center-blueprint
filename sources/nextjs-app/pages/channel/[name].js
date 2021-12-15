import Channel from '../../containers/Channel/Channel';

export default function ChannelPage(props) {
  return (
    <Channel {...props} />
  );
}

export async function getServerSideProps(context) {
  const name = context.query.name ?? '';
  return {
    props: { name },
  }
}
