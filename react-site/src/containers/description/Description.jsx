import React from 'react';
import Feature from '../../components/feature/Feature';
import './description.css';
import statImg from '../../assets/generalStats.png'

const Description = ({ generalStatisticData }) => {
  return (
    <div className="features section__padding" id="features" style={{ justifyContent: 'center', alignItems: 'center' }}>
      <div className="features-heading">
        <h1 className="gradient__text">General Statistics</h1>
        <img className="imgDimensions" src={statImg}/>
      </div>
      <div className="features-container">
        {generalStatisticData.map((item, index) => (
          <Feature title={item.title} text={item.text} key={item.title + index} />
        ))}
      </div>
    </div>
  );
};

export default Description;

