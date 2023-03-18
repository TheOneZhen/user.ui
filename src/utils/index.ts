export function insertIterator<T extends Record<string, any>> (obj: T & { [Symbol.iterator]: () => Generator}) {
  obj[Symbol.iterator] = function * () {
    for (const key of Object.keys(this)) yield this[key]
  }
}
