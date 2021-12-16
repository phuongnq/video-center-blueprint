import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getDescriptor } from '@craftercms/redux';

import FooterHolder from './FooterStyle';

function Footer(props) {
  const footerUrl = '/site/components/footer.xml';
  useEffect(() => {
    props.getDescriptor(footerUrl);
  }, []);

  const renderFooterNav = (nav) => {
    if (Object.keys(nav).length === 0 && nav.constructor === Object) {
      return null;
    }
    return nav.item.map((entry, i) => {
      return (
        <a
          key={i}
          className="footer__link"
          target="_blank"
          href={entry.link_s}
          rel="noopener noreferrer"
        >
          {entry.title_t}
        </a>
      );
    });
  };

  const renderFooterContent = (descriptor) => {
    const currentYear = new Date().getFullYear(),
      updatedCopyright = descriptor.component.copyrightLabel_t.replace('{year}', currentYear);

    return (
      <div className="footer__content">
        <div className="footer__copyright">
          {updatedCopyright}
        </div>

        <div className="footer__nav">
          {descriptor.component.nav_o &&
          renderFooterNav(descriptor.component.nav_o)
          }
        </div>
      </div>
    );
  };

  return (
    <FooterHolder>
      <footer className="footer">
        {props.descriptors && props.descriptors[footerUrl] &&
        renderFooterContent(props.descriptors[footerUrl])
        }
      </footer>
    </FooterHolder>
  );
}

const mapDispatchToProps = dispatch => ({
  getDescriptor: url => dispatch(getDescriptor(url))
});

const mapStateToProps = store => ({
  descriptors: store.craftercms.descriptors.entries
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
