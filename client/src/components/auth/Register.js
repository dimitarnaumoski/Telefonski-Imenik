import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/Alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { registracija, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/'); // se vrakjame vo pocetna '/'
    }
    if (error === 'Корисникот веќе постои') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]); // [error] kako dependency kako useEffect

  const [korisnik, setKorisnik] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = korisnik;

  const onChange = (e) =>
    setKorisnik({ ...korisnik, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      setAlert('Ве молиме пополнете ги сите полиња', 'danger');
    } else if (password !== password2) {
      setAlert('Лозинките не се совпаѓаат', 'danger');
    } else {
      registracija({
        name,
        email,
        password,
      });
    }
  };

  return (
    <div className="form-container">
      <h1>
        Регистрирај <span className="text-primary">Се</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div action="" className="form-group">
          <label htmlFor="name">Име</label>
          <input type="text" name="name" value={name} onChange={onChange} />
        </div>
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
            minLength="6"
          />
        </div>
        <div action="" className="form-group">
          <label htmlFor="password2">Потврди Лозинка</label>
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={onChange}
            minLength="6"
          />
        </div>
        <input
          type="submit"
          value="Регистрирај се"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Register;
