[![Build Status](https://travis-ci.org/webpapaya/synced-interval.svg?branch=master)](https://travis-ci.org/webpapaya/synced-interval)

# Synced Interval

A interval library which syncs automatically with the browser time.

# Why

In React Apps the applications might be rendered at arbitrary times. 
When implementing a timer or a stop watch this might lead to a jumpy 
behaviour of the numbers as the [Demo](https://webpapaya.github.io/synced-interval/) 
shows. This library solves this issue by syncing the timer with the 
time of the browser.

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
