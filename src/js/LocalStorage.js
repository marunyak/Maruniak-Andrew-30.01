class LocalStorage {
  constructor() {
    if (typeof LocalStorage.instance === "object") {
      return LocalStorage.instance;
    }
    LocalStorage.instance = this;
    return this;
  }

  save(arr, key) {
    localStorage.setItem(key, JSON.stringify(arr));
  }

  get(key) {
    return JSON.parse(localStorage.getItem(key)) || {};
  }
}

const storage = new LocalStorage();

export default storage;
