import React, {useEffect, useState} from 'react';

function Contri() {
    const [contriData, setContriData] = useState([])
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('shares'))
        setContriData(data)
        setIsLoaded(true)
    }, [])

    const buildUserShare = (user) => {
        return <div className={'personBlock'}>
            <div>
                <h4>{user.name}</h4>
                {user.items.length ? <h6>Items bought</h6>:''}
                <div>
                    {user.items.map(item => <li>{item}</li>)}
                </div>
            </div>
            <p className={'sharePrice'}>Total share - <span>${user.share}</span></p>
        </div>
    }

    return isLoaded ? (
        <div className={'contriPage'}>
            <h3>Individual Contributions</h3>
            <div className={'contriItem'}>
                {contriData.map(user => buildUserShare(user))}
            </div>
        </div>
    ) : (<div>
        <p>Loading...</p>
    </div>);
}

export default Contri;