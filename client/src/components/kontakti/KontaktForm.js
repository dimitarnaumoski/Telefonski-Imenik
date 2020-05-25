import React, { useState, useContext, useEffect } from 'react';
import KontaktContext from '../../context/kontakt/kontaktContext';

const KontaktForm = () => {
  const kontaktContext = useContext(KontaktContext);
  const { addKontakt, updateKontakt, clearCurrent, current } = kontaktContext;

  useEffect(() => {
    if (current !== null) {
      setKontakt(current);
    } else {
      setKontakt({
        name: '',
        email: '',
        phone: '',
        type: 'персонален',
      });
    }
  }, [kontaktContext, current]);

  const [kontakt, setKontakt] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'персонален',
  });

  const { name, email, phone, type } = kontakt;

  const onChange = (e) =>
    setKontakt({ ...kontakt, [e.target.name]: e.target.value }); // ...spread operator

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addKontakt(kontakt);
    } else {
      updateKontakt(kontakt);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">
        {current ? 'Промени контакт' : 'Додај контакт'}
      </h2>
      <input
        type="text"
        placeholder="Име"
        name="name"
        value={name}
        onChange={onChange}
        required
      />
      <input
        type="email"
        placeholder="Емаил"
        name="email"
        value={email}
        onChange={onChange}
        required
      />
      <input
        type="text"
        placeholder="Телефон"
        name="phone"
        value={phone}
        onChange={onChange}
        required
      />
      <h5>Тип на контакт:</h5>
      <input
        type="radio"
        name="type"
        value="персонален"
        checked={type === 'персонален'}
        onChange={onChange}
      />
      Персонален{' '}
      <input
        type="radio"
        name="type"
        value="работа"
        checked={type === 'работа'}
        onChange={onChange}
      />
      Работа
      <div>
        <input
          type="submit"
          value={current ? 'Ажурирај контакт' : 'Додај контакт'}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Исчисти
          </button>
        </div>
      )}
    </form>
  );
};

export default KontaktForm;
