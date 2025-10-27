# 日常刷题

![banner](/img/leecode/leecode.png)

## 1480.一维数组的动态和

难度：简单

[题目链接](https://leetcode-cn.com/problems/running-sum-of-1d-array/)

初次完成代码：

```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var runningSum = function(nums) {
  return nums.map(function(t, i) {
    let sum = 0;
    for (let index = 0; index < i + 1; index++) {
      sum += nums[index];
    }
    return sum;
  });
};
```

## 剑指 Offer 58 - II. 左旋转字符串

难度：简单

[题目链接](https://leetcode-cn.com/problems/zuo-xuan-zhuan-zi-fu-chuan-lcof/)

初次完成代码：

```js
/**
 * @param {string} s
 * @param {number} n
 * @return {string}
 */
var reverseLeftWords = function(s, n) {
  let before = s.slice(0, n);
  let after = s.slice(n);
  return after + before;
};
```

<Valine></Valine>
