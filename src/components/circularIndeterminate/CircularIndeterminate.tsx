import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const CircularIndeterminate = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '1rem' }}>
            <CircularProgress />
        </div>
    );
}

export default CircularIndeterminate;