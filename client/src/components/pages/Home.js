import React, { useContext, useEffect } from 'react';
import Kontakti from '../kontakti/Kontakti';
import KontaktForm from '../kontakti/KontaktForm';
import KontaktFilter from '../kontakti/KontaktFilter';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadKorisnik();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="grid-2">
      <KontaktForm />
      <div>
        <KontaktFilter />
        <Kontakti />
      </div>
    </div>
  );
};

export default Home;
