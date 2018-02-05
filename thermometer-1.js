
const weatherData = [1.5, 1.0, 1.5, 2.0, 1.5, 1.0, 0.5, 0.0, -0.5, -1.0, -0.5, 0.0, 0.5, 0.0, 1.0, 0.5, 0.0, -0.5];

class Thermometer {
  constructor() {
    this.observers = [];
    this.temperature = null;
    this.prevTemperature = null;
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

  checkFluctuation(observer) {
    return (this.lastHigh > observer.fluctuation || this.lastLow < -Math.abs(observer.fluctuation)) ? true : false;
  }

  checkDirection(observer) {
    console.log(this.temperature, this.prevTemperature)
    switch (observer.direction) {
      case 'INC':
        return this.temperature > this.prevTemperature;
        break;
      case 'DEC':
        return this.temperature < this.prevTemperature; 
        break;
    
      default:
        return true;
        break;
    }
    
  
  }

  notifyObservers(temp){
    this.observers.forEach((observer) => {
      // console.log(this.checkDirection(observer));
      if (temp === observer.threshold && this.checkFluctuation(observer) && this.checkDirection(observer)) {
        observer.update(temp);
      }
    });
  }

  readTemp(weatherData) {
    // Simulates new data points over time
    weatherData.forEach((newTemp, index) => {
      
      if (newTemp > this.temperature) {
        this.lastHigh = newTemp;
      }
      if (newTemp < this.temperature) {
        this.lastLow = newTemp;
      }
      
      this.prevTemperature = this.temperature;
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
   this.direction = 'INC';
 }

 update(data) {
   console.log(`Observer ${this.num} threshold: `, data);
 }
}

const thermometer = new Thermometer();
const observer = new Observer(1, 0);
thermometer.add(observer);
thermometer.readTemp(weatherData);