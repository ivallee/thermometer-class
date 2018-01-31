
const weatherData = [1.5, 1.0, 1.5, 2.0, 1.5, 1.0, 0.5, 0.0, -0.5, -1.0, -0.5, 0.0, 0.5, 0.0, 1.0, 0.5, 0.0, -0.5];

class Thermometer {
  constructor() {
    this.observers = [];
    this.currentTemp;
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

  notifyAll(data){
    this.observers.forEach(o => o.update(data));
  }

  getWeather(weatherData){

  }

}

class Observer {
 constructor(num, { unit, threshold }) {
   this.num = num;
   this.options = { unit, threshold };
 }

 update(data) {
   console.log(`Observer ${this.num}: `, data);
 }
}

const weather = new Thermometer();
const computer = new Observer(1, {unit: 'C', threshold: 'BOILING'});
weather.add(computer);
console.log(weather)
weather.notify(computer, 'This is data')
console.log(weather.observers);