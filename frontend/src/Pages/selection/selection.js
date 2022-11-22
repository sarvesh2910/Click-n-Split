import React, {useEffect, useState} from 'react';

function Selection(props) {
    const [tableData, setTableData] = useState([])
    const [personsList, setPersonsList] = useState([])
    const [currentIndividual, setCurrentIndividual] = useState(null)
    const [selectionData, setSelectionData] = useState({})

    const getTotalBillAmount = () => {
        let total = 0
        tableData.forEach(item => {
            total = total + parseInt(item['value'], 10)
        })
        return total
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
        currentIndividual &&
        temp.push(<td>
                <input
                    onChange={onCheckboxChange}
                    id={`${row.name}${currentIndividual}`} name={row.name}
                    data_total_value={row.value}
                    checked={!!selectionData?.[`${row.name}`]?.people_involved.includes(currentIndividual)}
                    type="checkbox"/>
            </td>
        )
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
            <tbody>
            {buildRows()}

            </tbody>
        </table>
    }

    const createFinalSelectionData = () => {
        let temp = {
            totalPeopleInvolved: personsList,
            totalBillAmount: getTotalBillAmount(),
            data: []
        }

        for (const [itemName, itemSelectionData] of Object.entries(selectionData)) {
            temp.data.push({
                itemName,
                'people_involved': itemSelectionData['people_involved'],
                'price': itemSelectionData['price'],
                'people_count': itemSelectionData['people_involved'].length
            })

        }

        console.log(temp);
        // fetch('https://e771-2601-1c0-5280-e430-91ba-e420-325e-316e.ngrok.io/clicknsplit/api/split-bill', {
        //     method: 'POST',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify(temp)
        // }).then((data) => data.json()).then(data => {
        //     console.log(data);
        // })
    }

    const onIndividualChange = (e) => {
        setCurrentIndividual(e.target.value)
    }

    const onCheckboxChange = e => {
        let data = Object.assign({}, selectionData)
        const {name, checked} = e.target
        const totalValue = e.target.getAttribute("data_total_value")
        if (data[name]) {
            console.log('old');
            if (!checked) {
                //remove
                data[name].people_involved = data[name].people_involved.filter(item => item !== currentIndividual)
            } else {
                //add
                data[name].people_involved = [...data[name].people_involved, currentIndividual]
            }
        } else {
            // console.log('new');
            data[name] = {
                people_involved: [currentIndividual],
                price: totalValue,
            }
        }
        console.log(data);
        setSelectionData(data)
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