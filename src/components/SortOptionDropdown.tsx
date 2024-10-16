import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

type Props = {
 onChange: (value: string) => void;
 sortOption: string;
}

const SortOptionDropdown = ({onChange, sortOption}: Props) => {
    const SORT_OPTIONS = [
        {
          label: "Best match",
          value: "bestMatch"
        },
        {
            label: "Delivery price",
            value: "deliveryPrice"
        },
        {
            label: "Estimated delivery time",
            value: "estimatedDeliveryTime"
        }
    ];

    const selectedSortLabel = SORT_OPTIONS.find((option) => 
        option.value === sortOption)?.label || SORT_OPTIONS[0].label;
    
    return (
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer">
            <Button className="w-full" variant="outline">
              Sort By: {selectedSortLabel}  
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {SORT_OPTIONS.map((option) => (
                <DropdownMenuItem className="cursor-pointer"
                                  onClick={() => onChange(option.value)}>
                  {option.label} 
                </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
    )

};

export default SortOptionDropdown;