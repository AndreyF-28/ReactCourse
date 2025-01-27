import React, {useState} from 'react';

const Texting = () => {
    const [value, setValue] = useState('Text')

    return (
        <div>
            <h1>{value}</h1>
            <input
                type="text"
                value={value}
                onChange={event => setValue(event.target.value)}
            />
        </div>
    );
};

export default Texting;