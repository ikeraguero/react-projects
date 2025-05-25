import { useMutation, useQueryClient } from "@tanstack/react-query"
import { duplicateCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useDuplicateCabin() {
    const queryClient = useQueryClient();
    const {mutate: duplicate} = useMutation({
        mutationFn: (data) => {
            const duplicatedData = {
                name: data.name,
                max_capacity: data.maxCapacity,
                regular_price: data.regularPrice,
                description: data.description,
                discount: data.discount,
                image: data.image
              }
            return duplicateCabin(duplicatedData)
        },
        onSuccess: () => {
            toast.success('Cabin successfully duplicated');
            queryClient.invalidateQueries(['cabin'])
        }

    });
    return {duplicate}
}

export default useDuplicateCabin
