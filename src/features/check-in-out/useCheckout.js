import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout(){
    const queryClient = useQueryClient();

    const {mutate : checkout, isLoading : isCheckedOut} = useMutation({
        mutationFn:(bookingId) => updateBooking(bookingId, {status: "checked-out"}),
        onSuccess: (data) => { // data is the updated booking that was returned from the updateBooking function
            toast.success(`Booking #${data.id} checked out successfully`);
            // queryClient.invalidateQueries({queryKey: ['booking']})  // this will refetch the booking data from the server, but we can also just update the cache with the new data

            // queryClient.setQueryData(['booking', data.id], data) // this will update the cache with the new data, so that the booking data is updated in the UI without refetching from the server

            queryClient.invalidateQueries({active: true}) // this will refetch all active queries, so that the booking data is updated in the UI without refetching from the server

        },
        onError: (error) => {
            console.error(error);
            toast.error(`Booking could not be checked out`);
        }
    })

    return {checkout , isCheckedOut}
}