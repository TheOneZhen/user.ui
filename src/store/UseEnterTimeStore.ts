import { Store, StoreKey } from './Store'
import { ref } from 'vue'

export class UseEnterTimeStore extends Store {
  key = StoreKey.UseEnterTimeStore

  option (): Object {
    const time = ref(0)
    return { time }
  }
}
