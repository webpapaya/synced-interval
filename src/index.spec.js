import { assertThat, equalTo } from 'hamjest';
import lolex from 'lolex';
import { setSyncedInterval, clearSyncedInterval } from './index';

describe('setSyncedInterval', () => {
  it('executes given fn', (done) => {
    const context = lolex.createClock(0, ['setTimeout', 'setInterval']);

    setSyncedInterval(() => {
      assertThat(new context.Date(), equalTo(new Date(1000)));
      done();
    }, context);

    context.tick(1000);
  });

  it('tick is executed on second', (done) => {
    const context = lolex.createClock(10, ['setTimeout', 'setInterval']);

    setSyncedInterval(() => {
      assertThat(new context.Date(), equalTo(new Date(1000)));
      done();
    }, context);

    context.tick(1000);
  });

  it('tick is executed every second', (done) => {
    const context = lolex.createClock(10, ['setTimeout', 'setInterval']);
    let timesExecuted = 0;

    setSyncedInterval(() => {
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

  it('after clearTimeout fn isn\'t executed', (done) => {
    const context = lolex.createClock(10, ['setTimeout', 'setInterval', 'clearTimeout']);

    let timesExecuted = 0;
    const id = setSyncedInterval(() => {
      timesExecuted++;
    }, context);

    clearSyncedInterval(id, context);

    context.setTimeout(() => {
      assertThat(timesExecuted, equalTo(0));
      done();
    }, 3000);

    context.tick(1000);
    context.tick(1000);
    context.tick(1000);
  });

  it('clearSyncedInterval doesn\'t execute registered callbacks', () => {
    const context = lolex.createClock(10, ['setTimeout', 'setInterval', 'clearTimeout']);
    const id1 = context.setTimeout(() => {
      assertThat(false, equalTo(true));
    }, 1000);

    const id2 = context.setTimeout(() => {
      assertThat(false, equalTo(true));
    }, 1000);

    clearSyncedInterval([id1, id2], context);
    context.tick(1000);
    context.tick(1000);
  });

  it('clearSyncedInterval works with nested timeouts as well', () => {
    const context = lolex.createClock(10, ['setTimeout', 'setInterval', 'clearTimeout']);
    let id2 = null;
    const id1 = context.setTimeout(() => {
      assertThat(true, equalTo(true));
      id2 = context.setTimeout(() => {
        assertThat(false, equalTo(true));
      }, 1000);
    }, 1000);

    context.tick(1000);
    clearSyncedInterval([id1, id2], context);
    context.tick(1000);
  });
});

