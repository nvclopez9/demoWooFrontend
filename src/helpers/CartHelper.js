class CartHelper {
    static setCookie(name, value, days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      const expires = `expires=${date.toUTCString()}`;
      document.cookie = `${name}=${value};${expires};path=/`;
    }
  
    static getCookie(name) {
      const nameEQ = `${name}=`;
      const cookies = document.cookie.split(';');
      for (const cookie of cookies) {
        let trimmedCookie = cookie.trim();
        if (trimmedCookie.startsWith(nameEQ)) {
          return trimmedCookie.substring(nameEQ.length);
        }
      }
      return null;
    }
  
    static deleteCookie(name) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
  
    static getCartKey() {
      return this.getCookie('cart_key');
    }
  
    static setCartKey(key) {
      this.setCookie('cart_key', key, 1); // Guardar la cookie por 7 días
    }
  
    static clearCartKey() {
      this.deleteCookie('cart_key');
    }
  }
  
  export default CartHelper;
  