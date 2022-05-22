import merge from 'lodash/merge';


/**
 * @author TrongND30
 * @description Utils get, save data to storage devices
 */

class Storage {
    /**
     * Get a one or more value for a key or array of keys from localStorage
     * @param {String|Array} key A key or array of keys
     * @return {Promise}
     */
    get(key) {
        return JSON.parse(localStorage.getItem(key));
    }

    /**
     * Save a key value pair or a series of key value pairs to localStorage.
     * @param  {String|Array} key The key or an array of key/value pairs
     * @param  {[{idProductDetail: *, sizeId?: string, image?: *, imageDetail?: string, productIdDetail?: string, quantity?: number, productId?: *, color?: string, size?: string, colorId?: string, price?: *, name?: *}]} value The value to save
     * @return {Promise}
     */
    save(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    /**
     * Updates the value in the store for a given key in localStorage. If the value is a string it will be replaced. If the value is an object it will be deep merged.
     * @param  {String} key The key
     * @param  {Value} value The value to update with
     * @return {Promise}
     */
    update(key, value) {
        return this.get(key).then(item => {
            value = typeof value === 'string' ? value : merge({}, item, value);
            return localStorage.setItem(key, JSON.stringify(value));
        });
    }

    /**
     * Delete the value for a given key in localStorage.
     * @param  {String|Array} key The key or an array of keys to be deleted
     * @return {Promise}
     */
    delete(key) {
        localStorage.removeItem(key);
    }

    /**
     * Get all keys in localStorage.
     * @return {Promise} A promise which when it resolves gets passed the saved keys in localStorage.
     */
    keys() {
        return localStorage.getAllKeys();
    }
}

export default new Storage();
