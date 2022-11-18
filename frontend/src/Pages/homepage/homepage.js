import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

function Homepage(props) {
    const [numberOfPeople, setNumberOfPeople] = useState(0)
    const [personName, setPersonName] = useState({})
    const onNumberChange = (event) => {
        setNumberOfPeople(event.target.value)
    };
    const onPersonChange = (e, i) => {
        setPersonName(prevState => {
            return {...prevState, [i]: e.target.value}
        })
    };

    useEffect(() => {
        buildInputBoxes()
    }, [numberOfPeople])

    const buildInputBoxes = () => {
        let temp = [];
        for (let i = 0; i < numberOfPeople; i++) {
            temp.push(<div key={i}>
                <span>{i + 1}</span>
                <input key={i} type="text" onChange={(e) => {
                    onPersonChange(e, i)
                }}/>
            </div>)
        }
        return temp
    }
    const onDone = () => {
        let temp = []
        for (const [key, value] of Object.entries(personName)) {
            temp.push(value)
        }
        localStorage.setItem('personNames', JSON.stringify(temp))
    }
    return (
        <div>
            <h3>Welcome to Click-n-Split</h3>
            <p>Enter number of people involved in the transaction?</p>
            <div>
                <input type="number" onChange={onNumberChange}/>
            </div>
            {numberOfPeople > 0 && <div>
                <div>
                    <p>Enter Persons name :</p>
                    {buildInputBoxes()}
                </div>
                <Link to={'upload'}>
                    <button onClick={onDone}>
                        Done
                    </button>
                </Link>
            </div>}


        </div>
    );
}

export default Homepage;