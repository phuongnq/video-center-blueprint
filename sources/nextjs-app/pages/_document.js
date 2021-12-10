/*
 * Copyright (C) 2007-2021 Crafter Software Corporation. All Rights Reserved.
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

import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    const PUBLIC_URL = process.env.PUBLIC_URL;
    const REACT_APP_SITE_NAME = process.env.REACT_APP_SITE_NAME;
    const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

    return (
      <Html>
        <Head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta name="theme-color" content="#000000" />
          <link rel="manifest" href={`${PUBLIC_URL}/manifest.json`} crossorigin="use-credentials" />
          <link rel="shortcut icon" href={`${PUBLIC_URL}/favicon.ico`} />

          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
          <title>Video Center</title>
          <script id="studioSiteName" type="application/json">{REACT_APP_SITE_NAME}</script>
          <script id="studioBaseUrl" type="application/json">{REACT_APP_BASE_URL}</script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument;