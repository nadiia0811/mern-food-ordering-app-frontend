import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

type Props = {
 removeMenuItem: () => void;
 index: number;
}

const MenuItemInput = ({ removeMenuItem, index } : Props) => {
    const { control } = useFormContext();

    return (
      <div className="flex flex-col md:flex-row md:items-end 
                      gap-2 border-2 border-gray-200 rounded-md">
        <FormField control={control}
                   name={`menuItems.${index}.name`}
                   render={({field}) => (
                     <FormItem className="md:w-[50%]">
                        <FormLabel className="flex items-center gap-1 text-base md:text-lg">
                          Name <FormMessage className="ml-5"/>
                        </FormLabel>
                        <FormControl>
                          <Input {...field} className="p-2 text-base"
                                 placeholder="Cheese Pizza"/>
                        </FormControl>
                     </FormItem>
        )}/>

        <FormField control={control}
                   name={`menuItems.${index}.price`}
                   render={({field}) => (
                     <FormItem>
                        <FormLabel className="flex items-center gap-1 text-base md:text-lg">
                          Price ($)<FormMessage className="ml-5"/>
                        </FormLabel>
                        <FormControl>
                          <Input {...field} className="p-2 text-base"
                                 placeholder="35.00"/>
                        </FormControl>
                     </FormItem>
        )}/>

        <Button className="bg-red-500 text-bold text-white 
                          text-lg w-[130px] md:text-lg text-base"
                onClick={removeMenuItem}>
          Remove
        </Button>  
      </div>
    )
};

export default MenuItemInput;