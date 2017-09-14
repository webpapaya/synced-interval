let lastTime = 0;
const vendors = ['webkit', 'moz'];
for (let x = 0; x < vendors.length && !global.requestAnimationFrame; ++x) {
  global.requestAnimationFrame = global[`${vendors[x]}RequestAnimationFrame`];
  global.cancelAnimationFrame =
    global[`${vendors[x]}CancelAnimationFrame`] || global[`${vendors[x]}CancelRequestAnimationFrame`];
}

if (!global.requestAnimationFrame) {
  global.requestAnimationFrame = (callback) => {
    const currTime = new Date().getTime();
    const timeToCall = Math.max(0, 16 - (currTime - lastTime));
    const id = global.setTimeout(() => { callback(currTime + timeToCall); }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };
}

if (!global.cancelAnimationFrame) {
  global.cancelAnimationFrame = (id) => clearTimeout(id);
}
