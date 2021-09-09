import Document, {Html, Head, Main, NextScript} from 'next/document';
import * as snippet from '@segment/snippet';

class MyDocument extends Document {
  // @ts-ignore
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return {...initialProps};
  }

  renderSnippet() {
    if (process.env.APP_ENV === 'development') {
      return '// Figment devs are cool';
    } else {
      const opts = {
        apiKey: 'KLQshYRaDKzGsqjDttQ58EJDfBK8MKTy',
        // note: the page option only covers SSR tracking.
        // Page.js is used to track other events using `window.analytics.page()`
        page: true,
      };

      return snippet.max(opts);
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <script dangerouslySetInnerHTML={{__html: this.renderSnippet()}} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
