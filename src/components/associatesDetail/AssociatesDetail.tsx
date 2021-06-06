import React, { useContext } from 'react';
import AssociatesDetailCard from './AssociatesDetailCard';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import CircularIndeterminate from '../circularIndeterminate/CircularIndeterminate';

const AssociatesDetail = () => {
    const dataAndMethodsContext: any = useContext(DataAndMethodsContext);
    const {
        loading,
        associates
    } = dataAndMethodsContext;

    if (loading) {
        return <CircularIndeterminate />;
    } else {
        return (
            <div className='grid-4'>
                {(associates.map((associate: { id: React.Key | null | undefined; }) => <AssociatesDetailCard associate={associate}
                    key={associate.id}
                />))}
            </div>
        );
    }
};

export default AssociatesDetail;