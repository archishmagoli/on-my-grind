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


    const [syrupColor, setSyrupColor] = useState('#B87333');
    const [milkColor, setMilkColor] = useState('#B87333');
    const [temperatureColor, setTemperatureColor] = useState('#B87333');
    const [blendedColor, setBlendedColor] = useState('#B87333');

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

            <form className='masterForm'>
                <div className='ingredients'>
                    <div className='ingredient'>
                        <h2>Syrups</h2>
                        <h3 id='syrup' style={{backgroundColor: syrupColor}}>{syrup}</h3>
                        <input className='guessInput' type='text' placeholder='Guess the ingredient...' value={syrup} onChange={(e) => setSyrup(e.target.value)} />
                        {syrups.length === 0 ? 'Loading' : [...syrups].map((syrup) => {
                            return (
                                <p className='entry' key={syrup}>{syrup}</p>
                            )
                        })}
                    </div>

                    <div className='ingredient'>
                        <h2>Milks</h2>
                        <h3 id='milk' style={{backgroundColor: milkColor}}>{milk}</h3>
                        <input className='guessInput' type='text' placeholder='Guess the ingredient...' value={milk} onChange={(e) => setMilk(e.target.value)} />
                        {milks.length === 0 ? 'Loading' : [...milks].map((milk) => {
                            return (
                                <p className='entry' key={milk}>{milk}</p>
                            )
                        })}
                    </div>

                    <div className='ingredient'>
                        <h2>Temperatures</h2>
                        <h3 id='temperature' style={{backgroundColor: temperatureColor}}>{temperature}</h3>
                        <input className='guessInput' type='text' placeholder='Guess the ingredient...' value={temperature} onChange={(e) => setTemperature(e.target.value)} />
                        {temperatures.length === 0 ? 'Loading' : [...temperatures].map((temperature) => {
                            return (
                                <p className='entry' key={temperature}>{temperature}</p>
                            )
                        })}
                    </div>

                    <div className='ingredient'>
                        <h2>Blended</h2>
                        <h3 id='blended' style={{backgroundColor: blendedColor}}>{blended}</h3>
                        <input className='guessInput' type='text' placeholder='Guess the ingredient...' value={blended} onChange={(e) => setBlended(e.target.value)} />
                        {blendeds.length === 0 ? 'Loading' : [...blendeds].map((blended) => {
                            return (
                                <p className='entry' key={blended}>{blended}</p>
                            )
                        })}
                    </div>
                </div>
                

                <button className='submit' type='submit'>Submit</button>
            </form>
            
            
        </>
    )
}

export default Form;