import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { Restaurant } from "@/types";


const formSchema = z.object({
  restaurantName: z.string({required_error: "restaurant name is required"})
                  .min(3),
  city: z.string({required_error: "city name is required"}),
  country: z.string({required_error: "country is required"}),
  deliveryPrice: z.coerce.number({
    required_error: "delivery price is required",
    invalid_type_error: "must be a valid number"
  }),
  estimatedDeliveryTime: z.coerce.number({
    required_error: "delivery time is required",
    invalid_type_error: "must be a valid number"
  }),
  cuisines: z.array(z.string()).nonempty({
    message: "please select at least one item"
  }),
  menuItems: z.array(z.object({
    name: z.string().min(3, "name is required"),
    price: z.coerce.number().min(1, "price is required")
  })),
  imageFile: z.instanceof(File, {
    message: "image is required"
  })
});

type RestaurantFormData = z.infer<typeof formSchema>;
 
type Props = {
    onSave: (restaurantFormData: FormData) => void;
    isLoading: boolean;
    restaurant?: Restaurant
};

const ManageRestaurantForm = ({onSave, isLoading, restaurant} : Props) => {

  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{name: "", price: 0}]
    }
  });

  useEffect(() => { 
    if(!restaurant) {
      return;
    }
    const deliveryPriceFormatted = parseInt((restaurant.deliveryPrice/100).toFixed(2)); 
    const menuItemsFormatted = restaurant?.menuItems.map((item) => (
     { ...item,
       price: parseInt((item.price/100).toFixed(2))
     }
    ));
 
    const updatedRestaurant = {
     ...restaurant,
     menuItems: menuItemsFormatted,
     deliveryPrice: deliveryPriceFormatted
    };

    form.reset(updatedRestaurant);   
   },[form, restaurant]);


  const onSubmit = (formDataJson: RestaurantFormData) => {
    const formData = new FormData();
    formData.append("restaurantName", formDataJson.restaurantName);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);

   /* Monetary values are handled in cents to avoid precision issues with floating point numbers.
      Many APIs, databases, and payment systems expect prices in the smallest unit of currency 
      (e.g., cents for dollars).
      This ensures accuracy in calculations and storage. */
    formData.append("deliveryPrice", (formDataJson.deliveryPrice * 100).toString());
    formData.append("estimatedDeliveryTime", formDataJson.estimatedDeliveryTime.toString());
    
    formDataJson.cuisines.forEach((cuisine, index) => {
       formData.append(`cuisines[${index}]`, cuisine);
    });

    formDataJson.menuItems.forEach((menuItem, index) => {
      formData.append(`menuItems[${index}][name]`, menuItem.name);
      formData.append(`menuItems[${index}][price]`, (menuItem.price *100).toString());
    });

    formData.append("imageFile", formDataJson.imageFile);

    onSave(formData);
  };

 
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 bg-gray-50 p-10 rounded-lg">
        <DetailsSection />
        <Separator />
        <CuisinesSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />
        {isLoading ? <LoadingButton /> : 
                     <Button type="submit"
                             className="md:text-lg text-base w-[130px]"
                             >
                        Submit
                     </Button>}
      </form>
    </Form>
  )
}

export default ManageRestaurantForm;
