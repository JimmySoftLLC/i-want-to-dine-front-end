import React, { useContext } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';

const EntertainmentItemCardMenuDay = ({ entertainmentItem }) => {
    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const { menuDayDialogData, setMenuDayDialogData
    } = dataAndMethodsContext;

    let entertainmentItemSelected = false;
    for (let j = 0; j < menuDayDialogData.entertainmentItemIdsJSON.length; j++) {
        if (entertainmentItem.id === menuDayDialogData.entertainmentItemIdsJSON[j]) {
            entertainmentItemSelected = true;
            break;
        }
    }

    const changeEntertainmentItemSelected = () => {
        let myNewMenuDayDialogData = JSON.parse(JSON.stringify(menuDayDialogData))
        let myIndex = myNewMenuDayDialogData.entertainmentItemIdsJSON.indexOf(entertainmentItem.id, 0)
        if (myIndex !== -1) {
            myNewMenuDayDialogData.entertainmentItemIdsJSON.splice(myIndex, 1)
        } else {
            myNewMenuDayDialogData.entertainmentItemIdsJSON.push(entertainmentItem.id)
        }
        setMenuDayDialogData(myNewMenuDayDialogData)
    }

    const items = []
    for (let i = 0; i < entertainmentItem.categoryJSON.length; i++) {
        switch (entertainmentItem.categoryJSON[i]) {
            case 'theater':
                items.push(<i className='fas fa-theater-masks' key={entertainmentItem.id + "_theater"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'music':
                items.push(<i className='fas fa-music' key={entertainmentItem.id + "_music"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'karaokes':
                items.push(<i className='fas fa-microphone' key={entertainmentItem.id + "_karaokes"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'dancing':
                items.push(<i className='icon-dancing' key={entertainmentItem.id + "_dancing"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'comedy':
                items.push(<i className='fas fa-laugh' key={entertainmentItem.id + "_comedy"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            default:
        }
    }

    return (
        <div className='card'>
            <h4>
                <Checkbox
                    checked={entertainmentItemSelected}
                    onChange={changeEntertainmentItemSelected}
                    name="checked"
                    color="primary"
                />
                {' - '}{items}{entertainmentItem.title}
            </h4>
        </div>
    );
};

export default EntertainmentItemCardMenuDay;