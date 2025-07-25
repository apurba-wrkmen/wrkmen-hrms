import { punchInApi, punchOutApi } from "@/services/Punch.api";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function usePunchIn() {
    const { mutate: punch, isPending } = useMutation({
        mutationFn: (data) => punchInApi(data),

        onSuccess: (res) => {
            toast.success("punched in");
            console.log(res);


            // Optionally navigate after success
        },
        onError: (err) => console.log(err)
    })

    return { punch, isPending }
}
export function usePunchOut() {
    const { mutate: punchoutTWO, isPending2 } = useMutation({
        mutationFn: (data) => punchOutApi(data),

        onSuccess: (res) => {
            toast.success("punched out");
            console.log(res);


            // Optionally navigate after success
        },
        onError: (err) => console.log(err)
    })

    return { punchoutTWO, isPending2}
}