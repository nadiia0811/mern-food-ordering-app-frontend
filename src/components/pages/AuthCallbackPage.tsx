import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useCreateMyUser } from "@/api/MyUserAPI";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage = () => {
    const { user } = useAuth0();
    const  {createUser}  = useCreateMyUser();
    const navigate = useNavigate();
    const hasCreatedUser = useRef(false);

    //console.log(hasCreatedUser.current) false

    useEffect(() => {
        if(user?.sub && user?.email && !hasCreatedUser.current) {
            createUser({auth0Id: user.sub, email: user.email});
            hasCreatedUser.current = true;
            navigate("/");
           }
       // navigate("/");
    }, [createUser, user, navigate])
  return (
    <>
      Loading...
    </>
  )
}

export default AuthCallbackPage;