import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

function TablePage() {
    const [data, setData] = useState([])
    const [isLoaded, setIsLoaded] = useState(false);
    const [rows, setRows] = useState([])
    const [col, setCol] = useState([])
    useEffect(() => {
        setData(JSON.parse( localStorage.getItem('tableData')))
        setIsLoaded(true)
        // fetch("https://jsonplaceholder.typicode.com/todos/1")
            // .then(res => res.json())
            // .then(
            //     (result) => {
            //         setIsLoaded(true);
            //         localStorage.setItem('tableData', JSON.stringify(result))
            //         setData(result);
            //     },
            //     (error) => {
            //         setIsLoaded(true);
            //         setData('error');
            //     }
            // )
    }, [])


    const getColumns = () => {
        let temp = []
        for (const [key, value] of Object.entries(data[0])) {
            temp.push(key.toLocaleUpperCase())
        }
        return temp
    }

    const buildColumns = () => {
        return getColumns()
            .map(column =>
                <th>
                    {column}
                </th>
            )
    }

    const buildSingleRow = (row) => {
        let temp = []
        for (const [key, value] of Object.entries(row)) {
            temp.push(<td>
                {value}
            </td>);
        }
        return temp
    }

    const buildRows = () => {
        let temp = []
        data.forEach((row = {}, index) => {
            temp.push(<tr>
                {buildSingleRow(row)}
            </tr>)
        })
        return temp
    }

    const buildTable = () => {
        return <table>
            <tr>
                {buildColumns()}
            </tr>
            {buildRows()}
        </table>
    }

    return (
        <div>
            <h3>Review your purchases</h3>
            <div>
                {!isLoaded && <p>...Loading</p>}
                {isLoaded && buildTable()}
            </div>
            <Link to={'selection'}>
                <button>Done!</button>
            </Link>
        </div>
    );
}


export default TablePage;