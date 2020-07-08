import React from 'react';
import MedalCard from '../MedalCard';
import { useAuth } from '../../contexts/auth';
import './styles.scss';

function MedalCardList() {
  const { getUserInfo } = useAuth();
  const { medal: userMedals } = JSON.parse(getUserInfo());
  const isEmpty = userMedals.length < 1;

  const Empty = () => (
    <div>
      <b>Parece que você ainda não tem medalhas ¯\_(ツ)_/¯</b>
    </div>
  );

  return (
    <>
      {isEmpty ? (
        <Empty />
      ) : (
        <ul className="card-list">
          {userMedals.map((medal) => (
            <li key={medal._id}>
              <MedalCard
                title={medal.title}
                type={medal.type}
                text={medal.description}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default MedalCardList;
