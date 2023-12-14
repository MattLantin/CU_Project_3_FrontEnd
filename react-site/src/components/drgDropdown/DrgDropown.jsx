import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const DrgDropdown = ({ endpoint, onSelect }) => {
    const [items, setItems] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        fetch(endpoint)
            .then(response => response.json())
            .then(data => {
                console.log('Fetched data:', data); // Log the fetched data
                const formattedItems = data.map(item => {
                    const categoryName = Object.keys(item)[0];
                    return { label: categoryName, value: categoryName };
                });
                setItems(formattedItems);
            })
            .catch(error => console.error('Error fetching data: ', error));
    }, [endpoint]);

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        onSelect(selectedOption.value);
    };

    return (
        <Select 
            value={selectedOption}
            onChange={handleChange}
            options={items}
            placeholder="--Select Category--"
        />
    );
};

export default DrgDropdown;
