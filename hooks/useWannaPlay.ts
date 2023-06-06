import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useWannaPlay = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/wannaplays", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return { data, error, isLoading, mutate };
};

export default useWannaPlay;