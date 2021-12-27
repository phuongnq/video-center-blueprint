import React from 'react';
import { ThemeProvider } from 'styled-components';
import themes from '../settings/themes';
import { themeConfig } from '../settings';
import AppHolder from '../AppStyle';
import { Provider } from 'react-redux';
import store from '../store';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import VideoPlayer from '../components/VideoPlayer/VideoPlayer';

import '../index.css';
import 'antd/dist/antd.css';
import '../components/VideoPlayer/videojs-theme.css';

function App({ Component, pageProps }) {

  return (
    <ThemeProvider theme={themes[themeConfig.theme]}>
      <Provider store={store}>
        <AppHolder className="app">
          <div className="app-content">
            <div className="app-content__cont" id="app-content">
              <div className="app-content__main">
                <Header />
                <div id="app-content-player">
                  <div suppressHydrationWarning={true}>
                    {process.browser && <VideoPlayer />}
                  </div>
                </div>
                <Component {...pageProps} />
                <Footer />
              </div>
            </div>
          </div>
        </AppHolder>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
