import { useSearchRestaurants } from "@/api/RestaurantAPI";
import { useParams } from "react-router-dom";
import SearchResultInfo from "../SearchResultInfo";
import SearchResultCard from "../SearchResulCard";
import { useState } from "react";
import SearchBar, { SearchForm } from "../SearchBar";

export type SearchState = {
  searchQuery: string;
}

const SearchPage = () => {
    const { city } = useParams();
    const [searchState, setSearchState] = useState<SearchState>({
      searchQuery: ""
    });
    const { results, isLoading } = useSearchRestaurants(searchState, city);
    const  total = results?.pagination.totalRestaurants || 0;
    

    if( isLoading ) {
     return <span className="text-bold text-xl">Loading...</span>
    }

    if(!results?.data || !city) {
        return <span>No results found</span>;
    }

    const setSearchQuery = (searchFormData: SearchForm) => {
      setSearchState((prevState) => ({
        ...prevState,
        searchQuery: searchFormData.searchQuery
      }));
    };

    const resetSearch = () => {
      setSearchState((prevState) => ({
        ...prevState,
        searchQuery: ""
      }));
    }
    
  return (
   <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
     <div id="cuisines-list">

     </div>
     <div id="main-content" 
          className="flex flex-col gap-5">
        <SearchBar searchQuery={searchState.searchQuery}
                   onSubmit={setSearchQuery} 
                   placeholder="Search by cuisine or restaurant name"
                   onReset={resetSearch}/>    
        <SearchResultInfo total={total} city={city}/>
        {results.data.map((item, index) => (<SearchResultCard key={index} restaurant={item}/>))}
     </div>
   </div>
  )
}

export default SearchPage;