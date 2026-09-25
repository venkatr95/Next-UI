export function callAllHandlers<T extends (...args: any[]) => void>(
  ...handlers: (T | undefined)[]
) {
  return function (...args: Parameters<T>) {
    handlers.forEach((handler) => handler?.(...args));
  };
}
