

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

export type OrderStatus =    "placed"
                           | "paid" 
                           | "inProgress" 
                           | "outForDelivery" 
                           | "delivered";


 export type Order = {
  _id: string;
  restaurant: Restaurant;
  user: User;
  deliveryDetails: {
    email: string;
    city: string;
    addressLine1: string;
  };
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  restaurantId: string;
 }
