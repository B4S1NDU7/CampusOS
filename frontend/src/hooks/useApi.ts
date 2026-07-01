import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useQuery as useTanstackQuery } from '@tanstack/react-query';
import { api } from '../api';

interface QueryOptions {
  enabled?: boolean;
  refetchInterval?: number;
  cacheTime?: number;
  staleTime?: number;
  retry?: number;
  retryDelay?: number;
}

interface UseQueryResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
  isStale: boolean;
}

/**
 * Custom hook for data fetching with caching
 * Uses @tanstack/react-query under the hood
 */
export const useQuery = <T,>(
  key: string,
  url: string | null,
  options: QueryOptions = {}
): UseQueryResult<T> => {
  const { data, isLoading, error, refetch, isStale } = useTanstackQuery({
    queryKey: [key, url],
    queryFn: async () => {
      if (!url) throw new Error('No URL provided');
      const response = await api.get<T>(url);
      return response.data;
    },
    enabled: !!url && options.enabled !== false,
    refetchInterval: options.refetchInterval,
    gcTime: options.cacheTime,
    staleTime: options.staleTime,
    retry: options.retry,
    retryDelay: options.retryDelay,
  });

  return { 
    data: data as T | null ?? null, 
    loading: isLoading, 
    error: error instanceof Error ? error : (error ? new Error(String(error)) : null), 
    refetch, 
    isStale 
  };
};

/**
 * Simpler fetch hook for one-off requests
 */
export const useFetch = <T,>(
  url: string | null,
  options: { method?: string; body?: any; headers?: Record<string, string> } = {}
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async () => {
    if (!url) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios({
        url,
        method: options.method || 'GET',
        data: options.body,
        headers: options.headers
      });
      setData(response.data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch'));
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    if (options.method === 'GET') {
      execute();
    }
  }, [url, options.method]);

  return { data, loading, error, execute };
};

/**
 * Hook for handling async state
 */
export const useAsync = <T, E = Error>(
  asyncFunction: () => Promise<T>,
  immediate = true
) => {
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<E | null>(null);

  const execute = useCallback(async () => {
    setStatus('pending');
    setData(null);
    setError(null);

    try {
      const response = await asyncFunction();
      setData(response);
      setStatus('success');
      return response;
    } catch (err) {
      setError(err as E);
      setStatus('error');
    }
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, status, data, error };
};

/**
 * Debounce hook for search and filter inputs
 */
export const useDebounce = <T,>(value: T, delay: number = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Hook for managing form state with validation
 */
export const useFormState = <T extends Record<string, any>>(
  initialValues: T,
  onSubmit: (values: T) => Promise<void> | void
) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;
      setValues(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
      }));
    },
    []
  );

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    setTouched(prev => ({ ...prev, [e.target.name]: true }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
        await onSubmit(values);
      } catch (err) {
        console.error('Form submission error:', err);
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, onSubmit]
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    setValues,
    errors,
    setErrors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    isSubmitting
  };
};

/**
 * Hook for pagination
 */
export const usePagination = (totalItems: number, itemsPerPage: number = 10) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const goToPage = useCallback((page: number) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(pageNumber);
  }, [totalPages]);

  const nextPage = useCallback(() => goToPage(currentPage + 1), [currentPage, goToPage]);
  const prevPage = useCallback(() => goToPage(currentPage - 1), [currentPage, goToPage]);

  return {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    goToPage,
    nextPage,
    prevPage
  };
};

/**
 * Hook for local storage state
 */
export const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch {
        console.error('Failed to save to localStorage');
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue] as const;
};
