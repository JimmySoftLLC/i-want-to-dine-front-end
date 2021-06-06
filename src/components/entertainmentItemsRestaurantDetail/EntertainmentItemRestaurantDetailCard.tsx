import React from 'react';
import dateString from '../../model/dateString';

const EntertainmentItemRestaurantDetailCard: any = ({ entertainmentItem }: any) => {
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

    // format dates for display
    let myTimeFrom = dateString(entertainmentItem.timeFrom, null, 'displayTime')
    let myTimeTo = dateString(entertainmentItem.timeTo, null, 'displayTime')

    return (
        <div className='card'>
            <h3>{items}{entertainmentItem.title}
            </h3>
            <h5>{myTimeFrom}{' to '}{myTimeTo}
            </h5>
            <p>{entertainmentItem.description}</p>
        </div>
    );
};

export default EntertainmentItemRestaurantDetailCard;
