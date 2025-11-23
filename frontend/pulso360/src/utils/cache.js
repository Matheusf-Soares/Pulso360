/**
 * Classe para gerenciar armazenamento em cache
 */

class CacheManager {
  constructor(defaultTTL = 5 * 60 * 1000) { // 5 minutos por padrão
    this.cache = new Map();
    this.ttl = new Map();
    this.defaultTTL = defaultTTL;
  }

  /**
   * Armazenar valor em cache
   * @param {String} key - Chave
   * @param {any} value - Valor
   * @param {Number} ttl - Tempo de vida (ms). Se não fornecido, usa defaultTTL
   */
  set(key, value, ttl = this.defaultTTL) {
    // Limpar timeout anterior se existir
    if (this.ttl.has(key)) {
      clearTimeout(this.ttl.get(key));
    }

    // Armazenar valor
    this.cache.set(key, value);

    // Se TTL > 0, configurar para expirar
    if (ttl > 0) {
      const timeoutId = setTimeout(() => {
        this.delete(key);
      }, ttl);
      this.ttl.set(key, timeoutId);
    }
  }

  /**
   * Recuperar valor do cache
   * @param {String} key
   * @returns {any} - Valor ou undefined
   */
  get(key) {
    return this.cache.get(key);
  }

  /**
   * Verificar se chave existe
   * @param {String} key
   * @returns {Boolean}
   */
  has(key) {
    return this.cache.has(key);
  }

  /**
   * Deletar valor do cache
   * @param {String} key
   */
  delete(key) {
    if (this.ttl.has(key)) {
      clearTimeout(this.ttl.get(key));
      this.ttl.delete(key);
    }
    this.cache.delete(key);
  }

  /**
   * Limpar todo o cache
   */
  clear() {
    this.ttl.forEach(timeoutId => clearTimeout(timeoutId));
    this.cache.clear();
    this.ttl.clear();
  }

  /**
   * Obter todas as chaves
   * @returns {Array}
   */
  keys() {
    return Array.from(this.cache.keys());
  }

  /**
   * Obter tamanho do cache
   * @returns {Number}
   */
  size() {
    return this.cache.size;
  }
}

export default CacheManager;
