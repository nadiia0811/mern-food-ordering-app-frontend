import { Restaurant } from "@/types";
import { CartItem } from "./pages/RestaurantDetailPage";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Trash } from "lucide-react";


type Props = {
    restaurant: Restaurant;
    cartItems: CartItem[];
    removeFromCart: (cartItem: CartItem) => void;
}

const OrderSummary = ({ restaurant, cartItems, removeFromCart } : Props) => {
    const deliveryPrice = Number(restaurant.deliveryPrice);


       const getTotalCost = () => {
        const totalPrice = cartItems.reduce((total, cartItem) => {
          const itemPrice = Number(cartItem.price);
          return (itemPrice/100 * cartItem.quantity) + total;
        }, 0);
      
        const totalWithDelivery = (totalPrice + deliveryPrice/100).toFixed(2);     
        return totalWithDelivery; 
      };
      

  return (
  <>
    <CardHeader>
      <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
        <span>Your Order</span>
        <span>${getTotalCost()}</span>
      </CardTitle>
    </CardHeader>
    <CardContent className="flex flex-col gap-5 text-lg text-black">
       {cartItems.map((item) => (
          <div className="flex justify-between">
            <span>
                <Badge variant="outline" className="mr-2">
                 {item.quantity}
                </Badge>
                {item.name}
            </span>
            <span className="flex items-center gap-5"> 
                ${((item.price * item.quantity) / 100).toFixed(2)}
                <Trash className="cursor-pointer" 
                       color="red" size={22}
                       onClick={() => removeFromCart(item)}/>
            </span>

          </div>
       ))}
       <Separator />
       <div className="flex justify-between">
         <span>Delivery</span>
         <span>${(deliveryPrice/100).toFixed(2)}</span>
       </div>
       <Separator />
    </CardContent>
  </>
  )
};

export default OrderSummary;