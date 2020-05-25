import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
  CLEAR_CONTACTS,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        kontakti: action.payload,
        loading: false,
      };
    case ADD_CONTACT:
      return {
        ...state, // momentalen state
        kontakti: [action.payload, ...state.kontakti], // ...state(ona stoe  tamu) // payload - azurirame state.
        loading: false,
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        kontakti: state.kontakti.map((kontakt) =>
          kontakt._id === action.payload._id ? action.payload : kontakt
        ),
        loading: false,
      };
    case DELETE_CONTACT:
      return {
        ...state,
        kontakti: state.kontakti.filter(
          (kontakt) => kontakt._id !== action.payload
        ),
        loading: false,
      };
    case CLEAR_CONTACTS:
      return {
        ...state,
        kontakti: null,
        filtered: null,
        error: null,
        current: null,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case FILTER_CONTACTS:
      return {
        ...state,
        filtered: state.kontakti.filter((kontakt) => {
          const regex = new RegExp(`${action.payload}`, 'gi'); // global Insensetive (case dali e uppercase ili lowercase)
          return kontakt.name.match(regex) || kontakt.email.match(regex);
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case CONTACT_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
