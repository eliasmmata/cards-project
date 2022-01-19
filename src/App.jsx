import React from 'react';

// ESTOS ESTILOS TIENEN QUE ESTAR LO ULTIMO 
import './App.scss';
import Posts from './Components/Posts';
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
