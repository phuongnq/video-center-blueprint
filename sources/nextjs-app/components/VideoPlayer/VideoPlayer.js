import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import VideoPlayerHolder from './VideoPlayerStyle';

import { setVideoInfo, setVideoStatus } from '../../actions/videoPlayerActions';
import VideoJSPlayer from './VideoJSPlayer';

class VideoPlayer extends Component {
  UNSAFE_componentWillReceiveProps(newProps) {
    //Video info removed - unload video
    if (!newProps.videoInfo && this.props.videoInfo) {
      this.unloadVideo();
    }

    //If video not loaded and it has new video Info -> load video
    if (newProps.videoInfo !== null && (!this.props.videoStatus.loaded)) {
      this.loadVideo(newProps.videoInfo);
    }

    //If video is not playing, and view is not docked (so is fixed) -> unload video
    if (newProps.videoStatus && (newProps.videoStatus.loaded === true)
      && (newProps.videoStatus.playing === false)
      && (newProps.videoStatus.docked === false)) {
      this.unloadVideo();
    }

    if (this.props.videoInfo && newProps.videoInfo) {
      var currentType = this.props.videoInfo['content-type'] === '/component/youtube-video' ? 'video' : 'stream',
        newType = newProps.videoInfo['content-type'] === '/component/youtube-video' ? 'video' : 'stream';

      //If new props contains a different type of video than current (stream, video) => load new one
      if (currentType !== newType) {
        this.unloadVideo();
        this.loadVideo(newProps.videoInfo);
      }
    }
  }

  loadVideo() {
    this.props.dispatch(setVideoStatus({ ...this.props.videoStatus, loaded: true }));
  }

  unloadVideo() {
    this.props.dispatch(setVideoStatus({
      ...this.props.videoStatus,
      loaded: false,
      playing: false
    }));
    this.props.dispatch(setVideoInfo(null));
  }

  render() {
    return (
      <VideoPlayerHolder>
        <div id="app-content__player" className="app-content__player">
          {this.props.videoInfo && this.props.videoStatus.loaded &&
          <div className="app-content__player-wrapper">
            <div
              className={`global-video-player global-video-player--visible global-video-player--${this.props.videoStatus.docked ? 'docked' : 'fixed'}`}
            >
              <div id="videoPlayerAspect" className="global-video-player__aspect">
                <div className="global-video-player__inner">
                  {
                    process.browser &&
                    <VideoJSPlayer
                      video={this.props.videoInfo}
                      videoStatus={this.props.videoStatus}
                      dispatch={this.props.dispatch}
                      controls={true}
                    />
                  }

                  <Link
                    href={this.props.videoStatus.currentVideoUrl}
                  >
                    <a className="fixed-player__link-overlay"></a>
                  </Link>

                  <button className="global-video-player__close" onClick={this.unloadVideo.bind(this)}>
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          }
        </div>
      </VideoPlayerHolder>
    );
  }
}

function mapStateToProps(store) {
  return {
    videoInfo: store.video.videoInfo,
    videoStatus: store.video.videoStatus
  };
}

export default connect(mapStateToProps)(VideoPlayer);
