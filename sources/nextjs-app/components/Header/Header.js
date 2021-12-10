import React, { Component } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { getDescriptor, getNav } from '@craftercms/redux';
import { isNullOrUndefined } from 'util';

import HeaderHolder from './HeaderStyle';
import HeaderSearch from './HeaderSearch';

class Header extends Component {
  constructor(props) {
    super(props);

    this.levelDescriptorUrl = '/site/website/crafter-level-descriptor.level.xml';

    if (isNullOrUndefined(props.descriptors[this.levelDescriptorUrl])) {
      this.props.getDescriptor(this.levelDescriptorUrl);
    }

    this.props.getNav('/site/website');
  }

  renderNavItems() {
    var rootId = '/';

    console.log(this.props);

    return this.props.nav.childIds[rootId].map((id, i) => {
      var navItem = this.props.nav.entries[id];

      return (
        <li key={i} className="navigation__item">
          <Link href={navItem.url}>
            <a className="navigation__link navigation__link--apps">
              <span className="navigation__link--text">
                {navItem.label}
              </span>
            </a>
          </Link>
        </li>
      );
    });
  }

  renderHeaderLogo(descriptor) {
    const logo = descriptor.component.siteLogo;

    return (
      <Link href="/">
        <a
          className="header__logo active"
          style={{ backgroundImage: `url(${logo})` }}
        >Video Center</a>
      </Link>
    );
  }

  render() {
    const { nav, descriptors } = this.props;
    console.log(this.props);
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    return (
      <HeaderHolder>
        <header
          id="mainHeader"
          className={'header ' + (this.props.headerGhost ? 'header--ghost ' : ' ') + (iOS ? 'ios' : '')}
        >
          <div className="header__container">
            <div className="header__overlay"></div>

            {descriptors && descriptors[this.levelDescriptorUrl] &&
            this.renderHeaderLogo(descriptors[this.levelDescriptorUrl])
            }

            <div className="header__navigation">
              <nav className="navigation">
                <ul className="navigation__list">
                  {
                    nav
                    && nav.entries['/']
                    && this.renderNavItems()
                  }
                </ul>
              </nav>
            </div>
            <div className="header__search">
              <div>
                <HeaderSearch />
              </div>
            </div>
          </div>
        </header>
      </HeaderHolder>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getDescriptor: url => dispatch(getDescriptor(url)),
  getNav: url => dispatch(getNav(url))
});

const mapStateToProps = store => {
  console.log(store);
  return ({
    nav: store.craftercms.navigation,
    descriptors: store.craftercms.descriptors.entries,
    headerGhost: store.header.headerGhost
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
