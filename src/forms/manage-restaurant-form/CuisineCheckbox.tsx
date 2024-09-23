import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type Props = {
  cuisine: string;
  field: ControllerRenderProps<FieldValues, "cuisines">
};

const CuisineCheckbox = ({cuisine, field}: Props) => {
  const checkHandler = (checked: boolean) => {
    if(checked) {
      field.onChange([...field.value, cuisine])
    } else {
      field.onChange(field.value.filter((item: string) => item!== cuisine))
    }
  }
  return (
    <FormItem className="flex flex-row items-center space-x-1
                         space-y-0 mt-2">
                          
      <FormControl>
        <Checkbox className="bg-white w-[20px] h-[20px]" 
                  checked={field.value.includes(cuisine)} 
                  onCheckedChange={checkHandler}/>       
      </FormControl>
      <FormLabel className="md:text-lg text-base">{cuisine}</FormLabel>  
    </FormItem>
  )
}

export default CuisineCheckbox;