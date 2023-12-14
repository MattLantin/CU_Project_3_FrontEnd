import React from 'react';
import ai from '../../assets/ai.png';
import './header.css';

const Header = () => (
  <div className="section__padding gpt3__header" id="home">
    <div className="gpt3__header-content">
      <h1 className="gradient__text">Medical Treatment Cost Visual App</h1>
      <p>
      An analysis of a dataset with 200,000 records reveals stark disparities in U.S. surgery costs for FY 2014, such as open heart surgery prices ranging from $2.2 million in Stanford to $438,000 in Dallas. The study includes geographical mapping of cities to their coordinates to examine regional cost variations and their causes.
      </p>
    </div>

    <motdiv className="gpt3__header-image">
      <img src={ai} />
    </motdiv>
  </div>
);

export default Header;
