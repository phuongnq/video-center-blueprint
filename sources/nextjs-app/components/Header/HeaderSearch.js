import React, { Component } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import HeaderSearchModal from './HeaderSearchStyle';
import InputSearch from './searchBox';

function HeaderSearch() {
  const router = useRouter();
  const [modalVisibility, setModalVisibility] = React.useState(false);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setModalVisibility(false);
      const url = `/search/${e.target.value}`;
      router.push(url);
    }
  };

  return (
      <div className="header__search--container">
        <FontAwesomeIcon
          className="search__icon" icon={faSearch}
          onClick={() => setModalVisibility(true)}
        />

        <HeaderSearchModal
          style={{ top: 0 }}
          visible={modalVisibility}
          onOk={() => setModalVisibility(false)}
          onCancel={() => setModalVisibility(false)}
          footer={null}
          className="header__search--modal"
          width="100%"
          closable={false}
          destroyOnClose={true}
          ref={node => (this.searchModal = node)}
        >
          <FontAwesomeIcon className="search__icon" icon={faSearch} />

          <InputSearch
            handleKeyPress={handleKeyPress}
          />
          <button className="ant-modal-close" onClick={() => setModalVisibility(false)}>
            <span className="ant-modal-close-x"></span>
          </button>
        </HeaderSearchModal>
      </div>
    );

}

export default HeaderSearch;
