import React from 'react';
import './feature.css';

const Feature = ({ title, text }) => {
  console.log(text);
  return (
    <div className="gpt3__features-container__feature">
      <div className="gpt3__features-container__feature-title">
        <div />
        <h1>{title}</h1>
      </div>
      <div className="gpt3__features-container__feature-title">
        <h1>{text}</h1>
      </div>
    </div>
  );
};

export default Feature;
