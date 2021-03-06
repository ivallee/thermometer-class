class Subject {
  constructor() {
    this.observers = [];
  }

  add(observer) {
    this.observers.push(observer);
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

  notifyObservers(data) {
    this.observers.forEach(o =>  o.update(data));

  }
}

module.exports = Subject;