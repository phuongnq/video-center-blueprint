import React, { Component } from 'react';
import Link from 'next/link';

import NotFoundHolder from './404Style';

class NotFound extends Component {
  render() {
    return (
      <NotFoundHolder>
        <div className="text-container">
          <h1 className="heading">Page not Found...</h1>
          <p className="subtitle">The page you are looking for doesn't exist.</p>
          <div className="button-container">
            <Link href="/">
              <a className="standard-button">
                <span className="standard-button__text">Back to home</span>
              </a>
            </Link>
          </div>
        </div>
      </NotFoundHolder>
    );
  }
}


export default NotFound;
