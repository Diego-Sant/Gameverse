import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useDislike = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/dislikes", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return { data, error, isLoading, mutate };
};

export default useDislike;