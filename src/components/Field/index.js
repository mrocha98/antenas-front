import React, { useMemo } from 'react';
import './styles.scss';

function Field({ children, applyHugeDistance = false }) {
  const className = useMemo(
    () => `field ${applyHugeDistance ? 'field--huge-distance' : ''}`,
    [applyHugeDistance]
  );
  return <div className={className}>{children}</div>;
}

export default Field;
