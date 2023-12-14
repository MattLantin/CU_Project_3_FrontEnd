import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const DrgDefinitionDropDown = ({ drgType, onSelect }) => {
    const [items, setItems] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://pi3.sytes.net:5015/api/v1.0/definitions/' + drgType);
                const data = await response.json();
                console.log('Fetched Data:', data);
                if (Array.isArray(data)) {
                    const formattedItems = data.map(item => {
                        // Remove numbers and hyphen from the beginning of the string
                        const label = item.text.replace(/^\d+\s-\s/, '');
                        return { label: label, value: item.value };
                    });
                    setItems(formattedItems);
                } else {
                    console.error('Data is not an array:', data);
                }
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };
    
        if (drgType) {
            fetchData();
        }
    }, [drgType]);
    

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        if (onSelect) {
            onSelect(selectedOption.value);
        }
    };

    return (
        <Select 
            value={selectedOption}
            onChange={handleChange}
            options={items}
            placeholder="--Select Procedure--"
        />
    );
};

export default DrgDefinitionDropDown;
