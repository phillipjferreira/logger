import React from 'react';
import BurndownChart from './BurndownChart';

const BurndownContainer = ({ sprintData }) => {
  return <BurndownChart sprintData={sprintData} />;
};

export default BurndownContainer;
