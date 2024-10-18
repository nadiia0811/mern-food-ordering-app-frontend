import { useQuery } from "@tanstack/react-query";
import { Restaurant, RestaurantSearchResponse } from "@/types";
import { SearchState } from "@/components/pages/SearchPage";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetRestaurant = (restaurantId?: string) => {
  const getRestaurantById = async(): Promise <Restaurant> => {
    const response = await fetch(`${API_BASE_URL}/api/restaurant/${restaurantId}`); 
    
    if( !response.ok ) {
      throw new Error("Failed to get restaurant");
    }
     return response.json();
  };

  const {data: restaurant,
        isPending: isLoading} = useQuery({
         queryKey: ["fetchRestaurant"],
         queryFn: getRestaurantById,
         enabled: !!restaurantId
        });
   return { restaurant, isLoading };    

}

export const useSearchRestaurants = (searchState: SearchState, city? : string) => {
  const params = new URLSearchParams();
  params.set("searchQuery", searchState.searchQuery);
  params.set("page", searchState.page.toString());
  params.set("selectedCuisines", searchState.selectedCuisines.join(","));
  params.set("sortOption", searchState.sortOption);
  
  const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
     const response = await fetch(`${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`);

     if(!response.ok) {
        throw new Error("Failed to fetch restaurant");
     }
     return response.json();
  };

  const {data: results,
         isPending: isLoading} = useQuery({
            queryKey: ["searchRestaurants", searchState],
            queryFn: createSearchRequest,
            enabled: !!city 
           });
 
     return {results, isLoading}        
}



