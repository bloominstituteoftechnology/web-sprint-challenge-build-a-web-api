import './App.css';
import { useState, useEffect } from 'react';

function url(path) {
  return process.env.NODE_ENV === 'development'
  ? `http://localhost:6660${path}` : path
}

function App() {
  const [ data, setData ] = useState('stretch');

  useEffect(() => {
    fetch(url('/api'))
      .then(res => res.json())
      .then(apiData => setData(apiData.data))
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        We made it to {data}!
      </header>
    </div>
  );
}

export default App;
