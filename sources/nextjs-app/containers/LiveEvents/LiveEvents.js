import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import VideoCategories from '../../components/VideoCategories/VideoCategories.js';
import { setVideoDocked } from '../../actions/videoPlayerActions';

const  categories = [
  {
    key: 'active-events',
    value: 'Active Events',
    type: 'live-event-item',
    query: {
      'bool': {
        'filter': [
          {
            'match': {
              'content-type': '/component/stream'
            }
          },
          {
            'range': {
              'startDate_dt': {
                'lt': 'now'
              }
            }
          },
          {
            'range': {
              'endDate_dt': {
                'gt': 'now'
              }
            }
          }
        ]
      }
    },
    sort: {
      by: 'startDate_dt',
      order: 'asc',
      unmapped_type: 'date'
    },
    numResults: 6
  },
  {
    key: 'upcoming-events',
    value: 'Upcoming Events',
    type: 'live-event-item',
    query: {
      'bool': {
        'filter': [
          {
            'match': {
              'content-type': '/component/stream'
            }
          },
          {
            'range': {
              'startDate_dt': {
                'gt': 'now'
              }
            }
          }
        ]
      }
    },
    sort: {
      by: 'startDate_dt',
      order: 'asc',
      unmapped_type: 'date'
    },
    numResults: 6
  },
  {
    key: 'past-events',
    value: 'Past Events',
    type: 'live-event-item',
    noLinks: true,
    query: {
      'bool': {
        'filter': [
          {
            'match': {
              'content-type': '/component/stream'
            }
          },
          {
            'range': {
              'endDate_dt': {
                'lt': 'now'
              }
            }
          }
        ]
      }
    },
    sort: {
      by: 'endDate_dt',
      order: 'desc',
      unmapped_type: 'date'
    },
    numResults: 6
  }
];

function LiveEvents(props) {
  useEffect(() => {
    props.setVideoDocked(false);
  }, []);

  return (
    <div>
      <VideoCategories
        categories={categories}
      >
      </VideoCategories>
    </div>
  );
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

export default connect(mapStateToProps, mapDispatchToProps)(LiveEvents);
