import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField, FormItem, FormControl } from "./ui/form";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect } from "react";


const formSchema = z.object({
  searchQuery: z.string({
    required_error: "Restaurant name is required"
  })
});

export type SearchForm = z.infer<typeof formSchema>;

type Props = {
 onSubmit: (formData: SearchForm) => void;
 placeholder: string;
 onReset?: () => void; 
 searchQuery: string;
}

const SearchBar = ({onSubmit, onReset, placeholder, searchQuery}: Props) => {
  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        searchQuery,
    }
  });

  useEffect(() => {
    form.reset({ searchQuery })
  }, [form, searchQuery]);

  const handleReset = () => {
    form.reset({
        searchQuery: ""
    });

    if( onReset ) {
      onReset();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} 
            className={`flex w-[70%] ml-auto mr-auto border-gray-200 border-[3px] p-2 
                      items-center rounded-full justify-between 
                      ${form.formState.errors.searchQuery && "border-red-500"}`}>
         <Search strokeWidth={2.5} size={30}
                 className="ml-1 text-orange-500 hidden md:block"/>
         <FormField control={form.control} name="searchQuery"
                    render={({field}) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input {...field} className="border-none shadow-none text-xl 
                                                         w-[80%] focus-visible:ring-0"
                                              placeholder={placeholder}/>
                          </FormControl>
                        </FormItem>
          )}/>
        <Button type="button" 
                variant="outline"
                className="rouned-full mr-8"
                onClick={handleReset}>Reset
        </Button>
        <Button className="rounded-full bg-orange-500 text-white">Search</Button>           
      </form>
    </Form>
  )
};

export default SearchBar;