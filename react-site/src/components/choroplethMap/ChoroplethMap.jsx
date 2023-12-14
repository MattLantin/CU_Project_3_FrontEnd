import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

const ChoroplethMap = ({ selectedProcedure }) => {
    const [mapData, setMapData] = useState({});
    const stateNames = {
        "AL": "Alabama",
        "AK": "Alaska",
        "AZ": "Arizona",
        "AR": "Arkansas",
        "CA": "California",
        "CO": "Colorado",
        "CT": "Connecticut",
        "DE": "Delaware",
        "FL": "Florida",
        "GA": "Georgia",
        "HI": "Hawaii",
        "ID": "Idaho",
        "IL": "Illinois",
        "IN": "Indiana",
        "IA": "Iowa",
        "KS": "Kansas",
        "KY": "Kentucky",
        "LA": "Louisiana",
        "ME": "Maine",
        "MD": "Maryland",
        "MA": "Massachusetts",
        "MI": "Michigan",
        "MN": "Minnesota",
        "MS": "Mississippi",
        "MO": "Missouri",
        "MT": "Montana",
        "NE": "Nebraska",
        "NV": "Nevada",
        "NH": "New Hampshire",
        "NJ": "New Jersey",
        "NM": "New Mexico",
        "NY": "New York",
        "NC": "North Carolina",
        "ND": "North Dakota",
        "OH": "Ohio",
        "OK": "Oklahoma",
        "OR": "Oregon",
        "PA": "Pennsylvania",
        "RI": "Rhode Island",
        "SC": "South Carolina",
        "SD": "South Dakota",
        "TN": "Tennessee",
        "TX": "Texas",
        "UT": "Utah",
        "VT": "Vermont",
        "VA": "Virginia",
        "WA": "Washington",
        "WV": "West Virginia",
        "WI": "Wisconsin",
        "WY": "Wyoming",
        "DC": "District of Columbia"
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://pi3.sytes.net:5015/api/v1.0/drg/${selectedProcedure}`);
                const data = await response.json();
                setMapData(data);
            } catch (error) {
                console.error('Error fetching map data:', error);
            }
        };

        if (selectedProcedure) {
            fetchData();
        }
    }, [selectedProcedure]);

    // Prepare text for hoverinfo
    const hoverText = Object.entries(mapData).map(([stateAbbr, data]) => {
        return `<b>${stateNames[stateAbbr] || stateAbbr}</b><br>` +
               `Average Cost: ${formatDollarAmount(data.avg_payments)}<br>` +
               `Average Medicare: ${formatDollarAmount(data.avg_medicare)}<br>` +
               `Difference: ${formatDollarAmount(data.avg_difference)}<br>` +
               `Percent Medicare: ${data.pct_medicare}%<br>` +
               `Total Providers: ${data.count}<br>` +
               `Total Patients: ${data.discharges}`;
    });

    const locations = Object.keys(mapData); 
    const zValues = locations.map(state => mapData[state].avg_payments);

    return (
        <Plot
            data={[
                {
                    type: 'choropleth',
                    locationmode: 'USA-states',
                    locations: locations,
                    z: zValues,
                    text: hoverText,
                    hoverinfo: 'text',
                    colorscale: 'Reds',
                }
            ]}
            layout={{
                title: 'Treatment Charges Across the U.S.',
                geo: {
                    scope: 'usa',
                    countrycolor: 'rgb(200, 200, 200)',
                    showland: true,
                    landcolor: 'rgb(217, 217, 217)',
                    showlakes: true,
                    lakecolor: 'rgb(255, 255, 255)',
                    subunitcolor: 'rgb(255, 255, 255)',
                },
                margin: { l: 0, r: 0, t: 50, b: 0 }, 
                autosize: true 
            }}
            style={{ width: '100%', height: '100%' }}
        />
    );
};

const formatDollarAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
};

export default ChoroplethMap;

