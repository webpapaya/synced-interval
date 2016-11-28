const defaultContext = {
  setTimeout: (...args) => global.setTimeout(...args),
  Date: Date,
};

export const setSyncedInterval = (fn, timeout, context = defaultContext, ids = []) => {
  const scheduleNext = () => {
    setSyncedInterval(fn, timeout, context, ids);
    fn();
  };
  const nextTick = timeout - new context.Date().getMilliseconds() % timeout;
  const timeoutId = context.setTimeout(scheduleNext, nextTick);

  ids.push(timeoutId);
  return ids;
};

export const clearSyncedInterval = (ids, context) =>
  ids.forEach((id) => context.clearTimeout(id));
