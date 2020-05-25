import React, { useContext, useRef, useEffect } from 'react';
import KontaktContext from '../../context/kontakt/kontaktContext';
const KontaktFilter = () => {
  const kontaktContext = useContext(KontaktContext);
  const text = useRef('');

  const { filterKontakti, clearFilter, filtered } = kontaktContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterKontakti(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        type="text"
        ref={text}
        placeholder="Пребарувај контакти"
        onChange={onChange}
      />
    </form>
  );
};

export default KontaktFilter;
