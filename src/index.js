const defaultContext = {
  setTimeout: (...args) => global.setTimeout(...args),
  Date: Date
};

const ONE_SECOND = 1000;
export const setSyncedInterval = (fn, context = defaultContext, ids = []) => {
  const scheduleNext = () => {
    setSyncedInterval(fn, context, ids);
    fn();
  };
  const nextTick = ONE_SECOND - new context.Date().getMilliseconds();
  const timeoutId = context.setTimeout(scheduleNext, nextTick);

  ids.push(timeoutId);
  return ids;
};

export const clearSyncedInterval = (ids, context) =>
  ids.forEach((id) => context.clearTimeout(id));
