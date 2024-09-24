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
};

const ManageRestaurantForm = ({onSave, isLoading} : Props) => {
  const onSubmit = (formDataJson: FormData) => {

  };

  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{name: "", price: 0}]
    }
  })
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSave)}
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
                             className="md:text-lg text-base w-[130px]">Submit</Button>}
      </form>
    </Form>
  )
}

export default ManageRestaurantForm;
