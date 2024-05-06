import { React, useState} from 'react';
import './App.css';

const Form = () => {
    const [temperature, setTemperature] = useState('');
    const [syrup, setSyrup] = useState('');
    const [milk, setMilk] = useState('');
    const [blended, setBlended] = useState('');

    const tempOptions = ['hot', 'lukewarm', 'cold'];
    const syrupOptions = ['vanilla', 'caramel', 'hazelnut', 'mocha', 
        'peppermint', 'raspberry', 'toffee nut', 'other'];
    const milkOptions = ['whole', '2%', 'non-fat', 'almond', 'soy', 'oat', 'other'];
    const blendedOptions = ['yes', 'turbo', 'no'];

    return (
        <>
        </>
    )
}

export default Form;