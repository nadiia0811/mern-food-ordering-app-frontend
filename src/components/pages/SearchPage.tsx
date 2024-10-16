import { useSearchRestaurants } from "@/api/RestaurantAPI";
import { useParams } from "react-router-dom";
import SearchResultInfo from "../SearchResultInfo";
import SearchResultCard from "../SearchResulCard";
import { useState } from "react";
import SearchBar, { SearchForm } from "../SearchBar";
import PaginationSelector from "../PaginationSelector";
import CuisinesFilter from "../CuisinesFilter";
import SortOptionDropdown from "../SortOptionDropdown";

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
}

const SearchPage = () => {
    const { city } = useParams();
    const [searchState, setSearchState] = useState<SearchState>({
      searchQuery: "",
      page: 1,
      selectedCuisines: [],
      sortOption: "bestMatch"
    });
    const { results, isLoading } = useSearchRestaurants(searchState, city);
    const  total = results?.pagination.totalRestaurants || 0;

    const setSelectedCuisines = (selectedCuisines: string[]) => {
      setSearchState((prevState) => ({
        ...prevState,
        selectedCuisines,
        page: 1
      }))
    };

    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const setPage = (page: number) => {
      setSearchState((prevState) => ({
        ...prevState,
        page
      }))
    };

    const setSortOption = (sortOption: string) => {
      setSearchState((prevState) => ({
        ...prevState,
        sortOption,
        page: 1 
      }));
    }
    
    if( isLoading ) {
     return <span className="text-bold text-xl">Loading...</span>
    }

    if(!results?.data || !city) {
        return <span>No results found</span>;
    }

    const setSearchQuery = (searchFormData: SearchForm) => {
      setSearchState((prevState) => ({
        ...prevState,
        searchQuery: searchFormData.searchQuery,
        page: 1
      }));
    };

    const resetSearch = () => {
      setSearchState((prevState) => ({
        ...prevState,
        searchQuery: "",
        page: 1
      }));
    };

    const onExpandedClick = () => {
      setIsExpanded( !isExpanded )
    }
    
  return (
   <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
     <div id="cuisines-list">
       <CuisinesFilter selectedCuisines={searchState.selectedCuisines}
                       onChange={setSelectedCuisines}
                       isExpanded = {isExpanded}
                       onExpandedClick={onExpandedClick}
                       />
     </div>
     <div id="main-content" 
          className="flex flex-col gap-5">
        <SearchBar searchQuery={searchState.searchQuery}
                   onSubmit={setSearchQuery} 
                   placeholder="Search by cuisine or restaurant name"
                   onReset={resetSearch}/> 
        <div className="flex flex-col gap-3 justify-between lg:flex-row">
            <SearchResultInfo total={total} city={city}/>
            <SortOptionDropdown sortOption={searchState.sortOption}
                                onChange={(value) => setSortOption(value)}/>
        </div>              
       
        {results.data.map((item, index) => (<SearchResultCard key={index} restaurant={item}/>))}

        <PaginationSelector page={results?.pagination.page}  
                            pages={results?.pagination.pages}
                            onPageChange={setPage}/>
     </div>
   </div>
  )
}

export default SearchPage;