import { useGetMyOrders } from "@/api/OrderAPI";
import OrderStatusHeader from "../OrderStatusHeader";
import OrderStatusDetail from "../OrderStatusDetail";
import { AspectRatio } from "../ui/aspect-ratio";

const OrderStatusPage = () => {
    const { orders, isLoading } = useGetMyOrders();

    if(isLoading) {
        return "Loading...";
    }

    if( !orders || orders.length === 0) {
        return "No orders found";

    }

    return (
     <div className="space-y-10">
       { orders.map((order) => (
        <div className="space-y-10 bg-gray-50 p-10 rounded-lg">
            <OrderStatusHeader order={order}/>
            <div className="grid gap-10 md:grid-cols-2">
               <OrderStatusDetail order={order}/> 
               <AspectRatio ratio={16/5}>
                 <img src={order.restaurant.imageUrl} 
                      alt="Food image" 
                      className="z-[-1] h-[225px] rounded-md cover"/>
               </AspectRatio>
            </div>
        </div>
       ))}
     </div>
   )
}

export default OrderStatusPage;