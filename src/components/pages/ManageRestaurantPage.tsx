import { useCreateMyRestaurant, useUpdateMyRestaurant, useGetMyRestaurant} from "@/api/MyRestaurantAPI";
import ManageRestaurantForm from "../../forms/manage-restaurant-form/ManageRestaurantForm";


const ManageRestaurantPage = () => {
   const  { createRestaurant, isLoading: isCreateLoading } = useCreateMyRestaurant();
   const { restaurant } = useGetMyRestaurant(); 
   const { updateRestaurant, isLoading: isUpdateLoading } = useUpdateMyRestaurant();

   const isEditing = !!restaurant;
     
  return (
    <ManageRestaurantForm isLoading={isCreateLoading || isUpdateLoading} 
                          restaurant={restaurant}
                          onSave={isEditing ? updateRestaurant : createRestaurant}/>
  )
}

export default ManageRestaurantPage;