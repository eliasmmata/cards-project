import React from 'react'
import PaginationComponent from './Components/Pagination/Pagination';

// ESTOS ESTILOS TIENEN QUE ESTAR LO ULTIMO
import Posts from './Components/Posts';
import './index.scss';
import './scss/App.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <PaginationComponent />
        <Posts/>
      </header>
    </div>
  );
}

export default App;
