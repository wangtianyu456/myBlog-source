/**
 * 插入排序
 * @param {Array} arr
 */
function insertSort(arr) {
  const len = arr.length
  let temp
  for (let i = 0; i < len; i++) {
    let j = i
    // 先把当前的值给存起来
    temp = arr[i]
    // 只要当前值 前面的值 大于当前值，就不停的交换
    while (j > 0 && arr[j - 1] > temp) {
      // 让当前值 等于 前面的值
      arr[j] = arr[j - 1]
      j--
    }
    // 最终交换完毕后，arr[j] 的位置就是要放置的位置
    arr[j] = temp
  }
  return arr
}
