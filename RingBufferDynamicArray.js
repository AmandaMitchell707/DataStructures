class RingBufferDynamicArray {
  constructor(size) {
    this.staticArray = new Array(size);
    this.capacity = size;
    this.startingIndex = 0;
    this.length = 0;
  }

  // O(1)
  read(index) {
    const location = (this.startingIndex + index) % this.capacity;
    return this.staticArray[location];
  }

  // O(n)
  resize() {
    const newstaticArray = new Array(2 * this.capacity);

    for (let i = 0; i < this.length; i++) {
      const currentIndex = (this.startingIndex + i) % this.capacity;
      newstaticArray[i] = this.staticArray[currentIndex];
    }

    this.staticArray = newstaticArray;
    this.startingIndex = 0;
    this.capacity *= 2;
  }

  // O(1)
  set(value, index) {
    if (index >= this.capacity) {
      this.resize();
      this.set(value, index);
    }

    const location = (this.startingIndex + index) % this.capacity;
    this.staticArray[location] = value;
  }

  // O(1)
  push(element) {
    if (this.length === this.capacity) this.resize();

    const location = this.startingIndex + this.length;
    this.staticArray[location] = element;
    this.length += 1;
  }

  // O(1)
  pop() {
    const index = (this.startingIndex + this.length - 1) % this.capacity;
    this.staticArray[index] = undefined;
    this.length -= 1;
  }

  // O(1)
  shift() {
    this.staticArray[this.startingIndex] = undefined;

    // move the starting index and decrease the length by 1
    const newStartingIndex = (this.startingIndex + 1) % this.capacity;
    this.startingIndex = newStartingIndex;
    this.length -= 1;
  }

  // O(1)
  unshift(element) {
    if (this.length === this.capacity) this.resize();

    // determine the new startingIndex
    let index = (this.startingIndex - 1);
    if (index < 0) index += this.capacity;

    // set the static array at the new startingIndex to the new element
    this.staticArray[index] = element;

    // move the starting index and increase length by 1
    this.startingIndex = index;
    this.length += 1;
  }
}


const example = new RingBufferDynamicArray(4);
example.push(1);
// [1]
example.push(2);
// [1, 2]
example.unshift(3);
// staticArray: [1, 2, undefined, 3]
// dynamic array: [3, 1, 2]
example.unshift(4);
// staticArray: [1, 2, 4, 3]
// [4, 3, 1, 2]
example.unshift(5);
// staticArray: [4, 3, 1, 2, undefined, undefined, undefined, 5]
// dynamic array: [5, 4, 3, 1, 2]
example.pop();
// // staticArray: [4, 3, 1, undefined, undefined, undefined, undefined, 5]
// // dynamic array: [5, 4, 3, 1]
example.shift();
// // staticArray: [4, 3, 1, undefined, undefined, undefined, undefined, undefined]
// // dynamic array: [4, 3, 1]
example.shift();
// // staticArray: [undefined, 3, 1, undefined, undefined, undefined, undefined, undefined]
// // dynamic array: [3, 1]

console.log('final dynamic array:');
for (let i = 0; i < example.length; i++) {
  console.log(example.read(i));
}

console.log('capacity:', example.capacity);
console.log('startingIndex:', example.startingIndex);
console.log('length:', example.length);
console.log('staticArray:', example.staticArray);
