import { FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import  { cuisineList } from "../../config/restaurant-options-config";
import CuisineCheckbox from "./CuisineCheckbox";


const CuisinesSection = () => {
  const { control, formState: {errors} } = useFormContext();
  
  return (
    <div className="space-y-2">
      <div>
        <h2 className="md:text-3xl text-2xl font-bold">Cuisines</h2>
        <FormDescription className="md:text-xl text-base">
          Select the cuisines that your restaurant serves
        </FormDescription>
      </div>
      <FormField control={control}
                 name="cuisines" 
                 rules={{ required: "You must select at least one cuisine" }}
                 render={({ field }) => (
                    <FormItem>
                      <div className="grid md:grid-cols-5 gap-1">
                        {cuisineList.map((cuisineItem, index) => <CuisineCheckbox cuisine={cuisineItem}
                                                                                  field={field}
                                                                                  key={index}/>)}
                      </div>
                      {errors.cuisines && (
                     <FormMessage className="text-lg">
                       {errors.cuisines?.message ? String(errors.cuisines.message) : null}
                     </FormMessage>
                  )}
                    </FormItem>
      )} />     
    </div>
  )
}

export default CuisinesSection;
