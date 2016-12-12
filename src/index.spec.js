import { assertThat, equalTo } from 'hamjest';
import lolex from 'lolex';
import { setSyncedInterval, clearSyncedInterval } from './index';

const createContext = (timestamp = 0) =>
  lolex.createClock(timestamp, ['setTimeout', 'clearTimeout']);

describe('setSyncedInterval', () => {
  it('executes interval callback after 1 second', (done) => {
    const context = createContext(0);

    setSyncedInterval(() => {
      assertThat(new context.Date(), equalTo(new Date(1000)));
      done();
    }, 1000, context);

    context.tick(1000);
  });

  it('handles a 500ms interval correctly', (done) => {
    const context = createContext(0);
    let wasCalled = 0;
    setSyncedInterval(() => {
      wasCalled += 1;
    }, 500, context);

    context.tick(1000);
    assertThat(wasCalled, equalTo(2));
    done();
  });

  it('handles a 200ms interval correctly', (done) => {
    const context = createContext(0);
    let wasCalled = 0;
    setSyncedInterval(() => {
      wasCalled += 1;
    }, 200, context);

    context.tick(1000);
    assertThat(wasCalled, equalTo(5));
    done();
  });

  it('handles a 2000ms interval correctly', (done) => {
    const context = createContext(0);
    let wasCalled = 0;
    setSyncedInterval(() => {
      wasCalled += 1;
    }, 2000, context);

    context.tick(2000);
    assertThat(wasCalled, equalTo(1));
    done();
  });

  it('executes interval callback at correct time', (done) => {
    const context = createContext(10);

    setSyncedInterval(() => {
      assertThat(new context.Date(), equalTo(new Date(1000)));
      done();
    }, 1000, context);

    context.tick(1000);
  });

  it('executes interval callback multiple times every second', (done) => {
    const context = createContext(10);
    let timesExecuted = 0;

    setSyncedInterval(() => {
      timesExecuted++;
    }, 1000, context);

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
    }, 1000, context);

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


  it('doesn\'t throw if no ids are passed in', () => {
    clearSyncedInterval();
  });
});
