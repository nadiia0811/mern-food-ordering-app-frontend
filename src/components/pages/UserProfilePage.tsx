import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";
import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserAPI";

const UserProfilePage = () => {
  const {updateUser, isPending: isUpdateLoading} = useUpdateMyUser();
  const {currentUser, isPending: isGetLoading} = useGetMyUser();

  if(isGetLoading) {
    return <span>Loading...</span>
  }
  if(!currentUser) {
    return <span>Unable to load user profile</span>
  }
  return (
    <UserProfileForm onSave={updateUser} 
                     isLoading={isUpdateLoading}
                     currentUser={currentUser}/>
  )
}

export default UserProfilePage;