// StepsBar.js
import React from 'react';

const StepsMint = ({ currentStep }) => {
  const steps = [' 1', ' 2', ' 3']; // Define your steps here

  return (
    <div className="flex items-center mx-auto">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div className={`w-4 h-4 transform rotate-45 border-2 ${index < currentStep ? 'bg-brown border-gradient' : 'bg-silver border-silver'}`}></div>
          {index < steps.length - 1 && <div className={`h-0.5 w-8 bg-tertiary  ${index < currentStep - 1 ? 'bg-[#DEC58D]' : ''}`}></div>}
        </div>
      ))}
    </div>
  );
};

export default StepsMint;
