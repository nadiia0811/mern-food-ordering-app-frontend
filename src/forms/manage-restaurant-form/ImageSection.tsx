import { FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

const ImageSection = () => {
  const { control } = useFormContext();
  return (
   <div className="space-y-3">
    <div>
      <h2 className="md:text-3xl text-2xl font-bold">Image</h2>    
      <FormDescription className="md:text-xl text-base">
        Add image that will be displayed on your restaurant listing in 
        the search results. Adding a new image will overwrite the existing one
      </FormDescription>
    </div>
    <div className="flex flex-col w-[50%] gap-8">
      <FormField control={control}
                 name="imageFile"
                 render={({field}) => (
                  <FormItem>
                    <FormControl>
                      <Input type="file" accept=".png, .jpg, .jpeg"
                             onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)}
                             className="w-[260px] cursor-pointer" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                 )}/>

    </div>
   </div>
  )
};

export default ImageSection;