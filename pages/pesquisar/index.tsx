import GameGenresCard from "@/components/GameGenresCard";
import InfoModal from "@/components/InfoModal";
import Navbar from "@/components/Navbar";
import useInfoModal from "@/hooks/useInfoModal";
import {useSearchParams} from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import useSWR from "swr";

const fetchPosts = async (url: string) => {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Falha ao pesquisar, tente novamente mais tarde!")
    }

    return response.json();
}

const SearchPage = () => {
    const router = useRouter();
    const { isOpen, closeModal } = useInfoModal();

    const search = useSearchParams();
    const searchQuery = search ? search?.get('q') : null;
    const encodedSearchQuery = encodeURI(searchQuery || "");

    const [isLoading, setIsLoading] = useState(true);
    const [showNoResults, setShowNoResults] = useState(false);

    const {data} = useSWR(`/api/pesquisar?q=${encodedSearchQuery}`, fetchPosts);

    useEffect(() => {
        const loadingTimer = setTimeout(() => {
          setIsLoading(false);
        }, 1500);
    
        return () => clearTimeout(loadingTimer);
    }, [data]);

    useEffect(() => {
        if (!searchQuery) {
          router.push("/");
        }
    }, [searchQuery, router]);

    useEffect(() => {
        let noResultsTimer: NodeJS.Timeout;
    
        if (data) {
          noResultsTimer = setTimeout(() => {
            setShowNoResults(true);
          }, 2000);
        }
    
        return () => clearTimeout(noResultsTimer);
    }, [data]);

    useEffect(() => {
        const loadingTimer = setTimeout(() => {
          setIsLoading(false);
        }, 2000);
    
        return () => clearTimeout(loadingTimer);
    }, []);

    const LoadingScreen = () => {
        return (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="lds-heart"><div></div></div>
          </div>
        );
    };

    return (
        <>
            <InfoModal visible={isOpen} onClose={closeModal} />
            <Navbar />
            <div className="relative mt-4">
                <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4  gap-4 lg:gap-3">
                {data && data.length > 0 ? (
                            data.map((game: any) => (
                                <GameGenresCard key={game.id} data={game} />
                            ))
                        ) : (
                            !isLoading && showNoResults && (
                            <div className="text-white font-bold flex text-sm md:text-lg items-center justify-center relative top-16 w-screen">
                                <p>Não há nenhum jogo com esse título, gênero e distribuidora ou youtuber em nosso catálogo!</p>
                            </div>
                            )
                    )}
                </div>
                {isLoading && <LoadingScreen />}
            </div>
        </>
    )
}

export default SearchPage;