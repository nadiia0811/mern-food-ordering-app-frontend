import { Link } from "react-router-dom";

type Props = {
  total: number;
  city: string;
};

const SearchResultInfo = ({total, city}: Props) => {
  return (
    <div className="flex flex-col font-bold text-xl gap-3 justify-between
                    lg:items-center lg:flex-row">
      <span>{total} Restaurants found in {city}
         <Link to="/" className="text-base font-semibold underline 
                              cursor-pointer text-blue-500 ml-[25px]">
            Change Location
         </Link>
      </span>
      insert sort dropdown here
      
    </div>
  )
}



export default SearchResultInfo;