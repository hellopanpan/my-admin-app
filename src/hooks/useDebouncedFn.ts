import { useCallback } from '@tarojs/taro'
import Utils from '@/utils'

type TdependArr = Array<any>

export default function useDebouncedFn(fn, time, depends: TdependArr = []) {
  const debouncedFn = useCallback(Utils.debounce(fn, time), depends)
  return debouncedFn
}
