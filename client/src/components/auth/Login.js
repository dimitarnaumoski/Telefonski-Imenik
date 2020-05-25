import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/Alert/alertContext';

const Login = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/'); // se vrakjame vo pocetna '/'
    }
    if (error === 'Невалидно') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]); // [error] kako dependency kako useEffect

  const [korisnik, setKorisnik] = useState({
    email: '',
    password: '',
  });

  const { email, password } = korisnik;

  const onChange = (e) =>
    setKorisnik({ ...korisnik, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Ве молиме пополнете ги сите полиња', 'danger');
    } else {
      login({
        email,
        password,
      });
    }
  };

  return (
    <div className="form-container">
      <h1>
        Најави <span className="text-primary">Се</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div action="" className="form-group">
          <label htmlFor="email">E-mail адреса</label>
          <input type="email" name="email" value={email} onChange={onChange} />
        </div>
        <div action="" className="form-group">
          <label htmlFor="password">Лозинка</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>

        <input
          type="submit"
          value="Најави се"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Login;
