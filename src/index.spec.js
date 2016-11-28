import { assertThat, equalTo } from 'hamjest';
import lolex from 'lolex';
import { setSyncedInterval, clearSyncedInterval } from './index';

const createContext = (timestamp = 0) =>
  lolex.createClock(timestamp, ['setTimeout', 'clearTimeout']);

describe('setSyncedInterval', () => {
  it('executes given fn', (done) => {
    const context = createContext(0);

    setSyncedInterval(() => {
      assertThat(new context.Date(), equalTo(new Date(1000)));
      done();
    }, context);

    context.tick(1000);
  });

  it('tick is executed on second', (done) => {
    const context = createContext(10);

    setSyncedInterval(() => {
      assertThat(new context.Date(), equalTo(new Date(1000)));
      done();
    }, context);

    context.tick(1000);
  });

  it('tick is executed every second', (done) => {
    const context = createContext(10);
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
});

describe('clearSyncedInterval', () => {
  it('after clearTimeout fn isn\'t executed', (done) => {
    const context = createContext(10);

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

  it('doesn\'t execute registered callbacks', () => {
    const context = createContext(10);
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

  it('works with nested timeouts as well', () => {
    const context = createContext(10);
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





