import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

function useUpdateSetting() {
    const queryClient = useQueryClient();
    const {mutate: settingUpdate, isLoading: isUpdating, error} = useMutation({
        mutationFn: (newSetting) => updateSetting(newSetting),
        onSuccess: () => {
            toast.success('Setting updated');
            queryClient.invalidateQueries(['settings'])
        }
    })
    return {settingUpdate, isUpdating}
}

export default useUpdateSetting
