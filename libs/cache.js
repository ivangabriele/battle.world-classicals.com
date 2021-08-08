/* eslint-disable class-methods-use-this, no-undef */

const LOCAL_STORAGE_KEY = 'cache'

class Cache {
  constructor() {
    if (!process.browser) {
      return {}
    }

    console.info('%cℹ️ Cache loaded.', 'background-color: blue; color: white;')

    this.init()
  }

  get data() {
    if (!process.browser) {
      return {}
    }

    return JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY))
  }

  set data(cacheData) {
    if (!process.browser) {
      return
    }

    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cacheData))
  }

  init() {
    if (this.data === null) {
      this.data = {}

      console.info('%cℹ️ Cache initialized.', 'background-color: blue; color: white;')
    }
  }

  get(key) {
    return this.data[key]
  }

  set(key, value) {
    this.data = { ...this.data, [key]: value }
  }
}

export default new Cache()
