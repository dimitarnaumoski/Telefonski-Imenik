import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import KontaktItem from './KontaktItem';
import KontaktContext from '../../context/kontakt/kontaktContext';
import Spinner from '../layout/spinner';

const Kontakti = () => {
  const kontaktContext = useContext(KontaktContext);

  const { kontakti, filtered, getKontakti, loading } = kontaktContext;
  useEffect(() => {
    getKontakti();
    // eslint-disable-next-line
  }, []);

  if (kontakti !== null && kontakti.length === 0 && !loading) {
    return <h4>Ве замолуваме да додаете контакт</h4>;
  }

  return (
    <Fragment>
      {kontakti !== null && !loading ? (
        <TransitionGroup>
          {filtered != null
            ? filtered.map((kontakt) => (
                <CSSTransition
                  key={kontakt._id}
                  timeout={500}
                  classNames="item"
                >
                  <KontaktItem kontakt={kontakt} />
                </CSSTransition>
              ))
            : kontakti.map((kontakt) => (
                <CSSTransition timeout={500} classNames="item">
                  <KontaktItem key={kontakt._id} kontakt={kontakt} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Kontakti;
