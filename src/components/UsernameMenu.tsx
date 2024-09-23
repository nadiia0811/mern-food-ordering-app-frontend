import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import { useAuth0 } from "@auth0/auth0-react";
import { CircleUserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
  

const UsernameMenu = () => {
  const { user, logout } = useAuth0();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center px-3 font-bold hover:text-orange-500 gap-5">
        <CircleUserRound className="text-orange-500 w-[30px] h-[30px]"/>
        <div className="md:text-lg text-base"> 
          { user?.name }
         </div>     
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col items-center md:w-[200px] w-[120px]">
      <DropdownMenuItem>
          <Link to="/manage-restaurant" 
                className="font-bold hover:text-orange-500 md:text-lg text-base">Manage Restaurant
          </Link>
      </DropdownMenuItem>
      <DropdownMenuItem>
          <Link to="/user-profile" 
                className="font-bold hover:text-orange-500 md:text-lg text-base">User Profile
          </Link>
      </DropdownMenuItem>
      <Separator />
      <DropdownMenuItem>
          <Button className="flex font-bold bg-orange-400 w-[120px]
                             md:w-[170px] md:text-lg text-black hover:text-white 
                             text-base duration-300"
                             onClick={() => logout()}>
            Log Out
          </Button>
      </DropdownMenuItem>        
      </DropdownMenuContent>
    </DropdownMenu>

  )
}

export default UsernameMenu;