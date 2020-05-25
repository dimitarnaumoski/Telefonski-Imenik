import React, { useReducer } from 'react';
import axios from 'axios';
import KontaktContext from './kontaktContext';
import kontaktReducer from './kontaktReducer';
import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
} from '../types';

const KontaktState = (props) => {
  const initialState = {
    kontakti: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(kontaktReducer, initialState);

  // GET kontakti
  const getKontakti = async () => {
    try {
      const res = await axios.get('/api/kontakti');

      dispatch({ type: GET_CONTACTS, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  // Dodaj kontakt
  const addKontakt = async (kontakt) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/kontakti', kontakt, config);

      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  // Izbrisi kontakt
  const deleteKontakt = async (id) => {
    try {
      await axios.delete(`/api/kontakti/${id}`);

      dispatch({ type: DELETE_CONTACT, payload: id });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  // Azuriraj kontakt
  const updateKontakt = async (kontakt) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(
        `/api/kontakti/${kontakt._id}`,
        kontakt,
        config
      );

      dispatch({ type: UPDATE_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };
  // Izbrisi kontakti
  const clearKontakti = () => {
    dispatch({ type: CLEAR_CONTACTS });
  };

  // Setiraj momentalen kontakt
  const setCurrent = (kontakt) => {
    dispatch({ type: SET_CURRENT, payload: kontakt });
  };
  // Clear momentalen kontakt
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filtiriraj kontakti
  const filterKontakti = (text) => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };
  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };
  return (
    <KontaktContext.Provider
      value={{
        kontakti: state.kontakti,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addKontakt,
        deleteKontakt,
        setCurrent,
        clearCurrent,
        updateKontakt,
        filterKontakti,
        clearFilter,
        getKontakti,
        clearKontakti,
      }}
    >
      {props.children}
    </KontaktContext.Provider>
  );
};

export default KontaktState;
