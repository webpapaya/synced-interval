[![Build Status](https://travis-ci.org/webpapaya/synced-interval.svg?branch=master)](https://travis-ci.org/webpapaya/synced-interval)

# Synced Interval

A interval library which syncs automatically with the browser time.

[Demo](https://webpapaya.github.io/synced-interval/)

# Usage

````
npm install synced-interval --save
````


````javascript
import { 
  setSyncedInterval, 
  clearSyncedInterval, 
} from 'synced-interval';

const timeoutId = setSyncedInterval(() => { /* do something crazy */}, 200);
clearSyncedInterval(timeoutId);
````
