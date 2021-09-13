import { useState, useEffect, useCallback } from "react";
import { server } from "./server";
interface State<TData> {
  data: TData | null;
  loading: boolean;
  errors: boolean;
}

export const useQuery = <TData = any>(query: string) => {
  const [state, setState] = useState<State<TData>>({
    data: null,
    loading: false,
    errors: false,
  });

  const fetch = useCallback(() => {
    const fetchApi = async () => {
      try {
        setState({ data: null, loading: true, errors: false });

        const { data, errors } = await server.fetch<TData>({ query });

        if(errors && errors.length ) {
          throw new Error(errors[0].message);
        }

        setState({ data, loading: false, errors: false });
      } catch (error) {
        setState({ data: null, loading: false, errors: true});
        throw console.log(error)
      }
    };
    fetchApi();
  }, [query]);

  useEffect(() => {
    fetch();
  }, [fetch]);
  return { ...state, refetch: fetch };
};
