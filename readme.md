# Synced Interval

A interval library which syncs automatically with the browser time.

# Usage

````javascript
import { 
  setSyncedInterval, 
  clearSyncedInterval, 
} from 'synced-interval;

const timeoutId = setSyncedInterval(() => { /* do something crazy */}, 200);
clearSyncedInterval(timeoutId);
````
