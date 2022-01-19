import React from 'react'

// ESTOS ESTILOS TIENEN QUE ESTAR LO ULTIMO 
import Posts from './Components/Posts';
import './index.scss';
import './scss/App.scss';

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
