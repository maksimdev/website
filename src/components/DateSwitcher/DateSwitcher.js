import React from 'react';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ArrowForward from '@material-ui/icons/ArrowForward';
import './style.css';

export default function DateSwitcher({children, onChangeMonthBack, onChangeMonthForward}) {
  return (
    <span className="switcher">
      <ArrowBack onClick={onChangeMonthBack} />
        {children}
      <ArrowForward onClick={onChangeMonthForward} />
    </span>
  );
}