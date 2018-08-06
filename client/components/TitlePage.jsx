import React from 'react';
import PlayerPresentation from './grid/PlayerPresentation';
// import PropTypes from 'prop-types'

const TitlePage = ({numLevels, goToLevel, unlocked}) => {
  const levelNums = [];
  for (let i = 0; i <= numLevels; i += 1) {
    levelNums.push(i);
  }
  return (
    <div>
      <h1 className="center">Bright Line</h1>
      <div className="center verticalMargin">
        <PlayerPresentation size={100} />
      </div>
      <p className="center verticalMargin">Levels</p>
      <div className="levelButton-container">
        {levelNums.map(num => {
          const isDisabled = num > unlocked;
          return (
            <button
              className={`levelButton${!isDisabled ? ' ' : ' restricted'}`}
              onClick={() => {
                if (!isDisabled) goToLevel(num);
              }}
              key={num}
            >
              {num + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TitlePage;
