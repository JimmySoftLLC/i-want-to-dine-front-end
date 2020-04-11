export const menuItemsTableName = 'menuItems';
export const restaurantsTableName = 'restaurants';
export const associatesTableName = 'associates';
export const menuDaysTableName = 'menuDays';
export const lambdaFunctionURL = 'https://kd7snpev85.execute-api.us-east-1.amazonaws.com/default/i_want_to_dine_api';
export const apiName = 'i_want_to_dine_restaurant_api';
export const apiNameNoToken = 'i_want_to_dine_api';
export const apiPath = '/';
export const projectionExpressionRestaurant = 'id,restaurantName,approved,city,street,zipCode,menuItemIdsJSON,associatesJSON,menuDayIdsJSON,stateUS,urlLink,description,phoneNumber';
export const projectionExpressionMenuItem = 'title,description,categoryJSON,price,id,restaurant';
export const projectionExpressionMenuDay = 'id,title,dateFrom,dateTo,description,menuIdsJSON,associatesJSON';
export const projectionExpressionAssociates = 'id,firstName,lastName,bio,jobTitle,email,restaurantIdsJSON';
export const noSelectedRestaurant = 'Select Your Restaurant';
export const blankPlaceHolder = String.fromCharCode(30);



