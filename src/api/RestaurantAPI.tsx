import { useQuery } from "@tanstack/react-query";
import { RestaurantSearchResponse } from "@/types";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchRestaurants = (city? : string) => {
  
  const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
     const response = await fetch(`${API_BASE_URL}/api/restaurant/search/${city}`);

     if(!response.ok) {
        throw new Error("Failed to fetch restaurant");
     }
     return response.json();
  };

  const {data: results,
         isPending: isLoading} = useQuery({
            queryKey: ["searchRestaurants"],
            queryFn: createSearchRequest,
            enabled: !!city 
           });
 
     return {results, isLoading}        
}



