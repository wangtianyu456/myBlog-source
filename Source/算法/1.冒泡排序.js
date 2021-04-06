function bubbleSort(arr) {
  const len = arr.length
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }
  return arr
}

function betterBubbleSort(arr) {
  const len = arr.length
  for (let i = 0; i < len; i++) {
    // 加一个标志位
    let flag = false
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        ;[arr[j], [arr[j + 1]]] = [arr[j + 1], arr[j]]
        flag = true
      }
    }
    // 如果本轮循环完毕 flag 还是 false，则说明没有走到交换的逻辑里，就说明此时的数据就是有序的，直接返回即可
    if (flag === false) return arr
  }
  return arr
}

const arr = [5, 4, 3, 1, 2]
console.log(bubbleSort(arr))
