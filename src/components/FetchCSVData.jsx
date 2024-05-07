import { React, useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const FetchCSVData = ({ onQuery }) => {
    const parseCSV = (csvText) => {
        const rows = csvText.split(/\r?\n/); // Split CSV text into rows, handling '\r' characters
        const headers = rows[0].split(','); // Extract headers (assumes the first row is the header row)
        const data = []; // Initialize an array to store parsed data
        for (let i = 1; i < rows.length; i++) {
            const rowData = rows[i].split(','); // Split the row, handling '\r' characters
            const rowObject = {};
            for (let j = 0; j < headers.length; j++) {
                rowObject[headers[j]] = rowData[j];
            }
            data.push(rowObject);
        }
        return data;
    }

    const fetchData = async () => {
        const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS-zgWIKx2JtERLZoePfXfSV3sSuRCtgBmeHKg8EXadSGrghf8c40BYH_6hYdiYliZwLmV2IRvS9lUE/pub?output=csv';
        try {
            const response = await axios.get(csvUrl);
            const parsedData = parseCSV(response.data);
            onQuery(parsedData);
        } catch (error) {
            console.error('Error fetching CSV data: ', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
        </>
    )
}

export default FetchCSVData;
