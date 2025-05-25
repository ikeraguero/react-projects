import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useDeleteCabin() {
    const queryClient = useQueryClient();
    const { mutate: removeCabin, isLoading: isDeleting } = useMutation({
        mutationFn: (id) => deleteCabin(id),
        onSuccess: () => {
          toast.success("Cabin successfuly deleted");
          queryClient.invalidateQueries();
        },
        onError: (err) => toast.error(err.message),
      });

    return {removeCabin, isDeleting}
}

export default useDeleteCabin
