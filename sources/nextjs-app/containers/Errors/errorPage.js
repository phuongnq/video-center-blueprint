import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import NotFound from './404';
import { setHeaderGhost } from '../../actions/headerActions';

function ErrorPage(props) {
  useEffect(() => {
    props.setHeaderGhost(true);

    return () => {
      props.setHeaderGhost(false);
    };
  }, []);

  return (
    <div>
      <NotFound />
    </div>
  );
}

function mapStateToProps(store) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return ({
    setHeaderGhost: (ghost) => {
      dispatch(setHeaderGhost(ghost));
    }
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorPage);
