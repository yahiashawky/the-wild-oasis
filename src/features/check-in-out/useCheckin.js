import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin(){
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const {mutate : checkin, isLoading : isCheckedin} = useMutation({
        mutationFn:({bookingId , breakfast}) => updateBooking(bookingId, {status: "checked-in" , isPaid: true, ...breakfast}),
        onSuccess: (data) => { // data is the updated booking that was returned from the updateBooking function
            toast.success(`Booking #${data.id} checked in successfully`);
            // queryClient.invalidateQueries({queryKey: ['booking']})  // this will refetch the booking data from the server, but we can also just update the cache with the new data

            // queryClient.setQueryData(['booking', data.id], data) // this will update the cache with the new data, so that the booking data is updated in the UI without refetching from the server

            queryClient.invalidateQueries({active: true}) // this will refetch all active queries, so that the booking data is updated in the UI without refetching from the server

            navigate("/")
        },
        onError: (error) => {
            console.error(error);
            toast.error(`Booking could not be checked in`);
        }
    })

    return {checkin , isCheckedin}
}