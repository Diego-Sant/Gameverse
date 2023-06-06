import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useGame = (id?: string) => {
  const { data, error, isLoading } = useSWR(id ? `/api/gameId/${id}` : null, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return { data, error, isLoading };
};

export default useGame;