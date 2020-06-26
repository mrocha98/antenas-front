import React from 'react';

function Emoji({ emoji, name }) {
  return (
    <span role="img" aria-label={name}>
      &nbsp; {emoji} &nbsp;
    </span>
  );
}

export default Emoji;
