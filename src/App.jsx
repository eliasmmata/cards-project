import React from 'react';
import Posts from './components/Posts';

// ESTOS ESTILOS TIENEN QUE ESTAR LO ULTIMO 
import './App.scss';
import './index.scss';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Posts/>
      </header>
    </div>
  );
}

export default App;
