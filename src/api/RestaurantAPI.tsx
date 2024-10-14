import { useQuery } from "@tanstack/react-query";
import { RestaurantSearchResponse } from "@/types";
import { SearchState } from "@/components/pages/SearchPage";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchRestaurants = (searchState: SearchState, city? : string) => {
  const params = new URLSearchParams();
  params.set("searchQuery", searchState.searchQuery)
  
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



