import { useState, useCallback } from 'react';
import { ZodSchema } from 'zod';
import { useFormState } from './useApi';

interface UseZodFormOptions<T> {
  schema: ZodSchema;
  onSubmit: (values: T) => Promise<void> | void;
  initialValues: T;
}

/**
 * Hook for form handling with Zod validation
 */
export const useZodForm = <T extends Record<string, any>>({
  schema,
  onSubmit,
  initialValues
}: UseZodFormOptions<T>) => {
  const form = useFormState(initialValues, onSubmit);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validate = useCallback(() => {
    try {
      schema.parse(form.values);
      setValidationErrors({});
      return true;
    } catch (err: any) {
      const errors: Record<string, string> = {};
      if (err.errors) {
        err.errors.forEach((error: any) => {
          const path = error.path.join('.');
          errors[path] = error.message;
        });
      }
      setValidationErrors(errors);
      return false;
    }
  }, [form.values, schema]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (validate()) {
        await form.handleSubmit(e);
      }
    },
    [form, validate]
  );

  return {
    ...form,
    validate,
    handleSubmit,
    validationErrors,
    getFieldError: (fieldName: string) => validationErrors[fieldName]
  };
};

/**
 * Hook for mutation (POST, PUT, DELETE)
 */
export const useMutation = <T, R = any>(
  mutationFn: (data: T) => Promise<R>,
  options: {
    onSuccess?: (data: R) => void;
    onError?: (error: Error) => void;
    onSettled?: () => void;
  } = {}
) => {
  const [data, setData] = useState<R | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const mutate = useCallback(
    async (input: T) => {
      setIsLoading(true);
      setError(null);
      setIsSuccess(false);

      try {
        const result = await mutationFn(input);
        setData(result);
        setIsSuccess(true);
        options.onSuccess?.(result);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Mutation failed');
        setError(error);
        options.onError?.(error);
      } finally {
        setIsLoading(false);
        options.onSettled?.();
      }
    },
    [mutationFn, options]
  );

  return { mutate, data, error, isLoading, isSuccess };
};

/**
 * Hook for infinite queries (pagination)
 */
export const useInfiniteQuery = <T,>(
  url: string | ((pageParam: number) => string),
  getNextPageParam?: (lastPage: any, pages: any[]) => number | undefined
) => {
  const [pages, setPages] = useState<T[]>([]);
  const [pageParam, setPageParam] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchNextPage = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const apiUrl = typeof url === 'function' ? url(pageParam) : `${url}?page=${pageParam}`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      setPages(prev => [...prev, ...data.data]);

      if (getNextPageParam) {
        const nextParam = getNextPageParam(data, pages);
        setHasNextPage(nextParam !== undefined);
        if (nextParam) setPageParam(nextParam);
      } else {
        setHasNextPage(data.pagination?.page < data.pagination?.pages);
        setPageParam(pageParam + 1);
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch');
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [pageParam, pages, url, getNextPageParam]);

  return {
    pages,
    fetchNextPage,
    hasNextPage,
    isLoading,
    error,
    pageParam
  };
};

/**
 * Hook for managing multiple fields with error handling
 */
export const useField = (name: string, initialValue: string = '') => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);

  const bind = {
    name,
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
    onBlur: () => {
      // Can add validation here
    }
  };

  return { value, setValue, error, setError, bind };
};
