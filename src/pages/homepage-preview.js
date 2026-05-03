import React from 'react';
import Head from '@docusaurus/Head';
import BrowserOnly from '@docusaurus/BrowserOnly';

export default function HomepagePreview() {
  return (
    <>
      <Head>
        <title>5L Labs — Homepage Preview</title>
        <meta name="robots" content="noindex,nofollow" />
        <style>{`
          /* Hide Docusaurus navbar/footer so the preview fills the viewport */
          .navbar, .footer, [class*="docRoot"], [class*="mainWrapper"] > footer {
            display: none !important;
          }
          html, body, #__docusaurus {
            height: 100%;
            overflow: hidden;
          }
        `}</style>
      </Head>
      <BrowserOnly fallback={<div style={{ padding: 40, fontFamily: 'monospace' }}>Loading preview…</div>}>
        {() => {
          const PreviewApp = require('../components/HomepageRedesign/PreviewApp').default;
          return <PreviewApp />;
        }}
      </BrowserOnly>
    </>
  );
}
