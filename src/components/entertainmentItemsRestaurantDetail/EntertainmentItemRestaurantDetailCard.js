import React from 'react';

const EntertainmentItemRestaurantDetailCard = ({ entertainmentItem }) => {
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
            <h3>{items}{entertainmentItem.title}
            </h3>
            <p>{entertainmentItem.description}</p>
        </div>
    );
};

export default EntertainmentItemRestaurantDetailCard;
