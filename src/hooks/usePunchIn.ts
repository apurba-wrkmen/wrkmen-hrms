import { punchDetailsApi, punchInApi, punchOutApi } from "@/services/Punch.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const usePunchDetails = (id: string , date: string) => {
    const { data: punchDet, isPending } = useQuery({
        queryKey: ["punchDetailsApi", id, date],
        queryFn: () => punchDetailsApi(id, date),
        enabled: Boolean(id) && Boolean(date),
    });

    return { punchDet, isPending };
};

export function usePunchIn() {
    const queryClient = useQueryClient();
    const { mutate: punch, isPending } = useMutation({
        mutationFn: (data: { userId: string; time: string }) => punchInApi(data),
        onSuccess: () => {
            toast.success("punched in");
            queryClient.invalidateQueries({ queryKey: ["punchDetailsApi"] });
        },
        onError: (err: Error) => console.error(err.message),
    });

    return { punch, isPending };
}

export function usePunchOut() {
    const queryClient = useQueryClient();
    const { mutate: punchoutTWO, isPending } = useMutation({
        mutationFn: (data: { userId: string; time: string }) => punchOutApi(data),
        onSuccess: (res) => {
            toast.success("punched out");
            console.log(res);
            queryClient.invalidateQueries({ queryKey: ["punchDetailsApi"] });
        },
        onError: (err: Error) => console.error(err.message),
    });

    return { punchoutTWO, isPending };
}
