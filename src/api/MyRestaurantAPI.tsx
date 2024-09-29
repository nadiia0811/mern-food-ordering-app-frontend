import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Restaurant } from "@/types";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();
    
    const createMyRestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant> => {
        const  accessToken  = await getAccessTokenSilently();
        
        const response =  await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: restaurantFormData
        });

         if( !response.ok ) {
            console.log(response)
            const errorResponse = await response.json();
            throw new Error(`Failed to create restaurant: ${errorResponse}`);
         } 

        return response.json();
    };

    const { mutate: createRestaurant,
            isPending: isLoading,
            isSuccess,
            error } = useMutation({mutationFn: createMyRestaurantRequest});
    if(isSuccess) {
        toast.success("Restaurant created successfully")
    }
    if(error) {
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
}


