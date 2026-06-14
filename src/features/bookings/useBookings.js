import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();

    //Filter
    const filterValue = searchParams.get("status");
    const filter = !filterValue || filterValue === "all" ? null : {field: "status", value: filterValue};

    //Sort
    const sortByRow = searchParams.get("sortBy") || 'startDate-desc';
    const [sortedField, direction] = sortByRow.split("-");
    const sortBy = sortByRow ? {field: sortedField, direction: direction} : null;

    // pagination
    const page = !searchParams.get("page")
    ? 1
    : parseInt(searchParams.get("page"));

    // Query
    const { data:   {bookings, count} = {}, isLoading, error } = useQuery({
        queryKey: ["bookings" , filter, sortBy, page],
        queryFn: () =>  getBookings({filter, sortBy , page}),
    });

    // PER-FETCHING
    // When the user is on page 1, we want to pre-fetch page 2, so that when they click on page 2, the data is already loaded.
    // We can do this by using the useQueryClient hook from react-query, and calling the prefetchQuery method.
    // We pass the same query key as the current query, but with the page number incremented by 1.
    // This will fetch the data for page 2 in the background, and store it in the cache. So when the user clicks on page 2, the data is already available, and the UI will be snappy.
    const pageCount = Math.ceil(count / PAGE_SIZE);
    if(page < pageCount){
    queryClient.prefetchQuery({
        queryKey: ["bookings" , filter, sortBy, page + 1],
        queryFn: () =>  getBookings({filter, sortBy , page: page + 1}),
    })
    }


    return { bookings, count, isLoading, error };
}