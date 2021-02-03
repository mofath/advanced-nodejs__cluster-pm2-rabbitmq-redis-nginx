class FibonacciSeries {
  constructor() {}

  calculateFibonacciValue(num) {
    var s = 0;

    if (num === 0) return s;

    if (num === 1) return (s += 1);
    else {
      return (
        this.calculateFibonacciValue(num - 1) +
        this.calculateFibonacciValue(num - 2)
      );
    }
  }
}

module.exports = new FibonacciSeries();
