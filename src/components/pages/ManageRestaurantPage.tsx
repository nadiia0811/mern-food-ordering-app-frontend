import { useCreateMyRestaurant, 
         useUpdateMyRestaurant, 
         useGetMyRestaurant, 
         useGetMyRestaurantOrders} from "../../api/MyRestaurantAPI";
import ManageRestaurantForm from "../../forms/manage-restaurant-form/ManageRestaurantForm";
import OrderItemCard from "../OrderItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";


const ManageRestaurantPage = () => {
   const { createRestaurant, isLoading: isCreateLoading } = useCreateMyRestaurant();
   const { restaurant } = useGetMyRestaurant(); 
   const { updateRestaurant, isLoading: isUpdateLoading } = useUpdateMyRestaurant();
   const { orders, isLoading: isOrdersLoading } = useGetMyRestaurantOrders();

   const isEditing = !!restaurant;
     
  return (
     <Tabs defaultValue="orders">
       <TabsList>
         <TabsTrigger value="orders">Orders</TabsTrigger>
         <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
       </TabsList>
       <TabsContent className="space-y-5 bg-gray-50 p-10 rounded-lg"
                    value="orders">
          <h2 className="text-2xl font-bold">{orders?.length} active orders</h2>
          {orders?.map((order) => (
            <OrderItemCard order={order}/>
          ))}
       </TabsContent>
       <TabsContent value="manage-restaurant">
          <ManageRestaurantForm isLoading={isCreateLoading || isUpdateLoading || isOrdersLoading} 
                                restaurant={restaurant}
                                onSave={isEditing ? updateRestaurant : createRestaurant}/> 
       </TabsContent>
     </Tabs>
    // <ManageRestaurantForm isLoading={isCreateLoading || isUpdateLoading || isOrdersLoading} 
     //                      restaurant={restaurant}
     //                      onSave={isEditing ? updateRestaurant : createRestaurant}/> 
  )
}

export default ManageRestaurantPage;