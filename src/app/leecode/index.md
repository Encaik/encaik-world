# 力扣的打卡记录

![banner](/img/leecode/index.png)

[[toc]]

## 起因

因为偶然想起 leecode，上去做了个打卡题，虽然通过但是应该还有优化空间，于是想留个优化的记录，方便之后思考。

## 2020-7-24 1025.除数博弈

1025.除数博弈

难度：简单

[题目链接](https://leetcode-cn.com/problems/divisor-game/)

初次完成代码：

```js
/**
 * @param {number} N
 * @return {boolean}
 */
var divisorGame = function(N) {
  let n = N;
  let isAls = true;
  let x = 0;
  let nums = [];
  let numslen = 0;
  while (true) {
    //1.选出所有可选的x
    for (let index = 1; index < n; index++) {
      if (n % index == 0) {
        nums.push(index);
      }
    }
    //2.选择x计算
    numslen = nums.length;
    if (isAls) {
      isAls = false;
      if (numslen == 0) {
        return false;
      }
      x = nums[0];
      if (n - x <= 0) {
        return false;
      }
      n = n - x;
    } else {
      isAls = true;
      if (numslen == 0) {
        return true;
      }
      x = nums[0];
      if (n - x <= 0) {
        return true;
      }
      n = n - x;
    }
  }
};
```

将每次选最小改为每次选最大后，出错，经过反复推算，应该是这道题只能选最小，即轮流减一，谁先到 1 谁输，根据这个规律可以直接精简程序至如下：

```js
/**
 * @param {number} N
 * @return {boolean}
 */
var divisorGame = function(N) {
  if (N % 2 == 0) return true;
  return false;
};
```

然后发现可以直接用 N%2 代替逻辑判断，于是精简出最终版本：

```js
/**
 * @param {number} N
 * @return {boolean}
 */
var divisorGame = function(N) {
  return !(N % 2);
};
```

## 2020-7-27 392.判断子序列

392.判断子序列

难度：简单

[题目链接](https://leetcode-cn.com/problems/is-subsequence/)

初次完成代码：

```js
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function(s, t) {
  if (s.length === t.length) {
    if (s == t) {
      return true;
    } else {
      return false;
    }
  } else if (s.length > t.length) {
    return false;
  }
  let str = s.split("");
  let lstr = t;
  for (let x = 0; x < str.length; x++) {
    let temp = lstr.split(str[x]);
    if (temp.length == 2) {
      temp.shift();
      lstr = temp.join("");
    } else if (temp.length > 2) {
      temp.shift();
      lstr = temp.join(str[x]);
    } else {
      return false;
    }
  }
  return true;
};
```

## 2020-7-28 104.二叉树的最大深度

104.二叉树的最大深度

难度：简单

[题目链接](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/)

初次完成代码：

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
  if (root == null) return 0;
  const leftMaxDepth = maxDepth(root.left);
  const rightMaxDepth = maxDepth(root.right);
  return 1 + Math.max(leftMaxDepth, rightMaxDepth);
};
```

## 2020-7-30 343.整数拆分

343.整数拆分

难度：中等

[题目链接](https://leetcode-cn.com/problems/integer-break/)

初次完成代码：

```js
/**
 * @param {number} n
 * @return {number}
 */
var integerBreak = function(n) {
  let num = Math.ceil(n / 2);
  let res = 0;
  for (; num > 0; num--) {
    if (n % num === 0) {
      let temp = Math.pow(num, n / num);
      res = Math.max(res, temp);
    } else if (Math.floor(n / num) === 1) {
      let temp = num * (n - num);
      res = Math.max(res, temp);
    } else if (n % num > num / 2) {
      let temp = Math.pow(num, Math.floor(n / num)) * (n % num);
      res = Math.max(res, temp);
    } else if (n % num < num / 2) {
      let temp = Math.pow(num, Math.floor(n / num) - 1) * (num + (n % num));
      res = Math.max(res, temp);
    }
  }
  return res;
};
```

简化代码时发现，当余数刚好等于除数的一半的时候，这种情况没有判断到，因此添加了这一判断

```js
/**
 * @param {number} n
 * @return {number}
 */
var integerBreak = function(n) {
  let num = Math.ceil(n / 2);
  let res = 0;
  for (; num > 0; num--) {
    let temp = 0;
    if (n % num === 0) {
      temp = Math.pow(num, n / num);
    } else if (Math.floor(n / num) === 1) {
      temp = num * (n - num);
    } else if (n % num > num / 2) {
      temp = Math.pow(num, Math.floor(n / num)) * (n % num);
    } else if (n % num <= num / 2) {
      temp = Math.pow(num, Math.floor(n / num) - 1) * (num + (n % num));
    }
    res = Math.max(res, temp);
  }
  return res;
};
```

## 2020-7-31 面试题 08.03.魔术索引

面试题 08.03.魔术索引

难度：简单

[题目链接](https://leetcode-cn.com/problems/magic-index-lcci/)

初次完成代码：

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMagicIndex = function(nums) {
  for (let index = 0; index < nums.length; index++) {
    if (nums[index] == index) {
      return index;
    }
  }
  return -1;
};
```

之后将返回体略作简化

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMagicIndex = function(nums) {
  for (let index = 0; index < nums.length; index++)
    if (nums[index] == index) return index;
  return -1;
};
```

## 2020-8-3 415.字符串相加

415.字符串相加

难度：简单

[题目链接](https://leetcode-cn.com/problems/add-strings/)

初次完成代码：

```js
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function(num1, num2) {
  return String(parseInt(num1) + parseInt(num2));
};
```

这段代码通过了执行，但是在提交时出错，经过检查发现是数字超出了 js 的最大整数导致精度丢失。想到 js 应该没有长整型的概念，已经打算手写加法的我，突然想要搜一下，结果发现了长整型的提案，于是尝试了一下：

```js
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function(num1, num2) {
  return String(BigInt(num1) + BigInt(num2));
};
```

## 2020-8-4 207.课程表

207.课程表

难度：中等

[题目链接](https://leetcode-cn.com/problems/course-schedule/submissions/)

初次完成代码：

```js
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function(numCourses, prerequisites) {
  let map = {};
  for (let course = 0; course < numCourses; course++) {
    map[course] = [];
    for (let index = 0; index < prerequisites.length; index++) {
      if (prerequisites[index][0] === course) {
        map[course].push(prerequisites[index][1]);
      }
    }
  }
  let learn = "";
  while (true) {
    for (let index of Object.keys(map)) {
      if (map[index].length == 0) {
        learn = index;
      }
    }
    if (learn == "" && JSON.stringify(map) != "{}") {
      return false;
    } else if (learn == "" && JSON.stringify(map) == "{}") {
      return true;
    }
    for (let index of Object.keys(map)) {
      if (index == learn) {
        delete map[index];
      } else if (map[index].indexOf(parseInt(learn)) > -1) {
        let pos = map[index].indexOf(parseInt(learn));
        map[index].splice(pos, 1);
      }
    }
    learn = "";
  }
};
```

可以看出来题目是想要在有向图中寻找有无通路，但因为数据结构基础差，所以先用本办法做了出来

## 2020-8-6 336.回文对

336.回文对

难度：困难

[题目链接](https://leetcode-cn.com/problems/palindrome-pairs/)

初次完成代码：

```js
/**
 * @param {string[]} words
 * @return {number[][]}
 */
var palindromePairs = function(words) {
  let res = [];
  let rwords = words.map(i => {
    return i
      .split("")
      .reverse()
      .join("");
  });
  for (let x = 0; x < words.length; x++) {
    for (let y = 0; y < words.length; y++) {
      if (y == x) {
        continue;
      }
      let str = words[x] + words[y];
      let rstr = rwords[y] + rwords[x];
      if (str === rstr) {
        res.push([x, y]);
      }
    }
  }
  return res;
};
```

此次是通过暴力破解的办法完成此题目，但是可以有优化的地方

## 2020-8-10 696.计数二进制子串

696.计数二进制子串

难度：简单

[题目链接](https://leetcode-cn.com/problems/count-binary-substrings/)

初次完成代码：

```js
/**
 * @param {string} s
 * @return {number}
 */
var countBinarySubstrings = function(s) {
  let str = s.match(/(1+|0+)/g);
  let count = 0;
  for (let index = 0; index < str.length - 1; index++) {
    count = count + Math.min(str[index].length, str[index + 1].length);
  }
  return count;
};
```

## 2020-10-26 1365.有多少小于当前数字的数字

1365.有多少小于当前数字的数字

难度：简单

[题目链接](https://leetcode-cn.com/problems/how-many-numbers-are-smaller-than-the-current-number/)

初次完成代码：

```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var smallerNumbersThanCurrent = function(nums) {
  let sorts = [...nums].sort((a, b) => {
    return a - b;
  });
  return nums.map(i => {
    return sorts.indexOf(i);
  });
};
```

## 2020-10-27 144.二叉树的前序遍历

144.二叉树的前序遍历

难度：中等

[题目链接](https://leetcode-cn.com/problems/binary-tree-preorder-traversal/)

初次完成代码：

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function(root) {
  let res = [];
  let getRes = root => {
    if (root) {
      res.push(root.val);
      getRes(root.left);
      getRes(root.right);
    }
  };
  getRes(root);
  return res;
};
```

题目提出进阶版为迭代算法，但因为我不会迭代，只能先查看题解学习。

## 2020-10-28 1207.独一无二的出现次数

1207.独一无二的出现次数

难度：简单

[题目链接](https://leetcode-cn.com/problems/unique-number-of-occurrences/)

初次完成代码：

```js
/**
 * @param {number[]} arr
 * @return {boolean}
 */
var uniqueOccurrences = function(arr) {
  let count = {};
  for (let i = 0; i < arr.length; i++) {
    if (count[arr[i]]) {
      count[arr[i]]++;
    } else {
      count[arr[i]] = 1;
    }
  }
  let set = new Set();
  let keys = Object.keys(count);
  for (let index = 0; index < keys.length; index++) {
    const item = keys[index];
    if (set.has(count[item])) {
      return false;
    } else {
      set.add(count[item]);
    }
  }
  return true;
};
```

## 2020-10-30 463.岛屿的周长

463.岛屿的周长

难度：简单

[题目链接](https://leetcode-cn.com/problems/island-perimeter/)

初次完成代码：

```js
/**
 * @param {number[][]} grid
 * @return {number}
 */
var islandPerimeter = function(grid) {
  let height = grid.length;
  let width = grid[0].length;
  let sum = 0;
  for (let index = 0; index < height; index++) {
    for (let indey = 0; indey < width; indey++) {
      let item = grid[index][indey];
      if (item) {
        if (index - 1 == -1 || !grid[index - 1][indey]) {
          sum++;
        }
        if (indey + 1 == width || !grid[index][indey + 1]) {
          sum++;
        }
        if (index + 1 == height || !grid[index + 1][indey]) {
          sum++;
        }
        if (indey - 1 == -1 || !grid[index][indey - 1]) {
          sum++;
        }
      }
    }
  }
  return sum;
};
```

## 2020-11-02 349.两个数组的交集

349.两个数组的交集

难度：简单

[题目链接](https://leetcode-cn.com/problems/intersection-of-two-arrays/)

初次完成代码：

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function(nums1, nums2) {
  let set = new Set();
  nums1.forEach(i => {
    if (nums2.indexOf(i) > -1 && !set.has(i)) {
      set.add(i);
    }
  });
  return Array.from(set);
};
```

## 2020-11-03 941.有效的山脉数组

941.有效的山脉数组

难度：简单

[题目链接](https://leetcode-cn.com/problems/valid-mountain-array/)

初次完成代码：

```js
/**
 * @param {number[]} A
 * @return {boolean}
 */
var validMountainArray = function(A) {
  if (A.length < 3) {
    return false;
  }
  let isUp = false;
  let isDown = false;
  for (let index = 1; index < A.length; index++) {
    if (!isDown && A[index] > A[index - 1]) {
      isUp = true;
      continue;
    } else if (isDown && isUp && A[index] < A[index - 1]) {
      continue;
    } else if (!isDown && isUp && A[index] < A[index - 1]) {
      isDown = true;
      continue;
    } else {
      return false;
    }
  }
  if (isUp && isDown) {
    return true;
  } else {
    return false;
  }
};
```

## 2021-03-20 150.逆波兰表达式求值

150.逆波兰表达式求值

难度：中等

[题目链接](https://leetcode-cn.com/problems/evaluate-reverse-polish-notation/)

初次完成代码：

```js
/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function(tokens) {
  let numbers = [];
  let operatorList = ["+", "-", "*", "/"];
  let tokensLen = tokens.length;
  for (let i = 0; i < tokensLen; i++) {
    if (operatorList.includes(tokens[i])) {
      let rightNumber = numbers.pop();
      let leftNumber = numbers.pop();
      numbers.push(
        calculate(Number(leftNumber), Number(rightNumber), tokens[i])
      );
    } else {
      numbers.push(tokens[i]);
    }
  }
  return numbers[0];
  function calculate(leftNumber, rightNumber, operator) {
    switch (operator) {
      case "+":
        return leftNumber + rightNumber;
      case "-":
        return leftNumber - rightNumber;
      case "*":
        return leftNumber * rightNumber;
      case "/":
        return parseInt(leftNumber / rightNumber);
    }
  }
};
```

## 2021-05-26 1190.反转每对括号间的子串

1190.反转每对括号间的子串

难度：中等

[题目链接](https://leetcode-cn.com/problems/reverse-substrings-between-each-pair-of-parentheses/)

初次完成代码：

```js
/**
 * @param {string} s
 * @return {string}
 */
var reverseParentheses = function(s) {
  let startPosStack = [];
  let str = s;
  let sLen = s.length;
  for (let i = 0; i < sLen; i++) {
    switch (s[i]) {
      case "(":
        startPosStack.push(i);
        break;
      case ")":
        let positon = startPosStack.pop();
        let preStr = str.substring(0, positon);
        let nextStr = str.substring(i);
        let curStr = str
          .substring(positon, i)
          .split("")
          .reverse()
          .join("");
        str = `${preStr}${curStr}${nextStr}`;
        break;
    }
  }
  return str.split(/[()]/g).join("");
};
```

## 2021-05-31 342.4 的幂

342.4 的幂

难度：简单

[题目链接](https://leetcode-cn.com/problems/power-of-four/)

初次完成代码：

```js
/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfFour = function(n) {
  return !(Math.pow(4, Math.round((n.toString(2).length - 1) / 2)) ^ n);
};
```

我的思路是算出 n 的二进制位数长度，然后算出是 4 的几次幂，计算出结果与 n 对比是否一致，一致则是 4 的幂。根据官方题解，有更简洁的思路，即先确定 n>0,然后通过(n&(n-1))===0 确定 n 的二进制是 1000...这种形式,然后通过(n&0xaaaaaaaa)===0 确定 n 的二进制是奇数长度，从而确定 n 是 4 的幂。

根据题解优化后代码：

```js
/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfFour = function(n) {
  return n > 0 && (n & (n - 1)) === 0 && (n & 0xaaaaaaaa) === 0;
};
```

## 2021-06-01 1744.你能在你最喜欢的那天吃到你最喜欢的糖果吗？

1744.你能在你最喜欢的那天吃到你最喜欢的糖果吗？

难度：中等

[题目链接](https://leetcode-cn.com/problems/can-you-eat-your-favorite-candy-on-your-favorite-day/)

初次完成代码：

```js
/**
 * @param {number[]} candiesCount
 * @param {number[][]} queries
 * @return {boolean[]}
 */
var canEat = function(candiesCount, queries) {
  let beforeFavTypeCountToFavType = new Map();
  // 每个问题求解
  return queries.map(i => {
    let beforeFavTypeCount; //距离吃到喜欢的糖需要吃多少个不喜欢的
    if (!i[0]) {
      return !(candiesCount[0] < i[1] + 1);
    } else if (beforeFavTypeCountToFavType.has(i[0])) {
      beforeFavTypeCount = beforeFavTypeCountToFavType.get(i[0]);
    } else {
      beforeFavTypeCount = 0;
      for (let idx = 1; idx <= i[0]; idx++) {
        if (beforeFavTypeCountToFavType.has(idx)) {
          beforeFavTypeCount = beforeFavTypeCountToFavType.get(idx);
        } else {
          beforeFavTypeCount += candiesCount[idx - 1];
          beforeFavTypeCountToFavType.set(idx, beforeFavTypeCount);
        }
      }
    }
    return !(
      beforeFavTypeCount >= i[2] * (i[1] + 1) ||
      beforeFavTypeCount + candiesCount[i[0]] < i[1] + 1
    );
  });
};
```

## 2021-06-02 523.连续的子数组和

523.连续的子数组和

难度：中等

[题目链接](https://leetcode-cn.com/problems/continuous-subarray-sum/)

初次完成代码：

平平无奇暴力遍历加和判断

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var checkSubarraySum = function(nums, k) {
  for (let i = 0; i < nums.length; i++) {
    let sum = nums[i];
    for (let j = i + 1; j < nums.length; j++) {
      sum += nums[j];
      if (!(sum % k)) return true;
    }
  }
  return false;
};
```

但是超出时长限制了，于是想到用减法减少运算量

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var checkSubarraySum = function(nums, k) {
  let sums = [];
  for (let i = 0; i < nums.length - 1; i++) {
    if (i) {
      for (let n = i; n < sums.length; n++) {
        sums[n] -= nums[i - 1];
        if (!(sums[n] % k)) return true;
      }
    } else {
      let sum = nums[i];
      for (let j = i + 1; j < nums.length; j++) {
        sum += nums[j];
        if (!(sum % k)) return true;
        sums[j - 1] = sum;
      }
    }
  }
  return false;
};
```

还是超出时间限制，于是学习题解思路，发现关键在于同余定理，通过这个定理可以省略很多计算步骤

::: tip 注意
同余定理：如果两个整数 m、n 满足 n-m 能被 k 整除，那么 n 和 m 对 k 同余
:::

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var checkSubarraySum = function(nums, k) {
  const numsLen = nums.length;
  if (numsLen < 2) {
    //数组少于2位，不满足题目要求直接返回false
    return false;
  }
  const map = new Map();
  map.set(0, -1); //之后出现0则证明前缀和被整除，所以需要加上首位数字
  let sum = 0;
  for (let i = 0; i < numsLen; i++) {
    sum = (sum + nums[i]) % k; //求前缀和余数
    if (map.has(sum)) {
      if (i - map.get(sum) >= 2) return true; //同余情况求两数位置是否大于等于2
    } else {
      map.set(sum, i);
    }
  }
  return false;
};
```

## 2021-06-03 525.连续数组

525.连续数组

难度：中等

[题目链接](https://leetcode-cn.com/problems/contiguous-array/)

初次完成代码：

没有想到解题思路，所以学习题解得出以下解

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxLength = function(nums) {
  let maxLength = 0;
  let map = new Map();
  let sum = 0;
  map.set(0, -1);
  const numsLen = nums.length;
  for (let i = 0; i < numsLen; i++) {
    nums[i] ? sum++ : sum--;
    if (map.has(sum)) {
      maxLength = Math.max(maxLength, i - map.get(sum));
    } else {
      map.set(sum, i);
    }
  }
  return maxLength;
};
```

思路是计算前缀和，1 就加一，0 就减一，然后把值与 index 存入 map，当前缀和在 map 中存在时，则证明上一次至此次之间的 0 和 1 的个数相等，和为 0，然后与已有长度取最大值。

## 2021-06-04 160.相交链表

160.相交链表

难度：简单

[题目链接](https://leetcode-cn.com/problems/intersection-of-two-linked-lists/)

初次完成代码：

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
  let map = new Map();
  while (headA) {
    if (!map.has(headA)) map.set(headA);
    headA = headA.next;
  }
  while (headB) {
    if (map.has(headB)) {
      return headB;
    }
    headB = headB.next;
  }
  return null;
};
```

没什么好思路，就是遍历链表 A，然后把每个节点存 map 里，然后遍历链表 B，判断 map 里已存在 B 的某个节点，证明在此处相交。然后参考题解学习双指针解法，得出以下解。

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
  let aPoint = headA;
  let bPoint = headB;
  if (headA === null || headB === null) {
    return null;
  }
  while (aPoint !== bPoint) {
    aPoint = aPoint ? aPoint.next : headB;
    bPoint = bPoint ? bPoint.next : headA;
  }
  return aPoint;
};
```

此处需要注意的是不能忽略 null 节点，如果判断 next 为 null 就接另一条链表，将无法判断出两个指针同时指向 null 的情况，即链表不想交的情况，然后会导致链表无限循环。

## 2021-06-05 203.移除链表元素

203.移除链表元素

难度：简单

[题目链接](https://leetcode-cn.com/problems/remove-linked-list-elements/)

初次完成代码：

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function(head, val) {
  let newHead, newPoint, point;
  if (!head) return head;
  point = head;
  while (point) {
    if (point.val !== val) {
      if (newHead) {
        newPoint.next = new ListNode(point.val);
        newPoint = newPoint.next;
      } else {
        newHead = new ListNode(point.val);
        newPoint = newHead;
      }
    }
    point = point.next;
  }
  return newHead || null;
};
```

## 2021-06-07 494.目标和

494.目标和

难度：中等

[题目链接](https://leetcode-cn.com/problems/target-sum/)

初次完成代码：

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays = function(nums, target) {
  let count = 0;
  findTarget(nums, 0);
  return count;

  function findTarget(subNums, subTarget) {
    let numsLen = subNums.length;
    if (numsLen) {
      let nextNums = subNums.slice(0, numsLen - 1);
      let nextTarget = subNums.slice(numsLen - 1)[0];
      findTarget(nextNums, subTarget + nextTarget);
      findTarget(nextNums, subTarget - nextTarget);
    } else {
      if (target == subTarget) {
        count++;
      }
    }
  }
};
```

然后发现重复切割数组对于时间的消耗非常大，于是优化此处代码，改为直接取原数组下标

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays = function(nums, target) {
  let count = 0;
  findTarget(nums.length - 1, 0);
  return count;

  function findTarget(index, subTarget) {
    if (index >= 0) {
      findTarget(index - 1, subTarget + nums[index]);
      findTarget(index - 1, subTarget - nums[index]);
    } else {
      if (target == subTarget) {
        count++;
      }
    }
  }
};
```

<Valine></Valine>
