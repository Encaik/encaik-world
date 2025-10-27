# 在 Ng-alain 中使用代码模板生成

## **ng generate** 命令的使用

Angular CLI 中有 ng generate 命令可以通过 Schematics 生成代码模板，中文文档中有 Angular 自带生成命令。

[https://angular.cn/cli/generate](https://angular.cn/cli/generate)

除了默认模板，Angular 还支持第三方自定义模板，比如 ng-alain 实现的自定义模板。通过使用命令 ng g ng-alain:xxx 来使用 ng-alain 的模板。

Angular 将通过在 node_modules 中寻找冒号前面的同名库，即 ng-alain 库，查找库中的 schematics 文件夹，然后读取文件夹内的 collection.json 文件，在文件中找到要生成的 xxx 模板，然后执行模板文件夹下的 factory 函数生成代码模板。详细内容可以查阅 schematic 相关文档。

![image.png](https://cdn.nlark.com/yuque/0/2023/png/653410/1673941029232-4bd086ca-e1b0-455b-af62-fdbe794cc051.png#averageHue=%231f2329&clientId=u441a7c51-44a6-4&from=paste&height=512&id=u681d8db7&name=image.png&originHeight=512&originWidth=360&originalType=binary&ratio=1&rotation=0&showTitle=false&size=16970&status=done&style=none&taskId=uacde731a-7dbb-48b6-b577-5b6f45fd6d8&title=&width=360)

![image.png](https://cdn.nlark.com/yuque/0/2023/png/653410/1673940732734-d7f97031-258d-48ec-b285-c67f61467177.png#averageHue=%2320252b&clientId=u441a7c51-44a6-4&from=paste&height=201&id=u5c9cb328&name=image.png&originHeight=201&originWidth=289&originalType=binary&ratio=1&rotation=0&showTitle=false&size=7189&status=done&style=none&taskId=ube765b9d-9e7a-46e9-940d-bef055d5566&title=&width=289)

[https://angular.cn/guide/schematics-authoring](https://angular.cn/guide/schematics-authoring)

## ng g ng-alain:xxx 命令的使用

ng-alain 框架中命令的使用，文档中比较全面，可以直接查阅文档使用。
[https://ng-alain.com/cli/generate/zh](https://ng-alain.com/cli/generate/zh)
ng-alain 的自定义模板，tpl 类型模板的 json 定义：

```javascript
{
  "$schema": "http://json-schema.org/draft-07/schema",
  "$id": "SchematicsNgAlainTplComponent",
  "title": "Ng Alain Tpl Options Schema",
  "type": "object",
  "additionalProperties": true,
  "properties": {
    "path": {
      "type": "string",
      "format": "path",
      "description": "The path at which to create the component file, relative to the current workspace. Default is a folder with the same name as the component in the project root.",
      "visible": false
    },
    "project": {
      "type": "string",
      "description": "The name of the project.",
      "$default": {
        "$source": "projectName"
      }
    },
    "name": {
      "type": "string",
      "description": "The name of the component.",
      "$default": {
        "$source": "argv",
        "index": 1
      },
      "x-prompt": "What name would you like to use for the component?"
    },
    "displayBlock": {
      "description": "Specifies if the style will contain `:host { display: block; }`.",
      "type": "boolean",
      "default": false,
      "alias": "b"
    },
    "inlineStyle": {
      "description": "Include styles inline in the component.ts file. Only CSS styles can be included inline. By default, an external styles file is created and referenced in the component.ts file.",
      "type": "boolean",
      "default": false,
      "alias": "s",
      "x-user-analytics": 9
    },
    "inlineTemplate": {
      "description": "Include template inline in the component.ts file. By default, an external template file is created and referenced in the component.ts file.",
      "type": "boolean",
      "default": false,
      "x-user-analytics": 10
    },
    "viewEncapsulation": {
      "description": "The view encapsulation strategy to use in the new component.",
      "enum": ["Emulated", "None", "ShadowDom"],
      "type": "string",
      "alias": "v",
      "x-user-analytics": 11
    },
    "changeDetection": {
      "description": "The change detection strategy to use in the new component.",
      "enum": ["Default", "OnPush"],
      "type": "string",
      "default": "Default",
      "alias": "c"
    },
    "prefix": {
      "type": "string",
      "description": "The prefix to apply to the generated component selector.",
      "alias": "p",
      "oneOf": [
        {
          "maxLength": 0
        },
        {
          "minLength": 1,
          "format": "html-selector"
        }
      ]
    },
    "style": {
      "description": "The file extension or preprocessor to use for style files, or 'none' to skip generating the style file.",
      "type": "string",
      "default": "css",
      "enum": ["css", "scss", "sass", "less", "none"],
      "x-user-analytics": 5
    },
    "type": {
      "type": "string",
      "description": "Adds a developer-defined type to the filename, in the format \"name.type.ts\".",
      "default": "Component"
    },
    "skipTests": {
      "type": "boolean",
      "description": "Do not create \"spec.ts\" test files for the new component.",
      "default": false,
      "x-user-analytics": 12
    },
    "flat": {
      "type": "boolean",
      "description": "Create the new files at the top level of the current project.",
      "default": false
    },
    "skipImport": {
      "type": "boolean",
      "description": "Do not import this component into the owning NgModule.",
      "default": false,
      "x-user-analytics": 18
    },
    "selector": {
      "type": "string",
      "format": "html-selector",
      "description": "The HTML selector to use for this component."
    },
    "skipSelector": {
      "type": "boolean",
      "default": false,
      "description": "Specifies if the component should have a selector or not."
    },
    "export": {
      "type": "boolean",
      "default": false,
      "description": "The declaring NgModule exports this component.",
      "x-user-analytics": 19
    },
    "withoutPrefix": {
      "type": "boolean",
      "description": "指定选择器名不加前缀 (Without prefix to selectors)",
      "default": false
    },
    "withoutModulePrefixInComponentName": {
      "type": "boolean",
      "description": "组件名不加模块名前缀 (Without prefix to component name)",
      "default": false
    },
    "module": {
      "type": "string",
      "description": "Allows specification of the declaring module.",
      "alias": "m",
      "x-prompt": "Specify which module name:"
    },
    "tplName": {
      "type": "string",
      "description": "指定模板名称 (Specifies template name)",
      "$default": {
        "$source": "argv",
        "index": 0
      },
      "x-prompt": "What template name would you like to use for the component:"
    },
    "target": {
      "type": "string",
      "description": "指定目标路径，支持 `bus/list` 写法 (Specifies relative path, could be set like `bus/list`.)",
      "alias": "t"
    },
    "modal": {
      "type": "boolean",
      "default": true,
      "description": "指定是否使用模态框 (Specifies using modal mode)",
      "x-prompt": "Would you like to modal mode?"
    }
  },
  "required": ["tplName", "name", "module", "modal"]
}

```

## wayboot 中的自定义模板编写

以该模板为例，需要在\_cli-tpl 文件夹中创建模板文件夹，如该模板名为 basic，文件夹中的内容为固定格式，双下划线开头结尾的部分均为占位符。

最里层的各种文件可随意添加，如自行添加的 model.ts.template 文件。

![image.png](https://cdn.nlark.com/yuque/0/2023/png/653410/1673318138869-de845184-85e7-4061-9725-c1a8602a37e2.png#averageHue=%2320252c&clientId=u849626f2-c0ed-4&from=paste&height=181&id=u19c3564f&name=image.png&originHeight=181&originWidth=423&originalType=binary&ratio=1&rotation=0&showTitle=false&size=11470&status=done&style=none&taskId=u4ced2289-fabb-4394-92a6-20455513091&title=&width=423)

\_cli-tpl 中有一个\_fix.js 文件，当执行生成命令时，会将参数传至该文件进行处理后再生成，所以这里可以对输入参数做一些处理。

```javascript
/**
 * 自定义模板生成中间处理模块
 * 语雀文档：https://www.yuque.com/zhaoyj/cixlru/gz4p5dcg4y734sd6
 */
const path = require("path");
const process = require("child_process");
const CONFIG_DIR_PATH = "../_tpl_config";
const { getStOptionTpl, getSfOptionTpl } = require(path.join(
  __dirname,
  CONFIG_DIR_PATH,
  "/common.js"
));

function fix(options) {
  return new Promise(resolve => {
    // 获取模板参数与组件名参数
    const configName = options.extraArgs.config;
    const tplName = options.tplName;
    //如果有传入模板参数则进入参数处理，否则直接生成
    if (configName) {
      //获取传入配置文件路径
      const configPath = path.join(
        __dirname,
        CONFIG_DIR_PATH,
        `/${configName}.js`
      );
      //如果是页面生成则在处理完参数后，自动再执行form弹窗生成命令
      if (tplName === "basic" || tplName === "basic-tree") {
        const { search, st, api, model, layout } = require(configPath);
        options.extraArgs = {
          ...options.extraArgs,
          dtoName: classify(configName),
          Model: modelParse(model),
          searchSchema: sfParse(search),
          columns: stParse(st, options.name),
          api: apiParse(api, model),
          layout
        };
        (function() {
          const cmd = `ng g ng-alain:tpl form form -m=${options.module} --target=${options.name} --modal=true --config=${configName}`;
          console.log(cmd);
          process.exec(cmd, (error, stdout, stderr) => {
            console.log(stdout);
            if (!error) {
              console.log(stdout);
            } else {
              console.log(error, stderr);
            }
          });
        })();
        // 如果是弹窗生成，处理参数后生成即可
      } else if (tplName === "form") {
        const { sf, api } = require(configPath);
        options.extraArgs.schema = sfParse(sf);
        options.extraArgs.api = api;
      }
    }
    resolve();
  });
}

/**
 * sf配置解析，用于解析搜索栏及弹窗用到的sf配置
 * @param {*} config 配置参数
 * @returns 转换后sf格式参数
 */
function sfParse(config) {
  let schema = [];
  config.map(item => {
    schema.push(getSfOptionTpl(item.type, item));
  });
  return schema.join(",\n      ");
}

/**
 * st配置解析，用于解析页面上列表的列及操作项
 * @param {*} config 配置参数
 * @param {*} componentName 命令行组件名（烤串格式）
 * @returns 转换后st格式参数
 */
function stParse(config, componentName) {
  let columns = [`{ title: '序号', type: 'no' }`];
  let buttons = [];
  config.columns.map(column => {
    let columnStr = `title: "${column.title}",
      index: "${column.index}"`;
    if (column.type) {
      columnStr += `,
      type: "${column.type}"`;
    }
    columns.push(`{
      ${columnStr}
    }`);
  });
  config.options.map(option => {
    buttons.push(
      option.tpl
        ? getStOptionTpl(option.tpl, { componentName: classify(componentName) })
        : JSON.stringify(option)
    );
  });
  columns.push(`{
    title: '操作',
    width: 250,
    buttons: [
      ${buttons.join(",\n")}
    ]
  }`);
  return columns.join(",\n");
}

/**
 * 类型定义文件解析，用于解析需要定义的类型
 * @param {*} config 配置参数
 * @returns 转换后model.ts文件内容
 */
function modelParse(config) {
  let modelConfig = [];
  Object.keys(config).forEach(key1 => {
    let tempArr = [];
    config[key1].list.forEach(item => {
      tempArr.push(`${item.index}: ${item.type}; // ${item.title}`);
    });
    modelConfig.push(
      `// ${config[key1].title}
export interface ${key1} {
  ${tempArr.map(item => item).join("\n  ")}
}` + "\n"
    );
  });
  return modelConfig.map(item => item.replace(/,/g, "")).join("\n");
}

/**
 *  api 解析生成对应的 service和找到相关的引用类型
 * @param {*} api  api 参数
 * @param {*} model 配置参数
 * @returns newapi 转换后api项
 */
function apiParse(api, model) {
  api = api ? api : {};
  let newapi = {};
  let importModel = [];
  Object.keys(api).forEach(item => {
    if (typeof api[item] == "string") {
      newapi[item] = api[item];
    } else if (typeof api[item] == "object") {
      newapi[item] = api[item].url;
      newapi[item + "ReqModel"] = api[item]?.reqModel
        ? api[item]?.reqModel
        : "any";
    } else {
      newapi[item] = api[item];
    }
  });
  Object.keys(model).forEach(item => {
    importModel.push(item);
  });
  importModel = importModel.join();
  newapi.importModel = importModel;
  return newapi;
}

/**
 * 用于将烤串命名转换为双驼峰命名
 * @param {*} str 待转换字符串
 * @returns 转换后字符串
 */
function classify(str) {
  return str.replace(/(^|-)(\w)/g, ($0, $1, $2) => {
    return $2.toUpperCase();
  });
}

module.exports = {
  fix
};
```

在编写模板时，经常会有一些，下划线开头结尾的字符串，这些是 ng-alain 定义的占位符，在生成模板时会替换成对应的变量。

| 类型 | 参数名          | 默认    | 描述                                     |
| ---- | --------------- | ------- | ---------------------------------------- |
| 变量 | project         | -       | 项目名                                   |
|      | name            | -       | 名称，相当于命令行的 <name>              |
|      | path            | -       | 目标路径                                 |
|      | flat            | false   | 文件是否扁平结构                         |
|      | inlineTemplate  | false   | 是否内联模板（固定值：false）            |
|      | selector        | -       | 组件 selector                            |
|      | componentName   | -       | 组件名称                                 |
|      | changeDetection | Default | 组件 changeDetection 值                  |
|      | modal           | -       | 是否使用 Modal 展示                      |
| 方法 | decamelize      | -       | 将字母串转换为由下划线分隔的所有小写字母 |
|      | dasherize       | -       | 将空格或下划线用破折号替换               |
|      | camelize        | -       | 返回字符串的小骆驼拼写法形式             |
|      | classify        | -       | 返回字符串的大骆驼拼写法形式             |
|      | underscore      | -       | 将字母串转换为由下划线分隔的所有小写字母 |
|      | capitalize      | -       | 返回字符串首字母大写                     |

模板文件示例：

```typescript
import { Component, OnInit<% if(!!viewEncapsulation) { %>, ViewEncapsulation<% }%><% if(changeDetection !== 'Default') { %>, ChangeDetectionStrategy<% }%>, ViewChild } from '@angular/core';
import { STComponent, STColumn } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { ModalHelper } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzFormatEmitEvent } from 'ng-zorro-antd/tree';

import { Components<%= classify(name) %>FormComponent } from './form/form.component';
import { <%= classify(name) %>Service } from './<%= dasherize(name) %>.service';

@Component({
  selector: '<%= selector %>',
  templateUrl: './<%= dasherize(name) %>.component.html',<% if(!inlineStyle) { %><% } else { %>
  styleUrls: ['./<%= dasherize(name) %>.component.<%= styleext %>']<% } %><% if(!!viewEncapsulation) { %>,
  encapsulation: ViewEncapsulation.<%= viewEncapsulation %><% } if (changeDetection !== 'Default') { %>,
  changeDetection: ChangeDetectionStrategy.<%= changeDetection %><% } %>
})
export class <%= componentName %> implements OnInit {
  nodes = [];
  url = '<%= extraArgs.api.list %>';
  searchSchema: SFSchema = {
    properties: {
      <%= extraArgs.searchSchema %>
    }
  };
  @ViewChild('st') private readonly st!: STComponent;
  columns: STColumn[] = [
    <%= extraArgs.columns %>
  ];

  constructor(private msg: NzMessageService, private modal: ModalHelper, private <%= camelize(name) %>Service: <%= classify(name) %>Service) { }

  ngOnInit() {
    console.log('<%= componentName %> init!');
    this.getTree();
  }

  getTree() {
    this.<%= camelize(name) %>Service.getTree().subscribe(res => {
      this.nodes = res.data;
    });
  }

  add(): void {
    this.modal
      .create(
        Components<%= classify(name) %>FormComponent,
        { operateType: 'add' },
        {
          modalOptions: {
            nzTitle: '新增xxx'
          }
        }
      )
      .subscribe(record => {
        this.service.add(record).subscribe((res: any) => {
          if (!res.code) {
            this.st.reload();
          } else {
            this.msg.error(res.msg);
          }
        });
      });
  }

  edit(params: NzSafeAny): void {
    this.service.update(params).subscribe(res => {
      if (!res.code) {
        this.st.reload();
      } else {
        this.msg.error(res.msg);
      }
    });
  }

  remove(params: NzSafeAny): void {
    this.service.remove(params).subscribe(res => {
      if (!res.code) {
        this.st.reload();
      } else {
        this.msg.error(res.msg);
      }
    });
  }

  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
    if (event?.eventName === 'click') {
      this.st.reload({ id: event.node?.key }, { toTop: false });
    }
  }
}

```

## 自定义模板的使用

模板的作用在生成页面共有结构，但是不同的业务页面会有各自的数据类型等业务数据，因此需要定义一个配置文件来读取生成代码所需要的业务数据。

在和\_cli-tpl 文件夹设定了一个默认的配置文件夹\_tpl_config，每个业务页面的配置可以写在对应名称的文件中，比如有一个组件名为 my-user，那么可以新建一个 my-user.js 来定义业务数据。

::: tip 注意
文件名为参数传入，所以并非一定要与组件名一致，但是为了生成组件的维护和配置文件的对应关系，这里建议组件与配置文件名称一致。
:::

```javascript
/**
 * 搜索栏业务数据定义，每个搜索字段定义一条数据
 * title：字段显示在页面上的名称，对应sf配置title属性
 * index：字段key值，对应sf配置每个字段的key
 * type：字段类型，对应sf配置type属性
 */
const search = [{ title: "名称", index: "name", type: "string" }];

/**
 * 表格业务数据定义，分为columns数据显示定义和options数据操作定义
 * columns中：
 * title：字段显示在表头上的名称，对应st配置title属性
 * index：字段名，对应st配置index属性
 * type：字段类型，对应st配置type属性
 * options中：
 * tpl：预置类型模板名，直接替换对应模板
 * type：对应st buttons配置的type
 */
const st = {
  columns: [
    { title: "名称", index: "name" },
    { title: "电话", index: "phone", type: "number" }
  ],
  options: [
    { tpl: "view" },
    { tpl: "edit" },
    { tpl: "del" },
    { text: "测试", type: "link" }
  ]
};

/**
 * 新增，修改，查看数据定义，每个搜索字段定义一条数据，与搜索栏业务数据定义格式一致
 * @title 对应sf配置title属性
 * @type type为组件类型string | number | textarea | select等
 * @index 字段key值，对应sf配置每个字段的key
 * @enum {*} 同步数据源,部分字段需要定义数据
 * @action 组件为upload时 上传地址
 * @listByIdsUrl 组件为upload时 根据id查询数据 接口地址
 */
const sf = [
  { title: "名称", index: "name", type: "string" },
  {
    title: "性别",
    index: "sex",
    type: "select",
    enum: [
      { label: "待支付", value: "WAIT_BUYER_PAY" },
      { label: "已支付", value: "TRADE_SUCCESS" },
      { label: "交易完成", value: "TRADE_FINISHED" }
    ]
  },
  {
    title: "电话",
    index: "phone",
    type: "tree-select",
    enum: [
      { label: "待支付", value: "WAIT_BUYER_PAY" },
      { label: "已支付", value: "TRADE_SUCCESS" },
      { label: "交易完成", value: "TRADE_FINISHED" }
    ]
  }
];

/**
 * model定义
 */
const model = {
  Info: {
    title: "基本信息",
    list: [
      { title: "名称", index: "name", type: "string[]" },
      { title: "性别", index: "sex", type: "PersonCenter[]" },
      { title: "电话", index: "phone", type: "string" }
    ]
  },
  PersonCenter: {
    title: "个人中心",
    list: [
      { title: "基本信息", index: "basicInfo", type: "string" },
      { title: "消息中心", index: "infoCenter", type: "string" }
    ]
  }
};

/**
 * api定义
 *
 */
const api = {
  list: "/list",
  add: {
    url: "/my-user/add",
    reqModel: "Info"
  },
  remove: "/my-user/remove",
  update: {
    url: "/my-user/update",
    reqModel: "Info"
  },
  detail: {
    url: "/my-user/detail",
    reqModel: ""
  },
  treeList: "/treeList"
};

/**
 * 布局参数定义
 * basic-tree:
 * treeWidth:左侧树占有页面宽度
 * treeGutter:左侧树与右侧列表间隔
 */
const layout = {
  treeWidth: 300,
  treeGutter: 16
};

module.exports = {
  search,
  st,
  sf,
  api,
  model,
  layout
};
```

定义好数据结构以后，然后使用以下命令生成代码：

```shell
ng g ng-alain:tpl basic [your component name] -m=[your module] --config=[your config name]
# 如 ng g ng-alain:tpl basic my-user -m=components --config=my-user
```

生成后的目录，和模板中的目录一致。

![image.png](https://cdn.nlark.com/yuque/0/2023/png/653410/1673935960838-2d4f1713-87b0-4cfb-8abf-4b940cbcf2d9.png#averageHue=%23222830&clientId=u441a7c51-44a6-4&from=paste&height=181&id=ud08f343a&name=image.png&originHeight=181&originWidth=282&originalType=binary&ratio=1&rotation=0&showTitle=false&size=8382&status=done&style=none&taskId=u613b6d77-7854-40e9-b5af-b433827f1f0&title=&width=282)

页面如下：

#### basic 模板

![image.png](https://cdn.nlark.com/yuque/0/2023/png/653410/1673936934442-ed2d1327-4943-4876-9bb9-91cdb1f4cf3b.png#averageHue=%23fdfcfc&clientId=u441a7c51-44a6-4&from=paste&height=938&id=u91ad43ff&name=image.png&originHeight=938&originWidth=1921&originalType=binary&ratio=1&rotation=0&showTitle=false&size=79859&status=done&style=none&taskId=ub0d89daa-f045-477c-977b-47d7950987e&title=&width=1921)

#### basic-tree 模板

![image.png](https://cdn.nlark.com/yuque/0/2023/png/653410/1673936961590-8b5ff425-042b-4946-ba53-d936ca17e945.png#averageHue=%23fcfcfc&clientId=u441a7c51-44a6-4&from=paste&height=937&id=ubdaeffae&name=image.png&originHeight=937&originWidth=1921&originalType=binary&ratio=1&rotation=0&showTitle=false&size=83482&status=done&style=none&taskId=u8d7b9701-932c-4090-8d1f-37467048e6b&title=&width=1921)
根据定义好的数据结构，生成以下结构体：

#### model 类型定义

```typescript
// 基本信息
export interface Info {
  name: string[]; // 名称
  sex: PersonCenter[]; // 性别
  phone: string; // 电话
}

// 个人中心
export interface PersonCenter {
  basicInfo: string; // 基本信息
  infoCenter: string; // 消息中心
}
```

#### 搜索 sf schema 定义

```typescript
searchSchema: SFSchema = {
  properties: {
    name: {
      title: "名称",
      type: "string"
    }
  }
};
```

#### 弹窗 sf schema 定义

```javascript
schema: SFSchema = {
  properties: {
    name: {
      title: "名称",
      type: "string"
    },
    sex: {
      title: "性别",
      type: "string",
      enum: [
        { label: "待支付", value: "WAIT_BUYER_PAY" },
        { label: "已支付", value: "TRADE_SUCCESS" },
        { label: "交易完成", value: "TRADE_FINISHED" }
      ],
      ui: {
        widget: "select"
      }
    },
    phone: {
      title: "电话",
      type: "number",
      enum: [
        { label: "待支付", value: "WAIT_BUYER_PAY" },
        { label: "已支付", value: "TRADE_SUCCESS" },
        { label: "交易完成", value: "TRADE_FINISHED" }
      ],
      ui: {
        widget: "tree-select"
      }
    }
  }
};
```

#### st schema 定义

```typescript
columns: STColumn[] = [
    { title: '序号', type: 'no' },
    {
      title: '名称',
      index: 'name'
    },
    {
      title: '电话',
      index: 'phone',
      type: 'number'
    },
    {
      title: '操作',
      width: 250,
      buttons: [
        {
          text: '查看',
          type: 'modal',
          className: 'text-success',
          modal: {
            component: ComponentsYourUserFormComponent,
            modalOptions: {
              nzTitle: '查看xxx'
            },
            params(record) {
              return { id: record.id, operateType: 'view' };
            }
          },
          click: (record, modal) => {}
        },
        {
          text: '编辑',
          type: 'modal',
          modal: {
            component: ComponentsYourUserFormComponent,
            modalOptions: {
              nzTitle: '编辑xxx'
            },
            params(record) {
              return { id: record.id, operateType: 'edit' };
            }
          },
          click: (record, modal) => {
            this.edit(modal);
          }
        },
        {
          text: '删除',
          type: 'del',
          pop: {
            title: '确定要删除吗?',
            okType: 'danger',
            icon: 'clock-circle'
          },
          className: 'text-error',
          click: (record, modal) => {
            this.remove(record);
          }
        },
        { text: '测试', type: 'link' }
      ]
    }
  ];
```

service 定义

```typescript
import { Injectable } from "@angular/core";
import { _HttpClient } from "@delon/theme";
import { BaseService, Ret } from "@shared";
import { Observable } from "rxjs";

import { Info, PersonCenter } from "./your-user.model";
@Injectable({ providedIn: "root" })
export class YourUserService {
  constructor(private http: _HttpClient) {}

  /**
   * @description 获取树数据
   */
  getTree(): Observable<Ret> {
    return this.http.post<Ret>(`${BaseService.BASE_URL}/treeList`);
  }

  /**
   * @description 新增
   */
  add(addParams: Info): Observable<Ret> {
    return this.http.post<Ret>(`${BaseService.BASE_URL}/my-user/add`, {
      ...addParams
    });
  }

  /**
   * @description 更新
   */
  update(editParams: Info): Observable<Ret> {
    return this.http.post<Ret>(`${BaseService.BASE_URL}/my-user/update`, {
      ...editParams
    });
  }

  /**
   * @description 详情
   */
  detail(detailParams: any): Observable<Ret> {
    return this.http.post<Ret>(`${BaseService.BASE_URL}/my-user/detail`, {
      ...detailParams
    });
  }

  /**
   * @description 删除
   */
  remove(id: string): Observable<Ret> {
    return this.http.post<Ret>(`${BaseService.BASE_URL}/my-user/remove`, {
      id
    });
  }
}
```
