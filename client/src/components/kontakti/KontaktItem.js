import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import KontaktContext from '../../context/kontakt/kontaktContext';

const KontaktItem = ({ kontakt }) => {
  const kontaktContext = useContext(KontaktContext);

  const { deleteKontakt, setCurrent, clearCurrent } = kontaktContext;

  const { _id, name, email, phone, type } = kontakt;

  const onDelete = () => {
    deleteKontakt(_id);
    clearCurrent();
  };

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}{' '}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' + (type === 'работа' ? 'badge-success' : 'badge-primary')
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className="list">
        {email && (
          <li>
            <i className="fas fa-envelope-open"></i> {email}
          </li>
        )}
        {phone && (
          <li>
            <i className="fas fa-phone"></i> {phone}
          </li>
        )}
      </ul>
      <p>
        <button
          className="btn btn-dark btn-sm"
          onClick={() => setCurrent(kontakt)}
        >
          Ажурирај
        </button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Избриши
        </button>
      </p>
    </div>
  );
};

KontaktItem.propTypes = {
  kontakt: PropTypes.object.isRequired,
};

export default KontaktItem;
