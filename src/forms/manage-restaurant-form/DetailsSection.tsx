import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";


const DetailsSection = () => {
    const { control } = useFormContext();
  return (
   <div className="md:space-y-5 space-y-3">
      <div>
         <h2 className="md:text-3xl text-2xl font-bold">Details</h2>
         <FormDescription className="md:text-xl text-base">
           Enter the details about your restaurant
         </FormDescription>
      </div>
      <FormField control={control}
                 name="restaurantName"
                 render={({field}) => (
                    <FormItem>
                      <FormLabel className="md:text-2xl text-base">Name</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-white md:p-5 p-3 md:text-lg text-base"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
        )}/>

      <div className="flex gap-4 md:gap-8">
        <FormField  control={control}
                    name="city"
                    render={({field}) => (
                        <FormItem className="flex-1">
                          <FormLabel className="md:text-2xl text-base">City</FormLabel>
                          <FormControl>
                            <Input {...field} className="bg-white md:p-5 p-3 md:text-lg text-base"/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
            )}/>

        <FormField control={control}
                   name="country"
                   render={({field}) => (
                    <FormItem className="flex-1">
                      <FormLabel className="md:text-2xl text-base">Country</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-white md:p-5 p-3 md:text-lg text-base"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
        )}/>
      </div>
      <FormField control={control}
                   name="deliveryPrice"
                   render={({field}) => (
                    <FormItem className="md:max-w-[25%]">
                      <FormLabel className="mr-2 md:text-2xl text-base">Delivery Price ($)</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-white md:p-5 p-3 md:text-lg text-base" placeholder="5.00"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
        )}/>

       <FormField control={control}
                  name="estimatedDeliveryTime"
                  render={({field}) => (
                    <FormItem className="md:max-w-[25%]">
                      <FormLabel className="mr-2 md:text-2xl text-base">Estimated Delivery Time (minutes)</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-white md:p-5 p-3 md:text-lg text-base" placeholder="30"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
        )}/>
   </div>
  )
}

export default DetailsSection;