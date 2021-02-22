// 简单工厂模式
// 简单工厂模式的最大的优点在于实现对象的创建和对象的使用分离，将对象的创建交给专门的工厂类来负责
// 但是缺点是不够灵活，增加具体的产品时需要修改工厂类的判断逻辑代码，当产品较多时，工厂方法代码逻辑会很复杂

// e.g.
// 宠物有很多种
class Dog {
  constructor(name) {
    console.log(name)
  }
}

class Cat {
  constructor(name) {
    console.log(name)
  }
}

class Duck {
  constructor(name) {
    console.log(name)
  }
}

// 实例化这些宠物
const husky1 = new Dog('husky')
const tom1 = new Cat('Tom')
const tang1 = new Duck('Tang')

// 因为他们都是动物，所以我们可以基于此创建一个Pet类

class Pet {
  constructor(type, name) {
    this.pet = ''
    switch (type) {
      case 'dog':
        this.pet = new Dog(name)
        break
      case 'cat':
        this.pet = new Cat(name)
        break
      case 'duck':
        this.pet = new Duck(name)
        break
      default:
        this.pet = '么得'
    }
  }
}

const husky2 = new Pet('dog', 'husky')
const tom2 = new Pet('cat', 'Tom')
const tang2 = new Pet('duck', 'tang')

// 工厂方法模式
// 工厂方法模式是对简单工厂的进一步优化，在工厂方法模式中，我们不在提供一个统一的工厂类来创建所有的对象，而是针对不同的对象提供不同的工厂。
