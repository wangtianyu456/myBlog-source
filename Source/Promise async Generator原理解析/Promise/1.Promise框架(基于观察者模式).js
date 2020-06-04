// 先来看一个最简单的Promise的使用
// const p1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('result')
//   }, 1000);
// })
// p1.then(res => console.log(res), err => console.error(error))

/**
 * `Promise`的构造方法会接受一个执行器`executor()`，在`new Promise()`的时候去执行
 * `executor()`内部的异步任务会被放入相对应的宏/微任务队列
 * `then()`执行其实就是收成功/失败的回调，放入对应的任务队列中
 * `executor()`的异步任务队列执行，会触发`resolve/reject`，从成功/失败任务队列中取出回调依次执行
 */

// 这里边用到的就是 *观察者模式* 思想，*收集依赖 => 派发通知 => 依赖执行*的方式。在`Promise`里，执行顺序是*`then`收集依赖 => 异步触发`resolve` => `resolve`执行依赖*
// 这里我们先勾勒出`Promise`的框架来

class MyPromise {
  constructor(executor) {
    // 收集的成功的任务队列
    this._resolveQueue = []
    // 收集的失败的任务队列
    this._rejectQueue = []

    const _resolve = (val) => {
      while (this._resolveQueue.length) {
        const callback = this._resolveQueue.shift()
        callback(val)
      }
    }

    const _reject = (reason) => {
      while (this._rejectQueue.length) {
        const callback = this._rejectQueue.shift()
        callback(reason)
      }
    }

    executor(_resolve, _reject)
  }

  then(resolveFn, rejectFn) {
    this._resolveQueue.push(resolveFn)
    this._rejectQueue.push(rejectFn)
  }
}

const p1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('res')
  }, 1000)
})
p1.then((res) => {
  console.log(res)
})
