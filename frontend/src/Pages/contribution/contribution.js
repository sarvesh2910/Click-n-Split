import React, {useEffect, useState} from 'react';

function Contri(props) {
    const [contriData, setContriData] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/todos/1")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setContriData(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setContriData('error');
                }
            )
    }, [])

    return isLoaded ? (
        <div>
            <h3>Individual Contributions</h3>
            <div>

            </div>
        </div>
    ):(<div>
        <p>Loading...</p>
    </div>);
}

export default Contri;