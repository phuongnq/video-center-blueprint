import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChannelsHolder from './ChannelsStyle';

import { setVideoDocked } from '../../actions/videoPlayerActions';

import VideoCategories from '../../components/VideoCategories/VideoCategories';

class Channels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchId: '',
      categories: [
        {
          key: 'featured-channels',
          value: 'Featured Channels',
          type: 'channel-card-alt',
          query: {
            'bool': {
              'filter': [
                {
                  'match': {
                    'content-type': '/component/component-channel'
                  }
                },
                {
                  'match': {
                    'featured_b': true
                  }
                }
              ]
            }
          }
        },
        {
          key: 'all-channels',
          value: 'All Channels',
          type: 'channel-card-alt',   //TO RENDER CHANNEL CARD STYLING
          query: {
            'bool': {
              'filter': [
                {
                  'match': {
                    'content-type': '/component/component-channel'
                  }
                }
              ]
            }
          },
          numResults: 100
        }
      ]
    };
  }

  componentWillMount() {
    this.props.setVideoDocked(false);
  }

  render() {
    return (
      <ChannelsHolder>
        <div className="">
          <VideoCategories
            categories={this.state.categories}
          >
          </VideoCategories>
        </div>
      </ChannelsHolder>
    );
  }
}

export async function getServerSideProps(context) {
  const props = {};
  return { props };
}

function mapStateToProps(store) {
  return {
    videoInfo: store.video.videoInfo,
    videoStatus: store.video.videoStatus
  };
}

function mapDispatchToProps(dispatch) {
  return ({
    setVideoDocked: (docked) => {
      dispatch(setVideoDocked(docked));
    }
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(Channels);
