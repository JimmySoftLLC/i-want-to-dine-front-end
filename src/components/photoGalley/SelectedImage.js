import React, { useState, useEffect, useContext } from "react";
import Link from '@material-ui/core/Link';
import getRestaurantById from '../../model/restaurant/getRestaurantById'
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import getMenuItemsForRestaurant from '../../model/menuItem/getMenuItemsForRestaurant';
import getEntertainmentItemsForRestaurant from '../../model/entertainmentItem/getEntertainmentItemsForRestaurant';
import getAssociatesForRestaurant from '../../model/associate/getAssociatesForRestaurant';

const SelectedImage = ({
    index,
    photo,
    margin,
    direction,
    top,
    left,
    selected,
}) => {

    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const {
        setRestaurantDetail,
        setMyState,
        menuItems,
        associates,
        menuDays,
        entertainmentItems,
        restaurants,
    } = dataAndMethodsContext;

    const imgStyle = {
        transition: "transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s"
    };
    const selectedImgStyle = {
        transform: "translateZ(0px) scale3d(0.9, 0.9, 1)",
        transition: "transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s"
    };

    const cont = {
        backgroundColor: "#eee",
        cursor: "pointer",
        overflow: "hidden",
        position: "relative"
    };

    const [isSelected, setIsSelected] = useState(selected);
    //calculate x,y scale
    const sx = (100 - (30 / photo.width) * 100) / 100;
    const sy = (100 - (30 / photo.height) * 100) / 100;
    selectedImgStyle.transform = `translateZ(0px) scale3d(${sx}, ${sy}, 1)`;

    if (direction === "column") {
        cont.position = "absolute";
        cont.left = left;
        cont.top = top;
    }

    const handleOnClick = e => {
        setIsSelected(!isSelected);
    };

    useEffect(() => {
        setIsSelected(selected);
    }, [selected]);

    let myRestaurant = getRestaurantById(restaurants, photo.restaurantid)
    let myRestaurantName = ""
    if (myRestaurant) {
        myRestaurantName = myRestaurant.restaurantName
    }

    const restaurantClick = () => {
        if (myRestaurant) {
            myRestaurant.menuItems = getMenuItemsForRestaurant(myRestaurant, menuItems)
            myRestaurant.entertainmentItems = getEntertainmentItemsForRestaurant(myRestaurant, entertainmentItems)
            myRestaurant.associates = getAssociatesForRestaurant(myRestaurant, associates)
            myRestaurant.menuDays = menuDays;
            setRestaurantDetail(myRestaurant);
            setMyState('restaurantDetail')
        }
    }

    return (
        <div
            style={{ margin, height: photo.height, width: photo.width, ...cont }}
            className={!isSelected ? "not-selected" : ""}
        >
            {isSelected && <p
                style={{ marginLeft: "1rem", marginTop: "1rem", marginRight: "1rem", marginBottom: ".5rem" }}
            >
                {photo.caption}
            </p>}
            {isSelected && <Link
                onClick={() => restaurantClick()}
                style={{ marginLeft: "1rem", marginTop: "5rem", marginRight: "1rem", marginBottom: ".5rem" }}
            >{myRestaurantName}</Link>}
            <img
                alt={photo.title}
                style={
                    isSelected ? { ...imgStyle, ...selectedImgStyle } : { ...imgStyle }
                }
                {...photo}
                onClick={handleOnClick}
            />
            <style>{`.not-selected:hover{outline:2px solid #06befa}`}</style>
        </div>
    );
};

export default SelectedImage;
