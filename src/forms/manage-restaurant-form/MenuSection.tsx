import { Button } from "@/components/ui/button";
import { FormDescription, FormField, FormItem } from "@/components/ui/form";
import { useFieldArray, useFormContext } from "react-hook-form";
import MenuItemInput from "./MenuItemInput";

const MenuSection = () => {
 const { control } = useFormContext();
 const { fields, append, remove } = useFieldArray({
    control,
    name: "menuItems",
 });

  return (
   <div className="space-y-8">
     <div>
        <h2 className="md:text-3xl text-2xl font-bold">Menu</h2>
        <FormDescription className="md:text-xl text-base">
            Create your menu and give each item a name and a price
        </FormDescription>
     </div>

     <FormField control={control}
                name="menuItems"
                render={() => (
                    <FormItem className="flex flex-col gap-2">
                      {fields.map((_, index) => (
                        <MenuItemInput index={index}
                                       removeMenuItem={() => remove(index)}
                                       key={index}/>
                      ))}
                    </FormItem>
                )}
     />
     <Button type="button" 
             onClick={() => append({name: "", price: ""})}>Add Menu Item</Button>
   </div>
  )
};

export default MenuSection;