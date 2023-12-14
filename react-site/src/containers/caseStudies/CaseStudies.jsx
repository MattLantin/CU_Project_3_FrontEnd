import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import './caseStudies.css';

const CaseStudies = ({ drg_id }) => {
  const [avgPaymentsData, setAvgPaymentsData] = useState([]);
  const [scatterData, setScatterData] = useState([]);
  const [coveragePlotData, setCoveragePlotData] = useState([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://pi3.sytes.net:5015/api/v1.0/drg/${drg_id}`);
        const data = await response.json();

        // Process data for bar plot
        const barData = {
          x: Object.keys(data),
          y: Object.values(data).map(item => item.avg_payments),
          type: 'bar'
        };
        setAvgPaymentsData(barData);

        const xValues = Object.values(data).map(item => item.discharges);
        const yValues = Object.values(data).map(item => item.avg_payments);
        const sizes = yValues.map(v => Math.sqrt(v) / 20); 

        const scatterPlotData = {
          x: xValues,
          y: yValues,
          mode: 'markers',
          marker: {
            size: sizes,
            color: xValues,
            colorscale: 'Portland'
          },
          type: 'scatter'
        };
        setScatterData(scatterPlotData);

        // Process data for scatter plot
        const coverageX_Values = Object.values(data).map(item => (item.avg_medicare/item.avg_payments));
        const coverageY_Values = Object.values(data).map(item => item.avg_payments);
        const coverageSizes = yValues.map(v => Math.sqrt(v) / 20); 

        const coveragePlotData = {
          x: coverageX_Values,
          y: coverageY_Values,
          mode: 'markers',
          marker: {
            size: coverageSizes,
            color: coverageX_Values,
            colorscale: 'Portland'
          },
          type: 'scatter'
        };

        setCoveragePlotData(coveragePlotData);

      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    if (drg_id) {
      fetchData();
    }
  }, [drg_id]);

  return (
    <div className="caseStudy section__padding" id="blog">

      <div className='caseStudy_container'>
        <div>
          <div className="caseStudy_Heading">
            <h1 className="gradient__text">A lot is happening, <br /> In Our Data.</h1>
          </div>
              <Plot
                data={[avgPaymentsData]}
                layout={{
                  width: 720, height: 440, title: `Average Payments by State`,
                  xaxis: { title: 'States' },
                  yaxis: { title: 'Payments in Dollars' }
                }}
              />
          </div>
        <div className='caseStudy_scatterplot_container'>
          <Plot
              data={[coveragePlotData]}
              layout={{
                width: 720, height: 440, title: `Coverage Percent to Total Payments Ratio`,
                xaxis: { title: 'Coverage Percent' },
                yaxis: { title: 'Total Payment Ratio' }
              }}
            />

          <Plot
              data={[scatterData]}
              layout={{
                width: 720, height: 440, title: `Discharge to Total Payments Ratio`,
                xaxis: { title: 'Number of Discharges' },
                yaxis: { title: 'Total Payments in Dollars' }
              }}
            />
        </div>
      </div>
    </div>
  );
};

export default CaseStudies;
