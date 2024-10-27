import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Restaurant } from "@/types";
import { Order } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type OrderStatusRequest = {
  orderId: string;
  status: string;
}

 export const useCreateMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();  
   
     const createMyRestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant>  => {
        const  accessToken  = await getAccessTokenSilently();
        const response =  await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: restaurantFormData           
        });

        if( !response.ok ) {
            const errorResponse = await response.json();
            throw new Error(`Failed to create restaurant: ${errorResponse}`);
        } 
       
        return await response.json();          
    }; 

    const { mutate: createRestaurant,
            isPending: isLoading,
            isSuccess,
            error } = useMutation({mutationFn: createMyRestaurantRequest}); 
          

    if(isSuccess) {
        toast.success("Restaurant created successfully")
    }else if(error) {
        toast.error("Failed create restaurant");
    }         

    return { createRestaurant, isLoading }           
}; 


export const useGetMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();

    const getMyRestaurantRequest = async (): Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        });

        if(!response.ok) {
            throw new Error("Failed to get restaurant");
        }
        return response.json();
    }

    const {data: restaurant, isPending: isLoading, error} = useQuery({
        queryKey: ["fetchCurrentRestaurant"],
        queryFn: getMyRestaurantRequest
    });

    if(error) {
        toast.error(error.toString());
    }

    return {restaurant, isLoading};
};


export const useUpdateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateRestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      body: restaurantFormData
    });

    if(!response.ok) {
      throw new Error("Failed to update restaurant");
    }

    return response.json();
  };

  const {
    mutate: updateRestaurant,
    isPending: isLoading,
    isSuccess,
    error
  } = useMutation({mutationFn: updateRestaurantRequest});

  if(isSuccess) {
    toast.success("Restaurant updated!");
  }

  if(error) {
    toast.error("Failed to update restaurant");
  }

  return { updateRestaurant, isLoading };
};

export const useGetMyRestaurantOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyRestaurantOrderRequest = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant/order`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    });

    if( !response.ok ) {
      throw new Error("Failed to fetch orders");
    }

    return response.json();
  };

  const { data: orders, isPending: isLoading } = useQuery({
    queryKey: ["fetchMyRestaurantOrders"],
    queryFn: getMyRestaurantOrderRequest
  });

  return { orders, isLoading };
};

export const useUpdateMyRestaurantOrder = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyRestaurantOrder = async (updateOrderStatusRequest: OrderStatusRequest) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant/order/${updateOrderStatusRequest.orderId}/status`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({status: updateOrderStatusRequest.status})
    });

    if (!response.ok) {
      throw new Error("Failed to update status");
    }

    return response.json();
  };
 
  const { mutateAsync: updateOrderStatus,
          isPending: isLoading, 
          isError, 
          isSuccess,
          reset } = useMutation({
    mutationFn: updateMyRestaurantOrder
  });

  if( isError ) {
    toast.error("Unable to update order status");
    reset();
  }

  if( isSuccess ){
    toast.success("Order status updated");
  }

  return { updateOrderStatus, isLoading }

 
}




