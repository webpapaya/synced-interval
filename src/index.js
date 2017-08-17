const defaultContext = {
  setTimeout: (...args) => global.setTimeout(...args),
  clearTimeout: (...args) => global.clearTimeout(...args),
  Date: Date,
};

(function() {
  var lastTime = 0;
  var vendors = ['webkit', 'moz'];
  for(var x = 0; x < vendors.length && !global.requestAnimationFrame; ++x) {
      global.requestAnimationFrame = global[vendors[x]+'RequestAnimationFrame'];
      global.cancelAnimationFrame =
        global[vendors[x]+'CancelAnimationFrame'] || global[vendors[x]+'CancelRequestAnimationFrame'];
  }

  if (!global.requestAnimationFrame)
      global.requestAnimationFrame = function(callback, element) {
          var currTime = new Date().getTime();
          var timeToCall = Math.max(0, 16 - (currTime - lastTime));
          var id = global.setTimeout(function() { callback(currTime + timeToCall); },
            timeToCall);
          lastTime = currTime + timeToCall;
          return id;
      };

  if (!global.cancelAnimationFrame)
      global.cancelAnimationFrame = function(id) {
          clearTimeout(id);
      };
}());

export const setSyncedInterval = (fn, timeout, context = defaultContext, ids = []) => {
  var now;
  var then = Date.now();
  //var timeout = 1000;
  var delta;
  
  const scheduleNext= () => {
    const res = requestAnimationFrame(scheduleNext);
    console.log('res: ', res);
    now = Date.now();
    delta = now - then;
    if (delta > timeout) {
      then = now - (delta % timeout);
      //setSyncedInterval(fn, timeout, context, ids);
      fn();
    }
  }
  scheduleNext()
}

export const clearSyncedInterval = (ids = [], context = defaultContext) =>
  ids.forEach((id) => context.clearTimeout(id));
