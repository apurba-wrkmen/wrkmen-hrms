import { punchDetailsApi, punchInApi, punchOutApi } from "@/services/Punch.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const usePunchDetails = (id, date) => {
    const queryClient = useQueryClient()
    // console.log(id, date)
    const { data: punchDet, isPending } = useQuery({
        queryKey: ["punchDetailsApi"],

        // queryKey: ["punchDetailsApi", id, date],
        queryFn: () => punchDetailsApi(id, date),
        // enabled:  Boolean(id) && Boolean(date), 
    })

    // console.log(punchDet)
    return { punchDet, isPending }
}

export function usePunchIn() {
    const queryClient = useQueryClient()
    const { mutate: punch, isPending } = useMutation({
        mutationFn: (data) => punchInApi(data),

        onSuccess: (res) => {
            toast.success("punched in");
            // console.log(res);
            queryClient.invalidateQueries({ queryKey: ["punchDetailsApi"] })
            // enabled: !!user?.id, // 
            // Optionally navigate after success
        },
        onError: (err) => console.log(err)
    })

    return { punch, isPending }
}
export function usePunchOut() {
    const queryClient = useQueryClient()
    const { mutate: punchoutTWO, isPending } = useMutation({
        mutationFn: (data) => punchOutApi(data),

        onSuccess: (res) => {
            toast.success("punched out");
            console.log(res);
            queryClient.invalidateQueries({ queryKey: ["punchDetailsApi"] })

            // Optionally navigate after success
        },
        onError: (err) => console.log(err)
    })

    return { punchoutTWO, isPending }
}