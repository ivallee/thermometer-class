
const weatherData = [1.5, 1.0, 1.5, 2.0, 1.5, 1.0, 0.5, 0.0, -0.5, -1.0, -0.5, 0.0, 0.5, 0.0, 1.0, 0.5, 0.0, -0.5];

class Thermometer {
  constructor() {
    this.observers = [];
    this.currentTemp;
  }

  add(observer) {
    this.observers.push(observer);
  }

  unSubscribe(observer) {
    const index = this.observers.indexOf(o);
    this.observers.splice(index, 1);
  }

  notify(o, data) {
    const index = this.observers.indexOf(o);
    if (index > -1) {
      this.observers[index].update(data);
    }
  }

  notifyAll(data){
    this.observers.forEach(o => o.update(data));
  }

  readData(weatherData) {
    weatherData.forEach((dataPoint) => {
      this.currentTemp = dataPoint;
      console.log(this.currentTemp)
    });
  }

}

class Observer {
 constructor(num) {
   this.num = num;
 }

 update(data) {
   console.log(`Observer ${this.num}: `, data);
 }
}



const vancouver = new Subject();
const observer1 = new Observer(1);
const observer2 = new Observer(2);
vancouver.subscribe(observer1);
vancouver.subscribe(observer2);
vancouver.notify(observer1, 'why hello there');
vancouver.notify(observer2, 'I am number 2!');
vancouver.readData(weatherData);



// STEP 1
// data is array of numbers
// weatherstation has a variable for current temp
// every time current temp changes, subscribers are notified