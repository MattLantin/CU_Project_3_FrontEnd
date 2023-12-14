import React, { useState, useEffect } from 'react';
import DrgDropdown from '../../components/drgDropdown/DrgDropown.jsx';
import DrgDefinitionDropDown from '../../components/drgDefinitionDropDown/DrgDefinitionDropDown.jsx';
import ChoroplethMap from '../../components/choroplethMap/ChoroplethMap.jsx';
import Description from '../description/Description.jsx';
import CaseStudies from '../caseStudies/CaseStudies.jsx';

import './dataContent.css';

const DataContent = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [drg_id, setDrg_id] = useState(null);
  const [statsData, setStatsData] = useState([]);
  const [generalStatisticData, setGeneralStatisticData] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('http://pi3.sytes.net:5015/api/v1.0/stats');
        const data = await response.json();
        // Convert the object to an array
        const dataArray = Object.values(data);
        setStatsData(dataArray);
      } catch (error) {
        console.error('Error fetching stats data:', error);
      }
    };

    fetchStats();
  }, []);
  // Fetch stats data when the component mounts
  const handleDrg_id = (value) => {
    setDrg_id(value);
    // Find and log the corresponding object in statsData
    const data = statsData.find(item => item.drg_id === value); // Assuming each item has an 'id' property
    if (data) {
      console.log(data);
      setGeneralStatisticData(data)
    }
  };
  const handleCategorySelect = (value) => {
    setSelectedCategory(value); // Update the state with the selected value
  };

  const formatDollarAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
};

  const generalStatistics = [
    {
      title: 'Number of Procedures',
      text: `${generalStatisticData ? generalStatisticData.count : ''}`,
    },
    {
      title: 'Average Cost Difference ',
      text: `${generalStatisticData ? formatDollarAmount(generalStatisticData.avg_difference) : ''}`,
      
    },
    {
      title: 'Average Medicare Costs',
      text: `${generalStatisticData ? formatDollarAmount(generalStatisticData.avg_medicare) : ''}`,
    },
    {
      title: 'Average Payment Costs',
      text: `${generalStatisticData ? formatDollarAmount(generalStatisticData.avg_payments) : ''}`,
    },
  ];

  return (
    <div>
      <div>
        <div className="gpt3__possibility section__padding" id="possibility" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="gpt3__possibility-content">
              <h1 className="gradient__text">Choropleth Map <br /> Statistics and Data</h1>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
                <DrgDropdown
                    endpoint="http://pi3.sytes.net:5015/api/v1.0/categories" 
                    onSelect={handleCategorySelect} 
                />
                <DrgDefinitionDropDown
                    drgType={selectedCategory} 
                    onSelect={handleDrg_id}
                />
              </div>
            </div>
            <div className="gpt3__possibility-image">
              <ChoroplethMap
                  selectedProcedure={drg_id}
              />
            </div>
          </div>
          <Description generalStatisticData={generalStatistics}/>
        </div>
      <CaseStudies 
        drg_id={drg_id}
      />
    </div>
  );
};

export default DataContent;

