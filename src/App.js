import React from 'react';
import './App.css';
import DataAndMethodsState from './context/dataAndMethods/dataAndMethodsState';
import Home from './pages/Home';

const App = () => {
  return (
    <DataAndMethodsState>
      <div className='App'>
        <Home />
      </div>
    </DataAndMethodsState>
  );
}

export default App;
