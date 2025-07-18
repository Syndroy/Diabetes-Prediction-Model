import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [pregnancies, setPregnancies] = useState('');
  const [glucose, setGlucose] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [skinThickness, setSkinThickness] = useState('');
  const [insulin, setInsulin] = useState('');
  const [bmi, setBmi] = useState('');
  const [dpf, setDpf] = useState('');
  const [age, setAge] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = [
      Number(pregnancies),
      Number(glucose),
      Number(bloodPressure),
      Number(skinThickness),
      Number(insulin),
      Number(bmi),
      Number(dpf),
      Number(age),
    ];

    try {
      const res = await axios.post('https://diabetes-prediction-model-e88u.onrender.com/predict', { input: data });
      setResult(res.data.prediction);
    } catch (err) {
      console.error(err);
      setResult('Error connecting to server');
    }
  };

  return (
    <div className="App">
      <div className="form-container">
        <h2>Diabetes Prediction</h2>
        <form onSubmit={handleSubmit}>
          <input type="number" placeholder="Pregnancies" value={pregnancies} onChange={(e) => setPregnancies(e.target.value)} required />
          <input type="number" placeholder="Glucose" value={glucose} onChange={(e) => setGlucose(e.target.value)} required />
          <input type="number" placeholder="Blood Pressure" value={bloodPressure} onChange={(e) => setBloodPressure(e.target.value)} required />
          <input type="number" placeholder="Skin Thickness" value={skinThickness} onChange={(e) => setSkinThickness(e.target.value)} required />
          <input type="number" placeholder="Insulin" value={insulin} onChange={(e) => setInsulin(e.target.value)} required />
          <input type="number" placeholder="BMI" value={bmi} onChange={(e) => setBmi(e.target.value)} required />
          <input type="number" step="any" placeholder="Diabetes Pedigree Function" value={dpf} onChange={(e) => setDpf(e.target.value)} required />
          <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required />
          <button type="submit">Predict</button>
        </form>
        {result && <div className="result">Result: {result}</div>}
      </div>
    </div>
  );
}

export default App;
