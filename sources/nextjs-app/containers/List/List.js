import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { setVideoDocked } from '../../actions/videoPlayerActions';
import VideoCategories from '../../components/VideoCategories/VideoCategories';

function Channel(props) {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    props.setVideoDocked(false);
    getInfo(props);
  }, []);

  useEffect(() => {
    getInfo(props);
  }, [props.params.categoryName]);

  const getInfo = (props) => {
    var params = props.params,
      category = {
        key: '',
        value: params.categoryName,
        viewAll: false,
        numResults: 1000
      },
      query,
      isKey = false;

    try {
      query = JSON.parse(params.query.replace(/__/g, '/'));
    } catch (e) {
      isKey = true;
      query = params.query.replace(/__/g, '/').split(',');
    }

    if (isKey && (query[0].indexOf(':') === -1 && query.length === 1)) {
      category.key = query[0];
    } else {
      category.query = query;
    }

    if (params.sort) {
      category.sort = JSON.parse(params.sort);
    }

    setCategories([category]);
  };

  return (
    <div>
      {categories &&
      <VideoCategories
        categories={categories}
      >
      </VideoCategories>
      }
    </div>
  );
}

function mapStateToProps(store) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return ({
    setVideoDocked: (docked) => {
      dispatch(setVideoDocked(docked));
    }
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(Channel);
