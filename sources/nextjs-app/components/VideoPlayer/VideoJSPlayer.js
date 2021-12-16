/*!
 * Copyright (C) 2007-2020 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { setVideoStatus } from '../../actions/videoPlayerActions';
import { updateDimensions } from './Common';
import videojs from 'video.js';
import 'video.js/dist/video-js.min.css';
import 'videojs-youtube/dist/Youtube.min';

dynamic(
  () => import('dashjs/dist/dash.all.min'),
  { ssr: false }
);

dynamic(
  () => import('videojs-contrib-dash/dist/videojs-dash.min'),
  { ssr: false }
);

function VideoJSPlayer(props) {
  let player;
  const videoRef = useRef(null);

  useEffect(() => {
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  useEffect(() => {
    if (!player) {
      props.video && initPlayer();
    }
    setPlayerSrc(player, props.video);
  }, [props.video]);

  const setPlayerSrc = (player, video) => {
    const contentType = video['content-type'];
    let src, type;

    if (contentType === '/component/youtube-video') {   // YOUTUBE
      src = `https://www.youtube.com/watch?v=${video.youTubeVideo_s}`;
      type = 'video/youtube';

      player.src({
        src,
        type
      });
    } else if (contentType === '/component/video-on-demand') {  //VOD
      const multipleSrc = video.video_o.item.filter((item) => {
        return item.url.includes('mp4') || item.url.includes('m3u8') || item.url.includes('mpd')
      }).map((item) => {
        const src = item.url;

        if (src.includes('m3u8')) {
          type = 'application/x-mpegURL';
        } else if(src.includes('mpd')) {
          type = 'application/dash+xml';
        } else {
          type = 'video/mp4';
        }

        return {
          src,
          type
        }
      });

      player.src(multipleSrc);
    } else {
      if (video.origin_o.item.component.url_s.includes('m3u8')) {   // HLS
        src = video.origin_o.item.component.url_s;
        type = 'application/x-mpegURL'
      } else if(video.origin_o.item.component.url_s.includes('mpd')) {  // DASH
        src = video.origin_o.item.component.url_s;
        type = 'application/dash+xml'
      }

      player.src({
        src,
        type
      });
    }
  };

  const initPlayer = () => {
    player = videojs(videoRef.current, {
      controls: true,
      liveui: true
    });

    setPlayerSrc(player, props.video);
    player.one('play', () => {
      updateDimensions();
    });

    const playPause = (type) => {
      const playing = (type === 'play');
      props.dispatch(setVideoStatus({ ...props.videoStatus, playing }));
    };

    ['play', 'pause'].forEach((e) => {
      player.on(e, () => playPause(e));
    });

    props.dispatch(setVideoStatus({ ...props.videoStatus, playing: true }));
  };

  return (
    <div
      id="videoContainer"
      className="player-container stream-player"
      style={{ margin: '0 auto' }}
    >
      <video
        className="video-js vjs-theme-vc"
        controls
        preload="auto"
        width="640"
        height="264"
        autoPlay
        style={{ width: '100%', height: '100%', margin: 'auto' }}
        ref={videoRef}
      >
        <p className="vjs-no-js">
          To view this video please enable JavaScript, and consider upgrading to a
          web browser that
          <a href="https://videojs.com/html5-video-support/" target="_blank" rel="noopener noreferrer">supports HTML5 video</a>
        </p>
      </video>
    </div>
  );
}

export default VideoJSPlayer;

