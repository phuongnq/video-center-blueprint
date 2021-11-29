import Cookies from 'js-cookie';

export const common = {
  repoUrl: 'https://github.com/craftercms/video-center-blueprint'
};

let site = '';
if (process.browser) {
  document.getElementById('studioSiteName').innerHTML;
  if(site === '' || site === 'null') {
    site = Cookies.get('crafterSite');
  }
} else {
  site = process.env.REACT_APP_CRAFTERCMS_SITE_ID;
}

let baseUrl = '';
if (process.browser) {
  let baseUrl = document.getElementById('studioBaseUrl').innerHTML;
  if (baseUrl === '' || baseUrl === 'null') {
    baseUrl = window.location.origin;
  }
} else {
  baseUrl = process.env.NEXT_PUBLIC_REACT_APP_CRAFTERCMS_BASE_URL;
}

export const studioConfig = {
  site,
  baseUrl,
  navTreeBase: '/site/website'
};

export const themeConfig = {
  theme: 'themeDefault'
};
