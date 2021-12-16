import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import SearchHolder from './SearchStyle';
import VideoCategories from '../../components/VideoCategories/VideoCategories';
import { setVideoDocked } from '../../actions/videoPlayerActions';
import { isNullOrUndefined } from '../../utils';

const getNewCategories = (searchId) => {
  let searchKeyword = isNullOrUndefined(searchId) ? '' : searchId;

  const fields = ['title_t^1.5', 'description_html^1', 'tags_o.item.value_smv^1'];
  const query = {};
  query.filter = [
    {
      'terms': {
        'content-type': ['/component/youtube-video', '/component/video-on-demand', '/component/stream']
      }
    }
  ];

  // Check if the user is requesting an exact match with quotes
  const regex = /.*("([^"]+)").*/;
  const matcher = searchKeyword.match(regex);

  if (matcher) {
    // Using must excludes any doc that doesn't match with the input from the user
    query.must = [
      {
        'multi_match': {
          'query': matcher[2],
          'fields': fields,
          'fuzzy_transpositions': false,
          'auto_generate_synonyms_phrase_query': false
        }
      }
    ];

    // Remove the exact match to continue processing the user input
    searchKeyword = searchKeyword.replace(matcher[1], '');
  } else {
    query.minimum_should_match = 1;
  }

  if (searchKeyword) {
    // Using should makes it optional and each additional match will increase the score of the doc
    query.should = [
      {
        'multi_match': {
          'query': searchKeyword,
          'fields': fields,
          'type': 'phrase_prefix',
          'boost': 1.5
        }
      },
      {
        'multi_match': {
          'query': searchKeyword,
          'fields': fields
        }
      }
    ]
  }

  return [
    {
      key: 'top-results',
      value: 'Top Results',
      query: {
        'bool': query
      },
      viewAll: false,
      numResults: 90
    }];
}

const WAIT_INTERVAL = 1000;

function Search(props) {
  let timer;
  let appContentEl;
  let searchInput;
  const searchId = props.query;

  const [categories, setCategories] = useState(getNewCategories(searchId));

  useEffect(() => {
    props.setVideoDocked(false);
    timer = null;

    appContentEl = document.getElementById('app-content');
    appContentEl.classList.add('search-content');

    return () => {
      appContentEl.classList.remove('search-content');
    };
  }, []);

  useEffect(() => {
    const value = props.query;
    const newCategories = getNewCategories(value);

    searchInput.value = value ?? '';
    setCategories(newCategories);
  }, [props]);

  const onChange = (event) => {
    const value = event.target.value;

    clearTimeout(timer);
    timer = setTimeout(function () {
      setCategories(getNewCategories(value));
    }, WAIT_INTERVAL);

  }

  return (
    <SearchHolder>
      <div className="search-bar--sticky">
        <div className="search-bar search-bar--visible">
          <div className="search-bar__container">
            <div className="search-bar__inner">
              <div className="search-bar__icon">
                <FontAwesomeIcon className="search__icon" icon={faSearch} />
              </div>
              <input
                type="text" className="search-bar__input" placeholder="Start Typing..."
                ref={r => searchInput = r}
                defaultValue={searchId}
                onChange={onChange}
              />
            </div>
          </div>
        </div>
      </div>

      <VideoCategories categories={categories} />
    </SearchHolder>
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

export default connect(mapStateToProps, mapDispatchToProps)(Search);
