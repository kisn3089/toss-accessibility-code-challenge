/**
 * @param callback 지연 후 호출할 함수
 * @param delay 단위: ms
 * @example function logging(str: string) { console.log(str) }
 * sleep(() => logging("time"), 1500)
 */
export const sleep = async (callback: () => void, delay: number) => {
  await new Promise((resolve) => setTimeout(() => resolve(callback()), delay));
};
