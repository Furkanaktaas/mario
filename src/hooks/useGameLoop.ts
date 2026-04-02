import { useEffect, useRef } from 'react';

export function useGameLoop(callback: () => void, isRunning: boolean): void {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        callbackRef.current();
      }, 16);
    } else {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning]);
}
