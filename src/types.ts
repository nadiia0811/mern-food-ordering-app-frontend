//getCurrentUser response type
export type User = {
  _id: string;
  email: string;
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

export type MenuItem = {
  _id: string;
  name: string;
  price: number;
}

//createRestaurant response type
export type Restaurant = {
  _id: string;
  user: string;
  restaurantName: string;
  city: string;
  country: string;
  menuItems: MenuItem[];
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[];
  imageUrl: string;
  lastUpdated: string;
}


export type RestaurantSearchResponse = {
 data: Restaurant[];
 pagination: {
  totalRestaurants: number,
  pages: number,
  page: number
 }
}