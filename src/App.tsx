import { useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useInfiniteQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Home from "./pages/Home";
import SplashScreen from "./pages/SplashScreen";
import { setFilteredStocks, setStocks } from "./redux/slices/stocksSlice";
import { setIsLoading } from "./redux/slices/loadingSlice";
import toast, { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000, // the API has limited requests per minute, so i set the staleTime to 60 seconds
    },
  },
});

const AppWrapper = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
};

const App = () => {

  const dispatch = useDispatch();
  const apiUrl = import.meta.env.VITE_POLYGON_API_URL;
  const apiKey = import.meta.env.VITE_POLYGON_API_KEY;
  const baseUrl = `${apiUrl}?market=stocks&active=true&order=asc&limit=50&sort=ticker&apiKey=${apiKey}`;
  const searchKeyword = useSelector((state: { filter: string }) => state.filter);

  const showError = () =>
    toast.error(
      "You have exceeded the number of requests per minute, please try again later."
    );


  const fetchStocks = async ({ pageParam }: { pageParam?: string }) => {
    try {
      const url = pageParam || baseUrl;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
        showError();
      }

      const data = await response.json();
      return {
        results: data.results || [],
        nextUrl: data.next_url ? `${data.next_url}&apiKey=${apiKey}` : null,
      };
    } catch (err) {
      console.error("Error fetching stocks:", err);
      showError();
      throw err;
    }
  };

  const fetchFilteredStocks = async () => {
    try {
      const url = `${apiUrl}?market=stocks&active=true&order=asc&limit=100&sort=ticker&search=${searchKeyword}&apiKey=${apiKey}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      dispatch(setFilteredStocks(data.results));
    } catch (err) {
      console.error("Error fetching stocks:", err);
      showError();
      throw err;
    }
  };

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["stocks"],
      queryFn: fetchStocks,
      getNextPageParam: (lastPage) => lastPage.nextUrl,
      initialPageParam: baseUrl,
      retryDelay: 5000,
      retry: 1,
    });

  useEffect(() => {
    if (data?.pages) {
      const allStocks = data.pages.flatMap((page) => page.results);
      dispatch(setStocks(allStocks));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (searchKeyword) {
      fetchFilteredStocks();
    } else {
      dispatch(setFilteredStocks([]));
    }
  }, [searchKeyword]);

  useEffect(() => {
    dispatch(setIsLoading(isLoading));
  }, [isLoading, dispatch]);

  const sentinelRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage]
  );

  useEffect(() => {
    if (!sentinelRef.current) return;

    observerRef.current = new IntersectionObserver(handleObserver, {
      rootMargin: "100px",
      threshold: 0.1,
    });

    observerRef.current.observe(sentinelRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [handleObserver]);

  return (
    <>
      {isLoading ? <SplashScreen /> : <Home />}
      <div ref={sentinelRef} style={{ height: "1px", visibility: "hidden" }} />
      <Toaster position="bottom-center" />
    </>
  );
};

export default AppWrapper;
