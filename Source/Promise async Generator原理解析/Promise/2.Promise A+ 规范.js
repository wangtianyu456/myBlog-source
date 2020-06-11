// 之前我们已经实现了一个基础版的 `Promise`，只是搭建了它的一个大体的框架，紧接着我们要按照`Promise A+ 规范`来实现完整版的`Promise`
/**
 * 规范中的两条核心规则：
 * 1. Promise本质上是一个状态机，且状态只能为以下三种`Pending`、`Fulfilled`、'Rejected'，状态的改变只能是单向的，且不可逆
 *  - 只能从`Pending => Fulfilled`
 *  - 或从`Pending => Rejected`
 * 2. `then`方法接受两个可选参数，分别对应状态改变时触发的回调。`then`方法返回一个新的`Promise`。`then`方法可以被同一个`promise`调用多次
 */
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  constructor(executor) {
    // 初始的promise的状态
    this._status = PENDING
    this._value = undefined
    this._reason = undefined
    // 成功回调队列
    this._resolveQueue = []
    // 失败回调队列
    this._rejectQueue = []

    const _resolve = (val) => {
      // 状态改变只能是从 pending => 其他两种状态
      const run = () => {
        if (this._status === PENDING) {
          this._status = FULFILLED
          while (this._resolveQueue.length) {
            const callback = this._resolveQueue.shift()
            callback(val)
          }
        }
      }
      // 使用setTimeout来保证让resolve异步执行
      setTimeout(run)
    }
    const _reject = (reason) => {
      const run = () => {
        if (this._status === PENDING) {
          this._status = REJECTED
          while (this._rejectQueue.length) {
            const callback = this._rejectQueue.shift()
            callback(reason)
          }
        }
      }
      setTimeout(run)
    }

    executor(_resolve, _reject)
  }

  /**
   * 方法返回一个给定值解析后的Promise对象。如果该值为promise，则返回promise。如果这个值是thenable(即带有`then`方法)，返回的Promise会跟随这个thenable的对象，采取它的最终状态
   * @param value
   * @returns {MyPromise}
   */
  static resolve(value) {
    // 如果参数是Promise的实例，那么直接返回这个实例
    if (value instanceof MyPromise) return value
    // 返回resolve状态的promise
    return new MyPromise((resolve) => resolve(value))
  }

  static reject(reason) {
    return new MyPromise((resolve, reject) => reject(reason))
  }

  then(resolveFn, rejectFn) {
    // 处理值穿透的问题，当then接受到的参数不是function时，我们要忽略它。如果没有忽略，当回调执行的时候，因为不是function就会报错，导致链式出错
    if (typeof resolveFn !== 'function') {
      resolveFn = (value) => value
    }
    if (typeof rejectFn !== 'function') {
      rejectFn = (reason) => {
        throw new Error(reason)
      }
    }
    // 返回一个新的promise
    return new MyPromise((resolve, reject) => {
      // 将resolve函数包装一层，判断执行的结果是否返回了Promise，如果返回的是Promise，那么就要让这个Promise的状态变更
      // 如果返回的值不是promise，那么就直接resolve，这样就能让后续的then中的resolveFn获取到值，从而实现链式调用
      const fulfilledFn = (value) => {
        try {
          const x = resolveFn(value)
          x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
        } catch (error) {
          reject(error)
        }
      }

      // 同理 reject 也一样
      const rejectedFn = (error) => {
        try {
          const x = rejectFn(error)
          x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
        } catch (error) {
          reject(error)
        }
      }
      // 我们还需要判判断promise的状态，如果为pending状态那么就是正常的往回调队列中添加回调
      // 如果Promise.resolve().then()的话，此时promise的状态已经变更为`fulfilled`状态了，此时我们应该去执行`then`回调
      // `rejected`状态同理
      if (this._status === PENDING) {
        this._resolveQueue.push(fulfilledFn)
        this._rejectQueue.push(rejectedFn)
      }
      if (this._status === FULFILLED) {
        fulfilledFn(this._value)
      }
      if (this._status === REJECTED) {
        rejectedFn(this._reason)
      }
    })
  }

  /**
   * catch方法返回一个`rejected`状态的`Promise`，
   * 其实就是执行then的错误回调
   * @param rejectFn
   */
  catch(rejectFn) {
    return this.then(undefined, rejectFn)
  }

  /**
   * `finally`方法返回一个Promise，在promise结束时，无论结果是`fulfilled`或者是`rejected`，都会执行指定的回调
   * 在`finally`之后还可以继续`then`，同理会将值原封不动的传递下去
   * @param callback
   */
  finally(callback) {
    return this.then(
      (value) => MyPromise.resolve(callback()).then(() => value),
      (reason) =>
        MyPromise.resolve(callback()).then(() => {
          throw new Error(reason)
        })
    )
  }

  static all(promiseList) {
    let index = 0
    const result = []
    return new MyPromise((resolve, reject) => {
      promiseList.forEach((promise, i) => {
        MyPromise.resolve(promise).then(
          (val) => {
            result[i] = val
            index++
            if (index === promiseList.length) {
              resolve(result)
            }
          },
          (err) => {
            reject(err)
          }
        )
      })
    })
  }

  static race(promiseList) {
    return new MyPromise((resolve, reject) => {
      for (const p of promiseList) {
        MyPromise.resolve(p).then(
          (value) => {
            resolve(value)
          },
          (err) => {
            reject(err)
          }
        )
      }
    })
  }
}
