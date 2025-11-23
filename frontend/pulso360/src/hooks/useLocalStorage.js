import { useCallback } from 'react';

/**
 * Hook para gerenciar estado local com localStorage
 * @param {String} key - Chave do localStorage
 * @param {any} initialValue - Valor inicial
 * @returns {Array} - [value, setValue]
 */
export const useLocalStorage = (key, initialValue) => {
  // Estado para armazenar valor
  const [storedValue, setStoredValue] = useCallback(() => {
    try {
      // Pegar do localStorage by key
      const item = window.localStorage.getItem(key);
      // Parse se existir
      if (item) {
        return JSON.parse(item);
      }
      // Senão retornar initialValue
      if (initialValue instanceof Function) {
        return initialValue();
      } else {
        return initialValue;
      }
    } catch (error) {
      console.error(`Erro ao ler localStorage para chave '${key}':`, error);
      return initialValue;
    }
  });

  // Retorna a função setada definida com a própria sintaxe useState
  const setValue = useCallback(value => {
    try {
      // Permite que o valor seja uma função como useState
      const valueToStore = value instanceof Function ? value(storedValue()) : value;
      // Salvar estado
      setStoredValue(valueToStore);
      // Salvar em localStorage
      if (valueToStore === undefined) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Erro ao salvar localStorage para chave '${key}':`, error);
    }
  });

  return [storedValue(), setValue];
};

export default useLocalStorage;
