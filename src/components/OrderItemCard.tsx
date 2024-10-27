import { useUpdateMyRestaurantOrder } from "@/api/MyRestaurantAPI";
import { ORDER_STATUS } from "../config/order-status-config";
import { Order, OrderStatus } from "../types";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";
import { useState, useEffect } from "react";


type Props = {
    order: Order;
}

const OrderItemCard = ({ order }: Props) => {

    const [status, setStatus]  = useState<OrderStatus>(order.status);

    const { updateOrderStatus, isLoading } = useUpdateMyRestaurantOrder();

    const handleStatusChange = async (newStatus: OrderStatus) => {
       await updateOrderStatus({orderId: order._id as string, status: newStatus});
       setStatus(newStatus);
    }

    const getTime = () => {
        const orderDateTime = new Date(order.createdAt);
        const hours = orderDateTime.getHours();
        const minutes = orderDateTime.getMinutes();
        const paddedMinutes = (minutes < 10)? `0${minutes}` : minutes;
        return `${hours} : ${paddedMinutes}`;
    };

    useEffect(() => {
       setStatus(order.status);
    }, [order.status])

    return <Card>
             <CardHeader>
                <CardTitle className="grid md:grid-cols-4 gap-5 justify-between mb-3">
                    <div className="font-bold md:text-[18px] text-gray-800">Customer Name:
                        <span className="ml-2 font-normal">{order.user.name}</span>
                    </div>
                    <div className="font-bold md:text-[18px] text-gray-800">Delivery Address:
                        <span className="ml-2 font-normal">
                            {order.deliveryDetails.addressLine1},
                        </span>
                        <span className="ml-2 font-normal">
                            {order.deliveryDetails.city}
                        </span>
                    </div>
                    <div className="font-bold md:text-[18px] text-gray-800">Time:
                        <span className="ml-2 font-normal">
                            {getTime()}
                        </span>                      
                    </div>
                    <div className="font-bold md:text-[18px] text-gray-800">Total Cost:
                        <span className="ml-2 font-normal">
                            {(order.totalAmount/100).toFixed(2)}$
                        </span>                      
                    </div>
                </CardTitle>
                <Separator />
             </CardHeader>
             <CardContent className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                   {order.cartItems.map((cartItem) => (
                      <span>
                        <Badge variant="outline" className="ml-2 mr-4">{cartItem.quantity}</Badge>
                        {cartItem.name}
                      </span>                      
                   ))}
                </div>
                <div className="flex flex-col space-y-1.5">
                   <Label htmlFor="status" className="text-lg font-semibold">What is the status of this order?</Label>
                   <Select onValueChange = {(value) => handleStatusChange(value as OrderStatus)}
                           disabled={isLoading}
                           value={status}>
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Status"/>
                      </SelectTrigger>
                      <SelectContent position="popper">
                        {ORDER_STATUS.map((status) =>(<SelectItem value={status.value}
                                                                  className="text-lg">{status.label}
                                                      </SelectItem>))}
                      </SelectContent>
                   </Select>
                </div>
             </CardContent> 
           </Card>
};

export default OrderItemCard;