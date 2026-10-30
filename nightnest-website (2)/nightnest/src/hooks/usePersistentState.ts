import { useEffect, useState } from 'react'
import { readStore, writeStore } from '../lib/storage'

/** useState that mirrors its value into localStorage under the given key. */
export function usePersistentState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => readStore(key, initial))

  useEffect(() => {
    writeStore(key, value)
  }, [key, value])

  return [value, setValue] as const
}
