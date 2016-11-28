import { assertThat, equalTo } from 'hamjest';
import lolex from 'lolex';

const defaultContext = {
  setTimeout: (...args) => global.setTimeout(...args),
  Date: Date
};

const ONE_SECOND = 1000;
const setWithTimeSyncedInterval = (fn, context = defaultContext) => {
  const nextTick = ONE_SECOND - new context.Date().getMilliseconds();

  context.setTimeout(() => {
    fn();
    setWithTimeSyncedInterval(fn, context);
  }, nextTick);
};

describe('setWithTimeSyncedInterval', () => {

  it('executes given fn', (done) => {
    const context = lolex.createClock(0, ['setTimeout', 'setInterval']);

    setWithTimeSyncedInterval(() => {
      assertThat(new context.Date(), equalTo(new Date(1000)));
      done();
    }, context);

    context.tick(1000);
  });

  it('tick is executed on second', (done) => {
    const context = lolex.createClock(10, ['setTimeout', 'setInterval']);

    setWithTimeSyncedInterval(() => {
      assertThat(new context.Date(), equalTo(new Date(1000)));
      done();
    }, context);

    context.tick(1000);
  });

  it('tick is executed every second', (done) => {
    const context = lolex.createClock(10, ['setTimeout', 'setInterval']);
    let timesExecuted = 0;

    setWithTimeSyncedInterval(() => {
      timesExecuted++;
    }, context);

    context.setTimeout(() => {
      assertThat(timesExecuted, equalTo(3));
      done();
    }, 3000);

    context.tick(1000);
    context.tick(1000);
    context.tick(1000);
  });
});

