# 从 estree 和 babel 中学习 js 的 AST

## 资料准备

[Mozilla 的 estree 社区规范](https://github.com/estree/estree)
[@babel/parser](https://github.com/babel/babel/tree/master/packages/babel-parser)

## 使用 babel-parser 转化源代码为 AST 示例

被转换的源代码文件 parcode.js:

```js
var a = 1;
var b = 2;

function add(a, b) {
  return a + b;
}

var sum = add(a, b);

console.log(sum);
```

转化源代码至 AST 的程序 genast.js:

```js
var { parse } = require("@babel/parser");
var fs = require("fs");

fs.readFile("./parcode.js", "utf-8", (err, data) => {
  if (err) {
    throw err;
  }
  var res = parse(data);
  fs.writeFile("./ast.json", JSON.stringify(res), "utf-8", function(err) {
    if (err) {
      throw err;
    }
  });
});
```

转化后生成的 AST 文件 ast.json:

```json
{
  "type": "File",
  "start": 0,
  "end": 113,
  "loc": {
    "start": { "line": 1, "column": 0 },
    "end": { "line": 11, "column": 0 }
  },
  "errors": [],
  "program": {
    "type": "Program",
    "start": 0,
    "end": 113,
    "loc": {
      "start": { "line": 1, "column": 0 },
      "end": { "line": 11, "column": 0 }
    },
    "sourceType": "script",
    "interpreter": null,
    "body": [
      {
        "type": "VariableDeclaration",
        "start": 0,
        "end": 10,
        "loc": {
          "start": { "line": 1, "column": 0 },
          "end": { "line": 1, "column": 10 }
        },
        "declarations": [
          {
            "type": "VariableDeclarator",
            "start": 4,
            "end": 9,
            "loc": {
              "start": { "line": 1, "column": 4 },
              "end": { "line": 1, "column": 9 }
            },
            "id": {
              "type": "Identifier",
              "start": 4,
              "end": 5,
              "loc": {
                "start": { "line": 1, "column": 4 },
                "end": { "line": 1, "column": 5 },
                "identifierName": "a"
              },
              "name": "a"
            },
            "init": {
              "type": "NumericLiteral",
              "start": 8,
              "end": 9,
              "loc": {
                "start": { "line": 1, "column": 8 },
                "end": { "line": 1, "column": 9 }
              },
              "extra": { "rawValue": 1, "raw": "1" },
              "value": 1
            }
          }
        ],
        "kind": "var"
      },
      {
        "type": "VariableDeclaration",
        "start": 12,
        "end": 22,
        "loc": {
          "start": { "line": 2, "column": 0 },
          "end": { "line": 2, "column": 10 }
        },
        "declarations": [
          {
            "type": "VariableDeclarator",
            "start": 16,
            "end": 21,
            "loc": {
              "start": { "line": 2, "column": 4 },
              "end": { "line": 2, "column": 9 }
            },
            "id": {
              "type": "Identifier",
              "start": 16,
              "end": 17,
              "loc": {
                "start": { "line": 2, "column": 4 },
                "end": { "line": 2, "column": 5 },
                "identifierName": "b"
              },
              "name": "b"
            },
            "init": {
              "type": "NumericLiteral",
              "start": 20,
              "end": 21,
              "loc": {
                "start": { "line": 2, "column": 8 },
                "end": { "line": 2, "column": 9 }
              },
              "extra": { "rawValue": 2, "raw": "2" },
              "value": 2
            }
          }
        ],
        "kind": "var"
      },
      {
        "type": "FunctionDeclaration",
        "start": 26,
        "end": 66,
        "loc": {
          "start": { "line": 4, "column": 0 },
          "end": { "line": 6, "column": 1 }
        },
        "id": {
          "type": "Identifier",
          "start": 35,
          "end": 38,
          "loc": {
            "start": { "line": 4, "column": 9 },
            "end": { "line": 4, "column": 12 },
            "identifierName": "add"
          },
          "name": "add"
        },
        "generator": false,
        "async": false,
        "params": [
          {
            "type": "Identifier",
            "start": 39,
            "end": 40,
            "loc": {
              "start": { "line": 4, "column": 13 },
              "end": { "line": 4, "column": 14 },
              "identifierName": "a"
            },
            "name": "a"
          },
          {
            "type": "Identifier",
            "start": 42,
            "end": 43,
            "loc": {
              "start": { "line": 4, "column": 16 },
              "end": { "line": 4, "column": 17 },
              "identifierName": "b"
            },
            "name": "b"
          }
        ],
        "body": {
          "type": "BlockStatement",
          "start": 45,
          "end": 66,
          "loc": {
            "start": { "line": 4, "column": 19 },
            "end": { "line": 6, "column": 1 }
          },
          "body": [
            {
              "type": "ReturnStatement",
              "start": 50,
              "end": 63,
              "loc": {
                "start": { "line": 5, "column": 2 },
                "end": { "line": 5, "column": 15 }
              },
              "argument": {
                "type": "BinaryExpression",
                "start": 57,
                "end": 62,
                "loc": {
                  "start": { "line": 5, "column": 9 },
                  "end": { "line": 5, "column": 14 }
                },
                "left": {
                  "type": "Identifier",
                  "start": 57,
                  "end": 58,
                  "loc": {
                    "start": { "line": 5, "column": 9 },
                    "end": { "line": 5, "column": 10 },
                    "identifierName": "a"
                  },
                  "name": "a"
                },
                "operator": "+",
                "right": {
                  "type": "Identifier",
                  "start": 61,
                  "end": 62,
                  "loc": {
                    "start": { "line": 5, "column": 13 },
                    "end": { "line": 5, "column": 14 },
                    "identifierName": "b"
                  },
                  "name": "b"
                }
              }
            }
          ],
          "directives": []
        }
      },
      {
        "type": "VariableDeclaration",
        "start": 70,
        "end": 90,
        "loc": {
          "start": { "line": 8, "column": 0 },
          "end": { "line": 8, "column": 20 }
        },
        "declarations": [
          {
            "type": "VariableDeclarator",
            "start": 74,
            "end": 89,
            "loc": {
              "start": { "line": 8, "column": 4 },
              "end": { "line": 8, "column": 19 }
            },
            "id": {
              "type": "Identifier",
              "start": 74,
              "end": 77,
              "loc": {
                "start": { "line": 8, "column": 4 },
                "end": { "line": 8, "column": 7 },
                "identifierName": "sum"
              },
              "name": "sum"
            },
            "init": {
              "type": "CallExpression",
              "start": 80,
              "end": 89,
              "loc": {
                "start": { "line": 8, "column": 10 },
                "end": { "line": 8, "column": 19 }
              },
              "callee": {
                "type": "Identifier",
                "start": 80,
                "end": 83,
                "loc": {
                  "start": { "line": 8, "column": 10 },
                  "end": { "line": 8, "column": 13 },
                  "identifierName": "add"
                },
                "name": "add"
              },
              "arguments": [
                {
                  "type": "Identifier",
                  "start": 84,
                  "end": 85,
                  "loc": {
                    "start": { "line": 8, "column": 14 },
                    "end": { "line": 8, "column": 15 },
                    "identifierName": "a"
                  },
                  "name": "a"
                },
                {
                  "type": "Identifier",
                  "start": 87,
                  "end": 88,
                  "loc": {
                    "start": { "line": 8, "column": 17 },
                    "end": { "line": 8, "column": 18 },
                    "identifierName": "b"
                  },
                  "name": "b"
                }
              ]
            }
          }
        ],
        "kind": "var"
      },
      {
        "type": "ExpressionStatement",
        "start": 94,
        "end": 111,
        "loc": {
          "start": { "line": 10, "column": 0 },
          "end": { "line": 10, "column": 17 }
        },
        "expression": {
          "type": "CallExpression",
          "start": 94,
          "end": 110,
          "loc": {
            "start": { "line": 10, "column": 0 },
            "end": { "line": 10, "column": 16 }
          },
          "callee": {
            "type": "MemberExpression",
            "start": 94,
            "end": 105,
            "loc": {
              "start": { "line": 10, "column": 0 },
              "end": { "line": 10, "column": 11 }
            },
            "object": {
              "type": "Identifier",
              "start": 94,
              "end": 101,
              "loc": {
                "start": { "line": 10, "column": 0 },
                "end": { "line": 10, "column": 7 },
                "identifierName": "console"
              },
              "name": "console"
            },
            "property": {
              "type": "Identifier",
              "start": 102,
              "end": 105,
              "loc": {
                "start": { "line": 10, "column": 8 },
                "end": { "line": 10, "column": 11 },
                "identifierName": "log"
              },
              "name": "log"
            },
            "computed": false
          },
          "arguments": [
            {
              "type": "Identifier",
              "start": 106,
              "end": 109,
              "loc": {
                "start": { "line": 10, "column": 12 },
                "end": { "line": 10, "column": 15 },
                "identifierName": "sum"
              },
              "name": "sum"
            }
          ]
        }
      }
    ],
    "directives": []
  },
  "comments": []
}
```

## 使用 babel-generator 转化 AST 为源代码示例

解析 AST 生成源代码的程序 parast.js:

```js
var generate = require("@babel/generator").default;
var fs = require("fs");

fs.readFile("./ast.json", "utf-8", (err, data) => {
  if (err) {
    throw err;
  }
  var res = generate(JSON.parse(data)).code;
  fs.writeFile("./gencode.js", res, "utf-8", function(err) {
    if (err) {
      throw err;
    }
  });
});
```

生成后的源代码文件 gencode.js:

```js
var a = 1;
var b = 2;

function add(a, b) {
  return a + b;
}

var sum = add(a, b);
console.log(sum);
```

此处 console 前应有一个空行，暂时不知空行消失的原因

### estree 规范解析

以下是 estree 在 es5 中的节点类型：

- [Node objects(节点对象)](#node-objects)
- [Identifier(识别)](#identifier)
- [Literal(文字)](#literal)
  - [RegExpLiteral(正则表达式)](#regexpliteral)
- [Programs(程序)](#programs)
- [Functions(函数)](#functions)
- [Statements(声明)](#statements)
  - [ExpressionStatement(表达声明)](#expressionstatement)
  - [BlockStatement(块)](#blockstatement)
  - [EmptyStatement(Empty)](#emptystatement)
  - [DebuggerStatement(Debug)](#debuggerstatement)
  - [WithStatement(与声明)](#withstatement)
  - [Control flow(控制流)](#control-flow)
    - [ReturnStatement(return)](#returnstatement)
    - [LabeledStatement(标签声明)](#labeledstatement)
    - [BreakStatement(break)](#breakstatement)
    - [ContinueStatement(continue)](#continuestatement)
  - [Choice(判断)](#choice)
    - [IfStatement(if)](#ifstatement)
    - [SwitchStatement(switch)](#switchstatement)
      - [SwitchCase(case)](#switchcase)
  - [Exceptions(异常)](#exceptions)
    - [ThrowStatement(throw)](#throwstatement)
    - [TryStatement(try)](#trystatement)
      - [CatchClause(catch)](#catchclause)
  - [Loops(循环)](#loops)
    - [WhileStatement(while)](#whilestatement)
    - [DoWhileStatement(dowhile)](#dowhilestatement)
    - [ForStatement(for)](#forstatement)
    - [ForInStatement(forin)](#forinstatement)
- [Declarations(声明)](#declarations)
  - [FunctionDeclaration(方法声明)](#functiondeclaration)
  - [VariableDeclaration(变量声明)](#variabledeclaration)
    - [VariableDeclarator(变量声明器)](#variabledeclarator)
- [Expressions(表达式)](#expressions)
  - [ThisExpression(this)](#thisexpression)
  - [ArrayExpression(Array)](#arrayexpression)
  - [ObjectExpression(Object)](#objectexpression)
    - [Property(属性)](#property)
  - [FunctionExpression(方法表达式)](#functionexpression)
  - [Unary operations(一元运算)](#unary-operations)
    - [UnaryExpression(一元表达式)](#unaryexpression)
      - [UnaryOperator(一元运算符)](#unaryoperator)
    - [UpdateExpression(更新表达式)](#updateexpression)
      - [UpdateOperator(更新运算符)](#updateoperator)
  - [Binary operations(二元运算)](#binary-operations)
    - [BinaryExpression(二元表达式)](#binaryexpression)
      - [BinaryOperator(二元运算符)](#binaryoperator)
    - [AssignmentExpression(分配表达式)](#assignmentexpression)
      - [AssignmentOperator(分配运算符)](#assignmentoperator)
    - [LogicalExpression(逻辑表达式)](#logicalexpression)
      - [LogicalOperator(逻辑运算符)](#logicaloperator)
    - [MemberExpression(成员表达式)](#memberexpression)
  - [ConditionalExpression(条件表达式)](#conditionalexpression)
  - [CallExpression(call)](#callexpression)
  - [NewExpression(new)](#newexpression)
  - [SequenceExpression(序列表达式)](#sequenceexpression)
- [Patterns(模式)](#patterns)

节点在 AST 中的表示接口为:

```js
interface Node {
  type: string;
  loc: SourceLocation | null;
}
```

### babel 规范解析

<Valine></Valine>
