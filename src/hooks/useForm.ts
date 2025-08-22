import { useState } from "react";

export type FieldErrors<T> = Partial<Record<keyof T, string>>;

export function useForm<T>(initial: T) {
  const [values, setValues] = useState<T>(initial);
  const [errors, setErrors] = useState<FieldErrors<T>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange =
    (key: keyof T) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [key]: e.target.value });
      setErrors({ ...errors, [key]: undefined });
    };

  const handleSubmit = async (callback: (values: T) => Promise<void>) => {
    setErrors({});
    setLoading(true);
    try {
      await callback(values);
      setSubmitted(true);
    } catch (err: any) {
      if (err?.fieldErrors) setErrors(err.fieldErrors);
      else console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    values,
    handleChange,
    errors,
    setErrors,
    loading,
    submitted,
    setSubmitted,
    handleSubmit,
  };
}
