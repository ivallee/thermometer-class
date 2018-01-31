
const weatherData = [1.5, 1.0, 1.5, 2.0, 1.5, 1.0, 0.5, 0.0, -0.5, -1.0, -0.5, 0.0, 0.5, 0.0, 1.0, 0.5, 0.0, -0.5];

class Thermometer {
  constructor() {
    this.observers = [];
    this.temperature = null;
    this.maxTemp = null;
    this.minTemp = null;
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

  notifyObservers(temp){
    this.observers.forEach(o => {
      
      // 

      if (temp === o.threshold) {
        o.update(temp);
      }
    });

    // Check conditions, then notify
  }

  readTemp(weatherData){
    weatherData.forEach(dataPoint => {
      this.temperature = dataPoint;
      this.notifyObservers(this.temperature);
    });

  }

}

class Observer {
 constructor(num, threshold) {
   this.num = num;
   this.threshold = threshold;
 }

 update(data) {
   console.log(`Observer ${this.num}: `, data);
 }
}

const weather = new Thermometer();
const computer = new Observer(1, 0);
const phone = new Observer(2, 32);
weather.add(computer);
weather.add(phone);
console.log(weather)
weather.notify(computer, 'This is data')
console.log(weather.observers);
weather.readTemp(weatherData);