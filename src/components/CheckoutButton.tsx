import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import UserProfileForm, { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { useGetMyUser } from "@/api/MyUserAPI";



type Props = {
  onCheckout: (userFormData: UserFormData) => void;
  disabled: boolean;
}

const CheckoutButton = ({ onCheckout, disabled }: Props) => {
    
    const { isAuthenticated, 
            isLoading: isAuthLoading,
            loginWithRedirect } = useAuth0();
    const { pathname } = useLocation(); 
    const { currentUser , isPending: isGetUserLoading } = useGetMyUser();
    
    const onLogin = async () => {
        await loginWithRedirect({
          appState: {
            returnTo: pathname
          }
        });
    };

    
    if(!isAuthenticated || !currentUser) {
        return <Button className="bg-orange-500 flex-1"
                       onClick={onLogin}>
                 Log in to check out
               </Button>
    }

    if(isAuthLoading) {
        return <LoadingButton />
    }

    return (
      <Dialog>
        <DialogTrigger asChild>
           <Button className="bg-orange-500 flex-1" disabled={disabled}>
             Go To Checkout
           </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[425px] md:min-w-[760px] bg-gray-50">
          <UserProfileForm currentUser={currentUser}
                           onSave={onCheckout}
                           isLoading={isGetUserLoading}
                           title="Confirm Delivery Details"
                           buttonText="Continue to payment"/>
        </DialogContent>
      </Dialog>
    )
};

export default CheckoutButton;