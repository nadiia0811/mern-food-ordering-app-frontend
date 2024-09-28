import { useCreateMyRestaurant } from "@/api/MyRestaurantAPI";
import ManageRestaurantForm from "../../forms/manage-restaurant-form/ManageRestaurantForm";
import { useGetMyRestaurant } from "@/api/MyRestaurantAPI";

const ManageRestaurantPage = () => {
   const  { isLoading, createRestaurant } = useCreateMyRestaurant();
   const { restaurant } = useGetMyRestaurant(); 
     
  return (
    <ManageRestaurantForm isLoading={isLoading} 
                          restaurant={restaurant}
                          onSave={createRestaurant}/>
  )
}

export default ManageRestaurantPage;