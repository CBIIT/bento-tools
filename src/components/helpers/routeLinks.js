import React from 'react';
import PropTypes from 'prop-types';

import { HashRouter, Link } from 'react-router-dom';

function linkIsExternal(linkElement) {
  return (linkElement.substring(0, 1) !== '/');
}

const RouteLinks = ({ to, children }) => (linkIsExternal(to)
  ? (
    <a
      href={to}
      target="external-url"
    >
      {children}
    </a>
  )
  : (
    <HashRouter>
      <Link to={to}>
        {children}
      </Link>
    </HashRouter>
  ));

RouteLinks.propTypes = {
  to: PropTypes.string.isRequired,
};

export default RouteLinks;
