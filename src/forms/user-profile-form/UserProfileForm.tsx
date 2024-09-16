import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { User } from "@/types";
import { useEffect } from "react";


const formSchema = z.object({
    email: z.string().optional(),
    name: z.string().min(1,"name is required"),
    addressLine1: z.string().min(1,"addressLine1 is required"),
    city: z.string().min(1,"city is required"),
    country: z.string().min(1,"country is required"),   
});

type UserFormSchema = z.infer<typeof formSchema>;

type Props = {
  onSave: (userProfileData: UserFormSchema) => void;
  isLoading: boolean;
  currentUser: User;
}

const UserProfileForm = ({onSave, isLoading, currentUser} : Props) => {
    const form = useForm<UserFormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: currentUser
    });

    useEffect(() => {
      form.reset(currentUser);
    }, [currentUser, form]);
  return (
    <Form {...form}>
       <form onSubmit={form.handleSubmit(onSave)}
             className="space-y-4 bg-gray-50 rounded-lg md:px-30 p-10 flex flex-col">
          <div>
             <h2 className="text-2xl md:text-4xl font-bold">User Profile Form</h2>
             <FormDescription className="md:text-lg text-base font-semibold">
               View and change your profile information here
             </FormDescription>          
          </div>

          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem>
              <FormLabel className="md:text-xl font-bold text-base">Email</FormLabel>
              <FormControl>
                <Input {...field} disabled className="bg-white md:w-[700px] p-2 md:p-5"/>
              </FormControl>
            </FormItem>
          )}/>

          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem>
              <FormLabel className="md:text-xl font-bold text-base">Name</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white bg-white md:w-[700px] p-2 md:p-5 md:text-xl"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}/>

          <div className="flex flex-col gap-4">
            <FormField control={form.control} name="addressLine1" render={({ field }) => (
              <FormItem>
                <FormLabel className="md:text-xl font-bold text-base">Address Line 1</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white bg-white md:w-[700px] p-2 md:p-5 md:text-xl"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}/>

            <FormField control={form.control} name="city" render={({ field }) => (
              <FormItem>
                <FormLabel className="md:text-xl font-bold text-base">City</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white bg-white md:w-[700px] p-2 md:p-5 md:text-xl"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}/>

            <FormField control={form.control} name="country" render={({ field }) => (
              <FormItem>
                <FormLabel className="md:text-xl font-bold text-base">Country</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white bg-white md:w-[700px] p-2 md:p-5 md:text-xl"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}/>
          </div>

          {isLoading ? ( <div className="w-[150px] h-[36px]"><LoadingButton /></div>  ) : 
                       ( <Button type="submit"
                                 className="bg-orange-500 text-white 
                                            font-bold md:text-lg md:w-[150px] 
                                            w-[85px] text-base">
                           Submit
                       </Button>)
          }
       </form>
    </Form>
  )
}


export default UserProfileForm;
