import React from 'react';
import './App.css';
import DataAndMethodsState from './context/dataAndMethods/dataAndMethodsState';
import AlertDialogState from './context/alertDialog/AlertDialogState';
import DeleteConfirmDialogState from './context/deleteConfirmDialog/deleteConfirmDialogState';
import Home from './pages/Home';

const App = () => {
  return (
    <DeleteConfirmDialogState>
      <AlertDialogState>
        <DataAndMethodsState>
          <div className='App'>
            <Home />
          </div>
        </DataAndMethodsState>
      </AlertDialogState>
    </DeleteConfirmDialogState>
  );
}

export default App;
