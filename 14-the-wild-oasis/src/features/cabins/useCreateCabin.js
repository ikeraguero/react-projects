import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin, updateCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useCreateCabin(cabin, reset) {
    const queryClient = useQueryClient();
    const isEditing = cabin.id > 0;
    const { mutate: cabinCreate, error } = useMutation({
        mutationFn: (data) => {
          if(isEditing) {
            return updateCabin(data, cabin.id);
          }
          return createCabin(data)
        },
        onSuccess: () => {
          toast.success(`Cabin ${isEditing ? "successfully edited" : "created"}`);
          queryClient.invalidateQueries({ queryKey: ["cabin"] });
          reset();
        },
        onError: (err) => {
          toast.error(err.message);
        },
      });

    return {cabinCreate, isEditing};
}

export default useCreateCabin
