import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import KontaktContext from '../../context/kontakt/kontaktContext';

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const kontaktContext = useContext(KontaktContext);

  const { isAuthenticated, logout, korisnik } = authContext;
  const { clearKontakti } = kontaktContext;

  const onLogout = () => {
    logout();
    clearKontakti();
  };

  const authLinks = (
    <Fragment>
      <li>Здраво {korisnik && korisnik.name}</li>
      <li>
        <a onClick={onLogout} href="#!">
          <i className="fas fa-sign-out-alt"></i>{' '}
          <span className="hide-sm">Одјави се</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/registracija">Регистрирај се</Link>
      </li>
      <li>
        <Link to="/najava">Најави се</Link>
      </li>
      <li>
        <Link to="/info">Инфо</Link>
      </li>
    </Fragment>
  );

  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: 'Телефонски именик',
  icon: 'fas fa-id-card-alt',
};

export default Navbar;
