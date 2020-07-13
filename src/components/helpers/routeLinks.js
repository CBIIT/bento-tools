import React from 'react';
import PropTypes from 'prop-types';

import { HashRouter, Link } from 'react-router-dom';

function linkIsExternal(linkElement) {
  return (linkElement.substring(0, 1) !== '/');
}

function linkIsEmail(linkElement) {
  return (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(linkElement));
}

const RouteLinks = ({ to, children }) => (linkIsEmail(to)
  ? (
    <a href={`mailto:${to}/`}>{children}</a>
  )
  : (linkIsExternal
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
    )));

RouteLinks.propTypes = {
  to: PropTypes.string.isRequired,
};

export default RouteLinks;
