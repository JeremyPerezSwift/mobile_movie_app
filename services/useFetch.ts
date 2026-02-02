import { useEffect, useState } from "react";

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = async (): Promise<T> => {
        try {
            setLoading(true);
            setError(null);

            const result = await fetchFunction();
            setData(result);

            return result; // ✅ permet d'utiliser le résultat immédiatement
        } catch (e) {
            const err = e instanceof Error ? e : new Error("An error occurred");
            setError(err);
            throw err; // ✅ important : sinon l'appelant croit que tout va bien
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setData(null);
        setLoading(false);
        setError(null);
    };

    useEffect(() => {
        if (autoFetch) {
            // optionnel : éviter l'unhandled rejection si autoFetch et erreur
            fetchData().catch(() => {});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { data, loading, error, refetch: fetchData, reset };
};

export default useFetch;




/*
import {useEffect, useState} from "react";

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);

            const result = await fetchFunction();
            setData(result);
        } catch (e) {
            setError(e instanceof  Error ? e : new Error('An error occurred'));
        } finally {
            setLoading(false);
        }
    }

    const reset= () => {
        setData(null);
        setLoading(false);
        setError(null);
    }

    useEffect(() => {
        if(autoFetch) {
            fetchData();
        }
    }, []);

    return { data, loading, error, refetch: fetchData, reset };
}

export default useFetch;*/
