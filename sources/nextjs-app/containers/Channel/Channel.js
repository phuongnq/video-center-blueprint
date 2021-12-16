import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getDescriptor } from '@craftercms/redux';

import { isNullOrUndefined } from '../../utils';
import { setVideoDocked } from '../../actions/videoPlayerActions';
import { setHeaderGhost } from '../../actions/headerActions';
import Hero from '../../components/Hero/Hero';
import VideoCategories from '../../components/VideoCategories/VideoCategories';
import NotFound from '../Errors/404';

function Channel(props) {
  const [descriptorUrl, setDescriptorUrl] = useState('');

  useEffect(() => {
    getChannelInfo(props);
    props.setVideoDocked(false);
    props.setHeaderGhost(true);

    return () => {
      props.setHeaderGhost(false);
    };
  }, []);

  useEffect(() => {
    getChannelInfo(props);
  }, [props.name]);

  const getChannelInfo = (props) => {
    const channelName = props.name;
    const descriptorUrl = `/site/components/channel/${channelName}.xml`;
    if (isNullOrUndefined(props.descriptors[descriptorUrl])) {
      props.getDescriptor(descriptorUrl);
    }
    setDescriptorUrl(descriptorUrl);
  }

  const renderChannelContent = (descriptor) => {
    var component = descriptor.component,
      channelHero = [],
      channelContent = descriptor.component,
      categories;

    channelHero.push({
      url_s: '#',
      background_s: channelContent.heroImage_s,
      title_t: channelContent['internal-name'],
      subtitle_s: channelContent.description_s
    });

    categories = [
      {
        key: 'featured-videos',
        value: 'Featured Videos',
        query: {
          'bool': {
            'filter': [
              {
                'bool': {
                  'should': [
                    {
                      'match': {
                        'content-type': '/component/youtube-video'
                      }
                    },
                    {
                      'match': {
                        'content-type': '/component/video-on-demand'
                      }
                    },
                    {
                      'match': {
                        'content-type': '/component/stream'
                      }
                    }
                  ]
                }
              },
              {
                'match': {
                  'channels_o.item.key': channelContent.channelKey_s
                }
              },
              {
                'match': {
                  'featured_b': true
                }
              }
            ]
          }
        },
        sort: {
          by: 'date_dt',
          order: 'desc'
        },
        numResults: component.maxVideosDisplay_i,
        viewAll: channelContent.channelKey_s
      },
      {
        key: 'related-channels',
        value: 'Related Channels',
        type: 'channel-card-alt',   //TO RENDER CHANNEL CARD STYLING
        query: {
          'bool': {
            'must_not': {
              'term': { 'file-name': channelContent['file-name'] }
            },
            'filter': [
              {
                'match': {
                  'content-type': '/component/component-channel'
                }
              }
            ]
          }
        },
        numResults: component.maxChannelsDisplay_i
      }
    ];

    return (
      <div>
        <Hero
          data={channelHero}
          localData={true}
        >
        </Hero>
        <VideoCategories
          categories={categories}
        >
        </VideoCategories>
      </div>
    );
  };

  const { descriptors, descriptorsLoading } = props;

  if ((descriptorsLoading[descriptorUrl] === false) && isNullOrUndefined(descriptors[descriptorUrl])) {
    return (
      <NotFound />
    );
  } else {
    return (
      <div>
        {descriptors && descriptors[descriptorUrl] &&
        renderChannelContent(descriptors[descriptorUrl])
        }
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    videoInfo: store.video.videoInfo,
    videoStatus: store.video.videoStatus,
    descriptors: store.craftercms.descriptors.entries,
    descriptorsLoading: store.craftercms.descriptors.loading
  };
}

function mapDispatchToProps(dispatch) {
  return ({
    setVideoDocked: (docked) => {
      dispatch(setVideoDocked(docked));
    },
    getDescriptor: (url) => {
      dispatch(getDescriptor(url));
    },
    setHeaderGhost: (ghost) => {
      dispatch(setHeaderGhost(ghost));
    }
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(Channel);
