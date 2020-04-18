import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const CircularIndeterminate = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
        </div>
    );
}

export default CircularIndeterminate;