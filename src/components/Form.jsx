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

    const [drink, setDrink] = useState(null);

    const aggregateData = (data) => {
        const syrupList = new Set();
        const milkList = new Set();
        const temperatureList = new Set();
        const blendedList = new Set();

        if (data.length !== 0) {
            data.map((row) => {  
                syrupList.add(row['Syrup'].toLowerCase());
                milkList.add(row['Milk'].toLowerCase());
                temperatureList.add(row['Temperature'].toLowerCase());
                blendedList.add(row['Blended'].toLowerCase());
            });

            setSyrups(syrupList);
            setMilks(milkList);
            setTemperatures(temperatureList);
            setBlendeds(blendedList);
        }
    }

    useEffect(() => {
        aggregateData(csvData);
        changeDrink();
        
    }, [csvData]);

    const changeDrink = () => {
        if (csvData.length != 0) {
            let randomIndex = Math.floor(Math.random() * csvData.length);
        
            while (drink !== null && drink === csvData[randomIndex].Drink) {
                randomIndex = Math.floor(Math.random() * csvData.length);
            }

            setDrink(csvData[randomIndex]);
            setSyrup('');
            setMilk('');
            setTemperature('');
            setBlended('');

            setSyrupColor('#B87333');
            setMilkColor('#B87333');
            setTemperatureColor('#B87333');
            setBlendedColor('#B87333');
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!syrups.has(syrup.toLowerCase())) {
            alert('The value you entered for syrup is not in the list. Please try again.');
        }

        if (!temperatures.has(temperature.toLowerCase())) {
            alert('The value you entered for temperature is not in the list. Please try again.');
        }

        if (!milks.has(milk.toLowerCase())) {
            alert('The value you entered for milk is not in the list. Please try again.');
        }

        if (!blendeds.has(blended.toLowerCase())) {
            alert('The value you entered for blended is not in the list. Please try again.');
        }

        if (syrup.toLowerCase() === drink.Syrup.toLowerCase()) {
            setSyrupColor('#AB47BC');
        } else {
            setSyrupColor('#DC4C64');
        }

        if (milk.toLowerCase() === drink.Milk.toLowerCase()) {
            setMilkColor('#AB47BC');
        } else {
            setMilkColor('#DC4C64');
        }

        if (temperature.toLowerCase() === drink.Temperature.toLowerCase()) {
            setTemperatureColor('#AB47BC');
        } else {
            setTemperatureColor('#DC4C64');
        }

        if (blended.toLowerCase() === drink.Blended.toLowerCase()) {
            setBlendedColor('#AB47BC');
        } else {
            setBlendedColor('#DC4C64');
        }
    }

    return (
        <>
            <FetchCSVData onQuery={setCsvData}/>
            <h3>Hi, I'd like to order a(n)...</h3>
            <div className='drink'>
                <h2 id='drinkName'>{csvData.length !== 0 && drink !== null ? drink.Drink : null}</h2>
                <button onClick={changeDrink}>🔄</button>
            </div>
            
            <form className='masterForm' onSubmit={handleSubmit}>
                <div className='ingredients'>
                    <div className='ingredient'>
                        <h2>Syrup</h2>
                        <h3 id='syrup' style={{backgroundColor: syrupColor}}>{syrup}</h3>
                        <input className='guessInput' type='text' placeholder='Guess the ingredient...' value={syrup} onChange={(e) => setSyrup(e.target.value)} />
                        {syrups.length === 0 ? 'Loading' : [...syrups].map((syrup) => {
                            return (
                                <p className='entry' key={syrup}>{syrup}</p>
                            )
                        })}
                    </div>

                    <div className='ingredient'>
                        <h2>Milk</h2>
                        <h3 id='milk' style={{backgroundColor: milkColor}}>{milk}</h3>
                        <input className='guessInput' type='text' placeholder='Guess the ingredient...' value={milk} onChange={(e) => setMilk(e.target.value)} />
                        {milks.length === 0 ? 'Loading' : [...milks].map((milk) => {
                            return (
                                <p className='entry' key={milk}>{milk}</p>
                            )
                        })}
                    </div>

                    <div className='ingredient'>
                        <h2>Temperature</h2>
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
                <br></br>
                <button className='submit' type='submit'>Check Answer</button>
            </form>
        </>
    )
}

export default Form;