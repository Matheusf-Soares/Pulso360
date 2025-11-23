import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * Hook para gerenciar estado de formulário
 * @param {Object} initialValues - Valores iniciais do formulário
 * @param {Function} onSubmit - Função callback ao enviar
 * @returns {Object} - {values, errors, touched, handleChange, handleBlur, handleSubmit, resetForm}
 */
export const useForm = (initialValues, onSubmit) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    setValues(prev => ({ ...prev, [name]: fieldValue }));
    // Limpar erro quando o usuário corrige
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  }, []);

  const handleSubmit = useCallback(async (e, validationFn) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validar se função foi fornecida
      let newErrors = {};
      if (validationFn) {
        newErrors = validationFn(values) || {};
      }

      if (Object.keys(newErrors).length === 0) {
        await onSubmit(values);
      } else {
        setErrors(newErrors);
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [values, onSubmit]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setValues,
    setErrors
  };
};

export default useForm;
