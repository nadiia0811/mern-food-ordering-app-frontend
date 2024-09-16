import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, UseMutationResult, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import User from "@/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CreateUserRequest = {
    auth0Id: string;
    email: string;
}

//creating user api
export const useCreateMyUser = (): UseMutationResult<void, Error, CreateUserRequest> => {
    const { getAccessTokenSilently } = useAuth0();

    const createMyUserRequest = async (user: CreateUserRequest): Promise<void> => {
       const accessToken = await getAccessTokenSilently();
       const response = await fetch(`${API_BASE_URL}/api/my/user`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
       });

       if (!response.ok) {
         throw new Error("Failed to create user");
       }
    };

      const { mutateAsync: createUser, 
              isPending, 
              isError, 
              isSuccess } = useMutation<void, Error, CreateUserRequest>({mutationFn: createMyUserRequest});  

     return {
        createUser,
        isPending,
        isError,
        isSuccess
    }   
};


//updating user api
type UpdateMyUserRequest = {
    name: string;
    addressLine1: string;
    city: string;
    country: string 
}

export const useUpdateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0(); 

  const updateMyUserRequest = async (formData : UpdateMyUserRequest) => {
    const accessToken = await getAccessTokenSilently();

    const res = await fetch(`${API_BASE_URL}/api/my/user`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    });

    if(!res.ok) {
       throw new Error("Failed to update user");
    }
    return res.json();
  };

  const { mutateAsync: updateUser,
         isPending,
         isSuccess, 
         error,
         reset} = useMutation({mutationFn: updateMyUserRequest});

    if(isSuccess) {
        toast.success("User profile updated!");
    }

    if(error) {
        toast.error(error.toString());
        reset(); 
    }

  return {updateUser, isPending};
};


//get current user api
export const useGetMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getMyUserRequest = async (): Promise<User> => {
  const accessToken = await getAccessTokenSilently();

  const response = await fetch(`${API_BASE_URL}/api/my/user`, {
    method: "GET",
    headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
    },   
  });

  if(!response.ok) {
    throw new Error("Failed get user info");
  }

  return response.json();
  };

  const { data: currentUser, isPending, error} = useQuery({
        queryKey: ["fetchCurrentUser"], 
        queryFn: getMyUserRequest});
  if(error) {
    toast.error(error.toString());
  }

  return { currentUser, isPending };
}



