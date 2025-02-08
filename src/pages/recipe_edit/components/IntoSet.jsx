import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import styles from './input.module.css';

function IntoSet({formData, addChange}) {

    const { user } = useContext(AuthContext);
    const [setList, setSetList] = useState([]);
    const [setId, setSetId] = useState();

    const optionChange = (event) => {
        setSetId(event);
        addChange(event);
    }

    useEffect(() => {
        const fetchSets  = async () => {
            try {
                const data = {"accountId": user.id}
                const response = await fetch(`${process.env.REACT_APP_API_URL}/set/all`, {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json',
                    }, 
                    body: JSON.stringify(data), 
                });
                if (response.ok) {
                    const data = await response.json();
                    setSetList(data.set);
                } else {
                    console.log('Failed');
                }
            } catch (error) {
                console.error('Error:', error);
                console.log('Server error');
            }
        };
        fetchSets();
    }, []);

    return (
        <div>
            <p>Add a recipe to the set meals</p>
            <select onChange={(e) => optionChange(e.target.value)}>
                <option>None</option>
                {setList.length > 0 && (
                    setList.map((set, index) => (
                    <option key={index} value={set.id} >{set.name}</option>
                    ))
                )}
            </select>
        </div>
    )
}

export default IntoSet;