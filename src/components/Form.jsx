import { React, useState} from 'react';
import '../App.css';
import FetchCSVData from './FetchCSVData';

const Form = () => {
    const [temperature, setTemperature] = useState('');
    const [syrup, setSyrup] = useState('');
    const [milk, setMilk] = useState('');
    const [blended, setBlended] = useState('');
    const [csvData, setCsvData] = useState([]);

    return (
        <>
            <FetchCSVData onQuery={setCsvData}/>
            {csvData.length === 0 ? 'Loading...' : csvData.length + ' rows loaded'}
        </>
    )
}

export default Form;