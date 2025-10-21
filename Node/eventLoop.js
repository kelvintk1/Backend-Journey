console.log('Customer enters resturant');

setTimeout(() => {
    console.log('Chef prepares food');
}, 1000);

setImmediate(() => {
    console.log('Waiter announces order is being processed');
});

Promise.resolve().then(() => {
    console.log('Order is confirmed');
});

process.nextTick(() => {
    console.log('Customer browses the menu');
});

console.log('Customer takes a seat');