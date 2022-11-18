import React, {useEffect, useRef, useState} from 'react';
import {Table} from "../table/table";
import {Link} from "react-router-dom";

function Selection(props) {
    const [tableData, setTableData] = useState([])
    const [personsList, setPersonsList] = useState([])
    const [currentIndividual, setCurrentIndividual] = useState(null)
    const [tempData, setTempData] = useState({})
    const [items, setItems] = useState([])

    const getTotalBillAmount = () => {
        let total = 0
        tableData.forEach(item => {
            total = total + parseInt(item['value'], 10)
        })
        return total
    }

    const getAllItems = () => {
        let items = []
        tableData.forEach(item => {
            items.push(item)
        })
        return items
    }

    const getColumns = () => {
        let temp = []
        for (const [key, value] of Object.entries(tableData[0])) {
            temp.push(key.toLocaleUpperCase())
        }
        currentIndividual && temp.push('is in?')
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
        currentIndividual && temp.push(<input onChange={onCheckboxChange} id={row.name} name={row.name}
                                              data_total_value={row.value} checked={true} type="checkbox"/>)
        return temp
    }

    const buildRows = () => {
        let temp = []
        tableData.forEach((row = {}, index) => {
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

    const createFinalSelectionData = () => {
        let temp = {
            totalPeopleInvolved: personsList,
            totalBillAmount: getTotalBillAmount(),
            data: []
        }
        tableData.forEach(row => {
            let tempItemData = {
                people_involved: personsList,
                itemName: row.name,
                price: row['unitprice'],
            }
            temp.data.push(tempItemData)
        })
        console.log(temp);
        fetch('https://e771-2601-1c0-5280-e430-91ba-e420-325e-316e.ngrok.io/clicknsplit/api/split-bill', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(temp)
        }).then((data) => data.json()).then(data => {
            console.log(data);
        })
    }

    const onIndividualChange = (e) => {
        setCurrentIndividual(e.target.value)
    }

    const onCheckboxChange = e => {
        let data = tempData
        const {name, checked} = e.target
        const totalValue = e.target.getAttribute("data_total_value")
        if (data.name) {
            console.log('old');
            if (!checked) {
                //remove
            } else {
                //add
                data.name.people_involved = data.name.people_involved.push(currentIndividual)
            }
        } else {
            console.log('new');
            data[name] = {
                people_involved: [currentIndividual],
                price: totalValue,
            }
        }
        setTempData(data)
    }

    const calculateCheckBoxValue = (item, person) => {
        console.log(item);
        console.log(tempData);
        // console.log(item, person,tempData?.item?.people_involved.includes(person));
        return tempData?.item?.people_involved.includes(person)
    }

    useEffect(() => {
        setTableData(JSON.parse(localStorage.getItem('tableData')))
        setPersonsList(JSON.parse(localStorage.getItem('personNames')))
    }, [])


    return (
        <div>
            <p>Select the person from the dropdown and select tick mark in front of item if person has bought that
                item</p>
            <div>
                <select onChange={onIndividualChange} value={null}>
                    <option value=""></option>
                    {personsList.map(person => {
                        return <option value={person}>{person}</option>
                    })}
                </select>
            </div>
            {tableData.length && buildTable()}
            {/*<Link to={'contri'}>*/}
            <button onClick={createFinalSelectionData}>
                Done
            </button>
            {/*</Link>*/}
        </div>
    );
}

export default Selection;