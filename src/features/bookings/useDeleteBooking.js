import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking } from "../../services/apiBookings";

export function useDeleteBooking(){
    const queryClient = useQueryClient()
    const {mutate: deleteBookingRow , isLoading: isDeletingBooking} = useMutation({
        mutationFn: deleteBooking,
        onSuccess: (_,id) => {
            toast.success(`booking #${id}  deleted successfully`)
            queryClient.invalidateQueries({active: true})
        },
        onError: (error) => {
            toast.error(error.message)
            console.log(error)
        }
    })

    return {deleteBookingRow , isDeletingBooking}
}