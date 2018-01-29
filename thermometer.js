class Subject {
  constructor() {
    this.observers = [];
  }

  subscribe(o) {
    this.observers.push(o);
  }

  unSubscribe(o) {
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
}

class Observer {
 constructor(name) {
   this.name = name;
 }

 update(data) {
   console.log('this observer is: ', this.name, data);
 }
}

class WeatherStation extends Subject {

}

const vancouver = new WeatherStation();
const phone = new Observer('phone');
const computer = new Observer('computer');
vancouver.subscribe(phone);
vancouver.subscribe(computer);
vancouver.notifyAll('sup');
vancouver.notify(phone, 'hellooooo!');