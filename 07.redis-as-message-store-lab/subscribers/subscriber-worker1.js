const redis = require("redis");
const config = require("../config");
const fibObj = require("../fibonacci-series");

const subscriber = redis.createClient({
    host: config.redisHost,
    port: config.redisPort
});

subscriber.subscribe("fib-subscription2");

subscriber.on("message", (channel, message) => {
    const seriesValue = fibObj.calculateFibonacciValue(Number.parseInt(message));
    console.log(`Channel - ${channel}`);
    console.log(`Fibonacci series value is ${seriesValue}`);
});