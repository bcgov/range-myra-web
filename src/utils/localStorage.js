import { LOCAL_STORAGE_KEY } from '../constants/variables';

/**
 * Save data in local storage
 *
 * @param {string} key
 * @param {object} data
 * @returns undefined
 */
export const saveDataInLocalStorage = (key, data) => {
  const serializedData = typeof data === 'object' ? JSON.stringify(data) : data;
  localStorage.setItem(key, serializedData);
};

/**
 * Get data that was saved in local storage
 *
 * @param {string} key
 * @returns {object} the data object
 */
export const getDataFromLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  if (data) {
    try {
      return JSON.parse(data);
    } catch (err) {
      return data;
    }
  }
  return undefined;
};

export const deleteDataFromLocalStorage = (key) => {
  localStorage.removeItem(key);
  return undefined;
};

export const saveReferencesInLocalStorage = (data) => {
  saveDataInLocalStorage(LOCAL_STORAGE_KEY.REFERENCE, data);
};

export const getReferencesFromLocalStorage = () =>
  getDataFromLocalStorage(LOCAL_STORAGE_KEY.REFERENCE);
