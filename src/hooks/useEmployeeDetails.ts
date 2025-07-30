
import { fetchEmployee } from "@/services/fetchEmployee.api";
import { useQuery } from "@tanstack/react-query";

export const useEmployeeDetails = (id) => {
    // console.log("Fetching employee with email:", id);
    const { data: employee, isPending, isError, } = useQuery({
        queryKey: ["employee", id],
        queryFn: () => fetchEmployee(id),
        // enabled: !!id,
    });
    if (isError) {
        console.error("Failed to fetch employee:");
    }

    return { isPending, employee };
};
