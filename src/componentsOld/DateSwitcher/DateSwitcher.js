import React from 'react';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ArrowForward from '@material-ui/icons/ArrowForward';
import './style.css';

export default function DateSwitcher({children, onChangeMonthBack, onChangeMonthForward}) {
  return (
    <div className="switcher">
      <ArrowBack onClick={onChangeMonthBack} className="icon"/>
        <span className="text">{children}</span>
      <ArrowForward onClick={onChangeMonthForward} className="icon" />
    </div>
  );
}