function cancellable(fn, args, t) {
  return () => {
    return setTimeout(() => fn(...args), t);
  };
}

const myFn = cancellable((a, b) => a + b, [1, 2], 200);
console.log(myFn);
