export const menuItemsTableName = 'menuItems';
export const restaurantsTableName = 'restaurants';
export const associatesTableName = 'associates';
export const lambdaFunctionURL = 'https://kd7snpev85.execute-api.us-east-1.amazonaws.com/default/i_want_to_dine_api';
export const apiName = 'i_want_to_dine_restaurant_api';
export const apiPath = '/';
export const projectionExpressionRestaurant = 'id,restaurantName,approved,city,street,zipCode,menuItemIdsJSON,associateIdsJSON,stateUS,urlLink,description,phoneNumber';
export const projectionExpressionMenuItem = 'title,description,categoryJSON,price,id,restaurant,restaurantId';