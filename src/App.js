import React from 'react';
import './App.css';
import DataAndMethodsState from './context/dataAndMethods/dataAndMethodsState';
import AlertDialogState from './context/dataAndMethods/dataAndMethodsState';
import Home from './pages/Home';

const App = () => {
  return (
    <AlertDialogState>
      <DataAndMethodsState>
        <div className='App'>
          <Home />
        </div>
      </DataAndMethodsState>
    </AlertDialogState>
  );
}

export default App;
