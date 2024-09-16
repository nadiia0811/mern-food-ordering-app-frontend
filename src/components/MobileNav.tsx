import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from './ui/sheet';
import { CircleUserRound, Menu } from "lucide-react";
import { useAuth0 } from '@auth0/auth0-react';
import MobileNavLinks from './MobileNavLinks';

  

const MobileNav = () => {
 const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  return ( 
    
      <Sheet>
      <SheetTrigger>
          <Menu className="text-orange-500 "/>
      </SheetTrigger>
      <SheetContent className="space-y-3">
        <SheetTitle>
          { isAuthenticated ? 
           <span className="flex gap-5 items-center text-base text-bold">
             <CircleUserRound className="text-orange-500"/>
             <div>
              {user?.name}
             </div>
           </span>  : (
            <span>Welcome to MernEats.com!</span>
          )}       
        </SheetTitle>
        <Separator/>
        <SheetDescription className="flex">
          {isAuthenticated ? <MobileNavLinks/> : 
           <Button className="flex-1 font-bold bg-orange-500"
                   onClick={async () => await loginWithRedirect()}>
              Log In
           </Button>
           }         
        </SheetDescription> 
      </SheetContent>
      </Sheet> 
  ) 
}

export default MobileNav;