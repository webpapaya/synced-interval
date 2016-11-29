"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var defaultContext = {
  setTimeout: function setTimeout() {
    var _global;

    return (_global = global).setTimeout.apply(_global, arguments);
  },
  Date: Date
};

var setSyncedInterval = exports.setSyncedInterval = function setSyncedInterval(fn, timeout) {
  var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultContext;
  var ids = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

  var scheduleNext = function scheduleNext() {
    setSyncedInterval(fn, timeout, context, ids);
    fn();
  };
  var nextTick = timeout - new context.Date().getMilliseconds() % timeout;
  var timeoutId = context.setTimeout(scheduleNext, nextTick);

  ids.push(timeoutId);
  return ids;
};

var clearSyncedInterval = exports.clearSyncedInterval = function clearSyncedInterval(ids, context) {
  return ids.forEach(function (id) {
    return context.clearTimeout(id);
  });
};