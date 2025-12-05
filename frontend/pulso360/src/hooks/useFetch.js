import { useState, useEffect, useCallback } from 'react';

/**
 * Hook para fazer requisições HTTP com loading e erro
 * IMPORTANTE: Use apiClient nos services ao invés deste hook para garantir autenticação automática
 * @param {String} url - URL da requisição
 * @param {Object} options - Opções (method, headers, body, etc)
 * @returns {Object} - {data, loading, error, refetch}
 */
export const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Adicionar token JWT automaticamente
      const token = localStorage.getItem('access_token');
      const headers = {
        'Content-Type': 'application/json',
        ...options.headers
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(url, {
        headers,
        ...options
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      console.error('Erro ao buscar dados:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
};

export default useFetch;
