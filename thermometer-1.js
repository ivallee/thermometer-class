
const weatherData = [1.5, 1.0, 1.5, 2.0, 1.5, 1.0, 0.5, 0.0, -0.5, -1.0, -0.5, 0.0, 0.5, 0.0, 1.0, 0.5, 0.0, -0.5];

class Thermometer {
  constructor() {
    this.observers = [];
    this.temperature = null;
    this.lastHigh = null;
    this.lastLow = null;
  }

  getTemp() {
    return this.temperature;
  }

  add(observer) {
    this.observers.push(observer);
  }

  remove(observer) {
    this.observers = this.observers.filter(subscriber => subscriber !== observer);
  }

  notify(observer, data) {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers[index].update(data);
    }
  }

  checkConditions(observer) {
    if (this.lastHigh > observer.fluctuation || this.lastLow > observer.fluctuation) {
      return true;
    } else {
      return false;
    }
  }

  notifyObservers(temp){
    this.observers.forEach((observer, index) => {
      // console.log(this.lastHigh, this.lastLow, this.temperature);
      // console.log('fluctuation test:', this.lastLow < observer.fluctuation)
      if (temp === observer.threshold && this.checkConditions(observer)) {
        observer.update(temp);
      }
    });

  }

  readTemp(weatherData){
    weatherData.forEach((newTemp, index) => {
      console.log('tempurature array: ', weatherData[index])
      
      if (newTemp > this.temperature) {
        this.lastHigh = newTemp;
      }
      if (newTemp < this.temperature) {
        this.lastLow = newTemp;
      }
      
      this.temperature = newTemp;
      
      this.notifyObservers(this.temperature);
    });

  }

}

class Observer {
 constructor(num, threshold) {
   this.num = num;
   this.threshold = threshold;
   this.fluctuation = 0.5;
 }

 update(data) {
   console.log(`Observer ${this.num}: `, data);
 }
}

const weather = new Thermometer();
const computer = new Observer(1, 0);
// const phone = new Observer(2, 32);
weather.add(computer);
weather.readTemp(weatherData);