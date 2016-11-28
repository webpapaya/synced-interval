# Synced Interval

A interval library which syncs automatically with the browser time.

# Usage

````
npm install synced-interval --save
````


````javascript
import { 
  setSyncedInterval, 
  clearSyncedInterval, 
} from 'synced-interval;

const timeoutId = setSyncedInterval(() => { /* do something crazy */}, 200);
clearSyncedInterval(timeoutId);
````
