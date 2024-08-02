import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const json = JSON.parse(jsonInput);
      const res = await axios.post('https://bajaj-backenddd-7ca8fe042a55.herokuapp.com/bfhl', json);
      setResponse(res.data);
    } catch (error) {
      console.error(error);
      alert('Invalid JSON or API error');
    }
  };

  const handleSelect = (e) => {
    const options = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(options);
  };

  const renderResponse = () => {
    if (!response) return null;
    const filteredResponse = {};
    if (selectedOptions.includes('Alphabets')) filteredResponse.alphabets = response.alphabets;
    if (selectedOptions.includes('Numbers')) filteredResponse.numbers = response.numbers;
    if (selectedOptions.includes('Highest alphabet')) filteredResponse.highest_alphabet = response.highest_alphabet;
    return <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>;
  };

  return (
    <div className="App">
      <h1>{response?.roll_number || 'BFHL Challenge'}</h1>
      <form onSubmit={handleSubmit}>
        <textarea 
          value={jsonInput} 
          onChange={(e) => setJsonInput(e.target.value)} 
          rows="5" 
          cols="50" 
          placeholder='Enter JSON here'
        ></textarea>
        <br />
        <button type="submit">Submit</button>
      </form>
      <select multiple={true} onChange={handleSelect}>
        <option value="Alphabets">Alphabets</option>
        <option value="Numbers">Numbers</option>
        <option value="Highest alphabet">Highest alphabet</option>
      </select>
      {renderResponse()}
      <div className="response-section">
        <h2>Full Response:</h2>
        <pre>{JSON.stringify(response, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;
