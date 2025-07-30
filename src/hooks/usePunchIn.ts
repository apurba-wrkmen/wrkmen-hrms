import { punchDetailsApi, punchInApi, punchOutApi } from "@/services/Punch.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

// Define the expected types (or import from your types file)
type PunchData = {
  id: string;
  date: string;
};

// type PunchOutData = {
//   userId: string;
//   time: string;
// };

export const usePunchDetails = (id: string, date: string) => {
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
    mutationFn: (data: PunchData) => punchInApi(data),
    onSuccess: () => {
      toast.success("Punched in");
      queryClient.invalidateQueries({ queryKey: ["punchDetailsApi"] });
    },
    onError: (err: Error) => {
      console.error(err.message);
      toast.error("Punch-in failed");
    },
  });

  return { punch, isPending };
}



export function usePunchOut() {
  const queryClient = useQueryClient();

  const { mutate: punchoutTWO, isPending } = useMutation({
    mutationFn: (data: PunchData) => punchOutApi(data),
    onSuccess: () => {
      toast.success("Punched out");
    //   console.log(res);
      queryClient.invalidateQueries({ queryKey: ["punchDetailsApi"] });
    },
    onError: (err: Error) => {
      console.error(err.message);
      toast.error("Punch-out failed");
    },
  });

  return { punchoutTWO, isPending };
}
