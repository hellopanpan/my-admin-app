interface formatSecondsRes {
  h: number
  m: number
  s: number
}
/**
 * s 转化成 h m s
 * @param val 
 */
export const formatSeconds = (val: number): formatSecondsRes => {
  let s = val, m = 0, h = 0;

  if (s >= 60) {
    m = s / 60;
    s = s % 60;
    if (m >= 60) {
      h = m / 60;
      m = m % 60;
    }
  }
  return {
    h: Math.floor(h),
    m: Math.floor(m),
    s: Math.floor(s)
  };
}

/**
 * formatPrice 提取数字和单位
 */
export const formatPrice = (showPrice: string) => {
  try {
    const priceMatch = showPrice.match(/([\d\.]+)(.*)/);
    return {
      num: priceMatch ? priceMatch[1] : "价格待定",
      unit: priceMatch? priceMatch[2] : ''
    }
  } catch (e) {
    return {
      num: '待定',
      unit: ''
    }
  }
}