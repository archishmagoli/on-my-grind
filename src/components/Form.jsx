import { React, useState, useEffect } from 'react';
import '../App.css';
import FetchCSVData from './FetchCSVData';

const Form = () => {
    const [temperature, setTemperature] = useState('');
    const [syrup, setSyrup] = useState('');
    const [milk, setMilk] = useState('');
    const [blended, setBlended] = useState('');
    const [csvData, setCsvData] = useState([]);

    const [syrups, setSyrups] = useState(new Set());
    const [milks, setMilks] = useState(new Set());
    const [temperatures, setTemperatures] = useState(new Set());
    const [blendeds, setBlendeds] = useState(new Set()); // use state variables to make sure the updates persist

    const aggregateData = (data) => {
        const syrupList = new Set();
        const milkList = new Set();
        const temperatureList = new Set();
        const blendedList = new Set();

        if (data.length !== 0) {
            data.map((row) => {  
                syrupList.add(row['Syrup']);
                milkList.add(row['Milk']);
                temperatureList.add(row['Temperature']);
                blendedList.add(row['Blended']);
            });

            setSyrups(syrupList);
            setMilks(milkList);
            setTemperatures(temperatureList);
            setBlendeds(blendedList);
        }
    }

    useEffect(() => {
        aggregateData(csvData);
    }, [csvData, syrups, milks, temperatures, blendeds]);



    return (
        <>
            <FetchCSVData onQuery={setCsvData}/>
            {/* {csvData.length === 0 ? 'Loading...' : csvData.map((row) => {
                return (
                    <div key={row['Drink']}>
                        <h1>{row['Drink']}</h1>
                        <p>{row['Temperature']}</p>
                        <p>{row['Syrup']}</p>
                        <p>{row['Milk']}</p>
                        <p>{row['Blended']}</p>
                    </div>
                )
            })} */}


            <div className='masterForm'>
                <div className='ingredient'>
                    <h2>Syrups</h2>
                    {syrups.length === 0 ? 'Loading' : [...syrups].map((syrup) => {
                        return (
                            <p key={syrup}>{syrup}</p>
                        )
                    })}
                </div>

                <div className='ingredient'>
                    <h2>Milks</h2>
                    {milks.length === 0 ? 'Loading' : [...milks].map((milk) => {
                        return (
                            <p key={milk}>{milk}</p>
                        )
                    })}
                </div>

                <div className='ingredient'>
                    <h2>Temperatures</h2>
                    {temperatures.length === 0 ? 'Loading' : [...temperatures].map((temperature) => {
                        return (
                            <p key={temperature}>{temperature}</p>
                        )
                    })}
                </div>

                <div className='ingredient'>
                    <h2>Blended</h2>
                    {blendeds.length === 0 ? 'Loading' : [...blendeds].map((blended) => {
                        return (
                            <p key={blended}>{blended}</p>
                        )
                    })}
                </div>
            </div>
            
            
        </>
    )
}

export default Form;