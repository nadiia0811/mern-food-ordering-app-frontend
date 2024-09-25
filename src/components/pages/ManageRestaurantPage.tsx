import { useCreateMyRestaurant } from "../../api/MyRestaurantAPI";
import ManageRestaurantForm from "../../forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
   const  {isLoading, createRestaurant } = useCreateMyRestaurant()
  return (
    <ManageRestaurantForm isLoading={isLoading} onSave={createRestaurant}/>
  )
}

export default ManageRestaurantPage;