import './polyfill';

export const setSyncedInterval = (fn, timeout) => {
  let animationFrameId;
  let then = Math.floor(Date.now() / timeout);

  const tick = () => {
    animationFrameId = global.requestAnimationFrame(tick);

    const now = Math.floor(Date.now() / timeout);
    if (then < now) {
      then = now;
      fn();
    }
  };

  tick();
  return () => global.cancelAnimationFrame(animationFrameId);
};

export const clearSyncedInterval = (cancelFn) => cancelFn && cancelFn();
