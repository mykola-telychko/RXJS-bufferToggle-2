import { fromEvent, pipe } from 'rxjs';
import { bufferToggle, map } from 'rxjs/operators';

// https://www.learnrxjs.io/learn-rxjs/operators/transformation/buffertoggle
// Example 2: Toggle buffer on and off on mouse down/up
console.clear();

const getXYCoordinates = pipe(
  map<[MouseEvent], {}>((e) => e.map((v) => ({ x: v.clientX, y: v.clientY }))),
  map((e) => JSON.stringify(e))
);

const buffer = pipe(
  bufferToggle(fromEvent(document, 'mousedown'), (_) =>
    fromEvent(document, 'mouseup')
  )
);

fromEvent(document, 'mousemove')
  .pipe(buffer, getXYCoordinates)
  .subscribe(console.log);
