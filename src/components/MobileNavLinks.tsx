import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";

const MobileNavLinks = () => {
    const { logout } = useAuth0();
  return (
    <div className="flex flex-col gap-4">
      <Link className="font-bold bg-white flex items-center
                       hover:text-orange-500"
                       to="/order-status">
        Order Status             
      </Link>
      <Link className="font-bold bg-white flex items-center
                       hover:text-orange-500"
                       to="/user-profile">
        User Profile             
      </Link>
      <Link className="font-bold bg-white flex items-center
                       hover:text-orange-500"
                       to="/manage-restaurant">
        Manage Restaurant             
      </Link>
      <Button className="flex items-center font-bold w-[200px]"
              onClick={() => logout()}>
        Log Out
      </Button>
    </div>
  )
}

export default MobileNavLinks;