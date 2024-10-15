import { cuisineList } from "@/config/restaurant-options-config";
import { Label } from "./ui/label";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { ChangeEvent } from "react";
import { Button } from "./ui/button";

type Props = {
  onChange: (cuisines: string[]) => void;
  selectedCuisines: string[];
  isExpanded: boolean;
  onExpandedClick: () => void;
}

const CuisinesFilter = ({onChange, selectedCuisines, isExpanded, onExpandedClick}: Props) => {
    const handleCuisinesReset = () => {
     onChange([])
    };

    const handleCuisinesChange = (event: ChangeEvent<HTMLInputElement>) => {
      const clickedCuisine = event.target.value;
      const isChecked = event.target.checked;
      const newCuisinesList = isChecked ? [...selectedCuisines, clickedCuisine] : 
                                          selectedCuisines.filter((cuisine) => cuisine !== clickedCuisine);
      onChange(newCuisinesList);                                  
    }

  return (
    <>
      <div className="flex justify-between items-center px-2">
        <div className="text-md font-semibold mb-2">Filter By Cuisine</div>
        <div className="text-sm font-semibold mb-2 underline cursor-pointer
                        text-blue-500"
             onClick={handleCuisinesReset}>
          Reset Filters
        </div>
      </div>

      <div className="flex space-y-2 flex-col">
        {cuisineList.slice(0, (isExpanded ? cuisineList.length : 7)).map((cuisine) => {
            const isSelected = selectedCuisines.includes(cuisine);
        return (
            <div className="flex">
              <input id={`cuisine_${cuisine}`}
                     type="checkbox"
                     className="hidden"
                     value={cuisine}
                     checked={isSelected}
                     onChange={handleCuisinesChange}/>
             <Label htmlFor={`cuisine_${cuisine}`}
                    className={`flex flex-1 items-center cursor-pointer text-lg rounded-full px-4 py-2 
                               text-semibold ${isSelected ? "border border-green-600 text-green-600" : 
                              "border border-slate-300"}`}>
               { isSelected && <Check size={20} strokeWidth={3}/>}
               { cuisine }
             </Label>
            </div>
        )
        })}

        <Button variant="link" className="flex-1 mt-4"
                onClick={onExpandedClick}>
          { isExpanded ? (<span className="flex items-center">View Less <ChevronUp /></span>) : 
                          (<span className="flex items-center">View More <ChevronDown /></span>)}
        </Button>

      </div>
    </>
  )
}



export default CuisinesFilter;