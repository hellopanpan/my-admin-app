import { useEffect, useRef } from "@tarojs/taro";

export default function useInterval(cb, delay) {
  const ref = useRef();

  useEffect(() => {
    ref.current = cb;
  });

  useEffect(() => {
    const timer = setInterval(() => ref.current(), delay);
    return () => clearInterval(timer);
  }, [delay]);
}
