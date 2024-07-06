import React from 'react';
import details from './data';
import EmployeeProfile from './employeeprofile';
import Template from './card1';

const App = () => {
  return (
    <>
      <EmployeeProfile details={details}  />
      <Template/>
      </>
  );
};

export default App;
