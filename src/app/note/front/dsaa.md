# 数据结构与算法

## 数据结构

### 栈

```js
function Stack() {
  var items = [];
  //添加一个（或几个）新元素到栈顶
  this.push = function(element) {
    items.push(element);
  };
  //移除栈顶的元素，同时返回被移除元素
  this.pop = function() {
    return items.pop();
  };
  //返回栈顶的元素，但并不对栈做任何修改
  this.peek = function() {
    return items[items.length - 1];
  };
  //如果栈内没有任何元素就返回true，否则返回false
  this.isEmpty = function() {
    return items.length == 0;
  };
  //返回栈里的元素个数
  this.size = function() {
    return items.length;
  };
  //移除栈里的所有元素
  this.clear = function() {
    items = [];
  };
  //打印
  this.print = function() {
    console.log(items.toString());
  };
  this.toString = function() {
    return items.toString();
  };
}
```

### 队列

```js
function Queue() {
  var items = [];
  //向队列尾部添加一个（或是多个）元素
  this.enqueue = function(element) {
    items.push(element);
  };
  //移除队列的第一个元素，并返回被移除的元素
  this.dequeue = function() {
    return items.shift();
  };
  //返回队列的第一个元素——最先被添加的,也将是最先被移除的元素。队列不做任何变动。（不移除元素，只返回元素信息。与stack的peek方法类似）
  this.front = function() {
    return items[0];
  };
  //如果队列内没有任何元素就返回true，否则返回false
  this.isEmpty = function() {
    return items.length == 0;
  };
  //移除队列里的所有元素
  this.clear = function() {
    items = [];
  };
  //返回队列里的元素个数
  this.size = function() {
    return items.length;
  };
  //打印
  this.print = function() {
    console.log(items.toString());
  };
}
```

### 链表

#### 单向链表

```js
function LinkedList() {
  var Node = function(element) {
    this.element = element;
    this.next = null;
  };
  var length = 0; //链表长度
  var head = null; //第一个节点
  this.append = function(element) {
    var node = new Node(element),
      current;
    if (head === null) {
      //列表为空
      head = node;
    } else {
      //列表不为空
      current = head; //现在只知道第一项head
      while (current.next) {
        //找到列表的最后一项
        current = current.next;
      }
      //建立链接
      current.next = node;
    }
    length++; //更新列表长度
  };
  this.insert = function(position, element) {
    //检查越界值
    if (position >= 0 && position <= length) {
      var node = new Node(element),
        current = head,
        previous,
        index = 0;
      if (position === 0) {
        //在第一个位置添加
        node.next = current;
        head = node;
      } else {
        //在中间或者尾部添加
        while (index++ < position) {
          previous = current;
          current = current.next;
        }
        node.next = current; //先连上添加的节点
        previous.next = node; //再断开之前的连接
      }
      length++;
      return true;
    } else {
      return false;
    }
  };
  this.removeAt = function(position) {
    if (position > -1 && position < length) {
      var current = head,
        previous,
        index = 0; //用来迭代列表，直到到达目标位置
      if (position === 0) {
        //移除第一项
        head = current.next;
      } else {
        //移除中间或者尾部最后一项
        while (index++ < position) {
          previous = current;
          current = current.next;
        }
        //连接前一项和后一项，跳过当前的项，相当于移除了当前项
        previous.next = current.next;
      }
      length--;
      return current.element;
    } else {
      return null;
    }
  };
  this.remove = function(element) {
    var index = this.indexOf(element);
    return this.removeAt(index);
  };
  this.indexOf = function(element) {
    var current = head,
      index = 0;
    while (current) {
      if (element === current.element) {
        return index;
      }
      index++; //记录位置
      current = current.next;
    }
    return -1;
  };
  this.isEmpty = function() {
    return length === 0;
  };
  this.size = function() {
    return length;
  };
  this.getHead = function() {
    return head;
  };
  this.toString = function() {
    var current = head,
      string = "";
    while (current) {
      string += current.element; //拼接
      current = current.next;
    }
    return string;
  };
  this.print = function() {
    console.log(this.toString());
  };
}
```

#### 双向链表

```js
function DoublyLinkedList() {
  var Node = function(element) {
    this.element = element;
    this.next = null;
    this.prev = null; //新添加的
  };
  var length = 0;
  var head = null;
  var tail = null; //新添加的
  this.append = function(element) {
    var node = new Node(element),
      current;
    if (head === null) {
      //列表为空
      head = node;
      tail = node;
    } else {
      tail.next = node;
      node.prev = tail;
      tail = node;
    }
    length++;
  };
  this.insert = function(position, element) {
    if (position >= 0 && position <= length) {
      var node = new Node(element),
        current = head,
        previous,
        index = 0;
      if (position === 0) {
        //在第一个位置
        if (!head) {
          //列表为空
          head = node;
          tail = node;
        } else {
          //列表不为空
          node.next = current;
          current.prev = node;
          head = node;
        }
      } else if (position === length) {
        //最后一项
        current = tail;
        current.next = node;
        node.prev = current;
        tail = node;
      } else {
        while (index++ < position) {
          previous = current;
          current = current.next;
        }
        node.next = current;
        previous.next = node; //把node节点连接进去前一个节点和后一个节点

        current.prev = node; //断掉之前previous和current的连接
        node.prev = previous; //prev同样需要连接
      }
      length++;
      return true;
    } else {
      return false;
    }
  };
  this.removeAt = function(position) {
    if (position > -1 && position < length) {
      var current = head,
        previous,
        index = 0;
      if (position === 0) {
        //移除第一项
        head = current.next;
        if (length === 1) {
          // 列表只有一项
          tail = null;
        } else {
          head.prev = null;
        }
      } else if (position === length - 1) {
        移除最后一项;
        current = tail; // {4}
        tail = current.prev;
        tail.next = null;
      } else {
        while (index++ < position) {
          previous = current;
          current = current.next;
        }
        previous.next = current.next; // 链接前一项和后一项，跳过当前项
        current.next.prev = previous; //修复prev
      }
      length--;
      return current.element;
    } else {
      return null;
    }
  };
  this.remove = function(element) {
    var index = this.indexOf(element);
    return this.removeAt(index);
  };
  this.indexOf = function(element) {
    var current = head,
      index = -1;
    //检查第一项
    if (element == current.element) {
      return 0;
    }
    index++;
    //检查中间项
    while (current.next) {
      if (element == current.element) {
        return index;
      }
      current = current.next;
      index++;
    }
    //检查最后一项
    if (element == current.element) {
      return index;
    }
    return -1;
  };
  this.isEmpty = function() {
    return length === 0;
  };
  this.size = function() {
    return length;
  };
  this.toString = function() {
    var current = head,
      s = current ? current.element : "";
    while (current && current.next) {
      current = current.next;
      s += ", " + current.element;
    }
    return s;
  };
  this.inverseToString = function() {
    var current = tail,
      s = current ? current.element : "";
    while (current && current.prev) {
      current = current.prev;
      s += ", " + current.element;
    }
    return s;
  };
  this.print = function() {
    console.log(this.toString());
  };
  this.printInverse = function() {
    console.log(this.inverseToString());
  };
  this.getHead = function() {
    return head;
  };
  this.getTail = function() {
    return tail;
  };
}
```

#### 循环链表

```js
function CircularLinkedList() {
  var Node = function(element) {
    this.element = element;
    this.next = null;
  };
  var length = 0;
  var head = null;
  this.append = function(element) {
    var node = new Node(element),
      current;
    if (head === null) {
      //列表为空
      head = node;
    } else {
      current = head;
      while (current.next !== head) {
        //最后一个元素将是head，而不是null
        current = current.next;
      }
      current.next = node; //建立连接
    }
    node.next = head; //首尾相连起来变成一个环列表
    length++;
  };
  this.insert = function(position, element) {
    if (position >= 0 && position <= length) {
      var node = new Node(element),
        current = head,
        previous,
        index = 0;
      if (position === 0) {
        //在第一项
        node.next = current;
        while (current.next !== head) {
          current = current.next;
        }
        head = node;
        current.next = head;
      } else {
        while (index++ < position) {
          previous = current;
          current = current.next;
        }
        node.next = current;
        previous.next = node;
        if (node.next === null) {
          //在最后一个元素更新
          node.next = head;
        }
      }
      length++;
      return true;
    } else {
      return false;
    }
  };
  this.removeAt = function(position) {
    if (position > -1 && position < length) {
      var current = head,
        previous,
        index = 0;
      if (position === 0) {
        while (current.next !== head) {
          current = current.next;
        }
        head = head.next;
        current.next = head; //更新最后一项
      } else {
        while (index++ < position) {
          previous = current;
          current = current.next;
        }
        previous.next = current.next;
      }
      length--;
      return current.element;
    } else {
      return null;
    }
  };
  this.remove = function(element) {
    var index = this.indexOf(element);
    return this.removeAt(index);
  };
  this.indexOf = function(element) {
    var current = head,
      index = -1;
    if (element == current.element) {
      //检查第一项
      return 0;
    }
    index++;
    while (current.next !== head) {
      //检查列表中间
      if (element == current.element) {
        return index;
      }
      current = current.next;
      index++;
    }
    if (element == current.element) {
      //检查最后一项
      return index;
    }
    return -1;
  };
  this.isEmpty = function() {
    return length === 0;
  };
  this.size = function() {
    return length;
  };
  this.getHead = function() {
    return head;
  };
  this.toString = function() {
    var current = head,
      s = current.element;
    while (current.next !== head) {
      current = current.next;
      s += ", " + current.element;
    }
    return s.toString();
  };
  this.print = function() {
    console.log(this.toString());
  };
}
```

<Valine></Valine>
