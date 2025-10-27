# 学习使用 Angular

![banner](/images/blogs/blog/angular.png)

## 搭建开发环境

- node.js

最新版 node.js 即可

- Angular cli 工具

```sh
npm install -g @angular/cli
```

## 创建新项目

```sh
ng new [project_name]
```

然后根据提示，配置项目。

- 是否需要添加路由？
- 选择要使用的 CSS 规范

## 项目结构

| 文件夹或文件       | 用途                                                                                             |
| ------------------ | ------------------------------------------------------------------------------------------------ |
| e2e/               | e2e 测试配置文件                                                                                 |
| node_modules/      | node 模块                                                                                        |
| src/               | 根项目的源文件                                                                                   |
| .editorconfig      | 代码编辑器的配置                                                                                 |
| .gitignore         | 指定 Git 应忽略的不必追踪的文件                                                                  |
| angular.json       | 为工作区中的所有项目指定 CLI 的默认配置，包括 CLI 要用到的构建、启动开发服务器和测试工具的配置项 |
| browserslist       |                                                                                                  |
| karma.conf.js      |                                                                                                  |
| package-lock.json  | 提供 npm 客户端安装到 node_modules 的所有软件包的版本信息                                        |
| package.json       | 配置工作空间中所有项目可用的 npm 包依赖                                                          |
| README.md          | 根应用的简介文档                                                                                 |
| tsconfig.app.json  |                                                                                                  |
| tsconfig.json      | 工作空间中各个项目的默认 TypeScript 配置                                                         |
| tsconfig.spec.json |                                                                                                  |
| tslint.json        | 工作空间中各个项目的默认 TSLint 配置                                                             |

## 主模块文件

```ts
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";

@NgModule({
  declarations: [AppComponent, HomeComponent, AboutComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

## 语法

- 模板语法

{{变量名}}，变量在 ts 文件中声明，如下：

```ts
export class AppComponent implements OnInit {
  [变量名] = [变量值];

  constructor() {}

  ngOnInit(): void {}
}
```

- 绑定方法

(click)="[方法名]",方法在 ts 文件中声明，如下：

```ts
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  [方法名]() {
    //方法体
  }
}
```

- 双向绑定

[(ngModel)]="[变量名]",如下：

```html
<input type="text" [(ngModel)]="[变量名]" />
```

::: warning 注意

使用表单，需要在主文件中引入表单模块，如下：

```ts
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    FormsModule
  ]
}
```

:::

## 基础概念-模块

### 简介

Angular 是模块化的，NgModule 是构成应用的主要功能。NgModule 可以看做是一个容器，在里面是专注于某项功能的 html、样式及 ts 代码。如果 NgModule 之间想要互相调用，则需要在 NgModule 的配置项中导入或导出某个模块，这样 NgModule 将产生层次，以创建应用的 app.module.ts 的 AppModule 为根模块的树状模块依赖关系。

![banner](/images/blogs/blog/angular/1.png)

### 使用

NgModule 的声明是以装饰器的方法实现的，因此需要在文件中使用@NgModule()装饰器声明这是一个模块定义文件，@NgModule 是一个函数，里面接受以下参数：

1. \*declarations（可声明对象表） —— 那些属于本 NgModule 的组件、指令、管道。
2. \*exports（导出表） —— 那些能在其它模块的组件模板中使用的可声明对象的子集。
3. \*imports（导入表） —— 那些导出了本模块中的组件模板所需的类的其它模块。
4. providers —— 本模块贡献的那些服务的创建器。 这些服务能被本模块中的任何部分使用。
5. bootstrap —— 应用的主视图，称为根组件。它是应用中所有其它视图的宿主。只有根模块才应该设置这个 bootstrap 属性。

### 官方模块

1. BrowserModule：@angular/platform-browser 引入，当你想要在浏览器中运行应用时
2. CommonModule：@angular/common 引入，当你想要使用 NgIf 和 NgFor 时
3. FormsModule：@angular/forms 引入，当要构建模板驱动表单时（它包含 NgModel ）
4. ReactiveFormsModule：@angular/forms 引入，当要构建响应式表单时
5. RouterModule：@angular/router 引入，要使用路由功能，并且你要用到 RouterLink,.forRoot() 和 .forChild() 时
6. HttpClientModule：@angular/common/http 引入，当你要和服务器对话时
   推荐使用第一种方法声明服务，因为 Angular 可以通过 shake tree 对服务进行优化。

### forRoot()模式

RouterModule 中提供了 Router 服务，同时还有一些路由指令，比如 RouterOutlet 和 routerLink 等。应用的根模块导入了 RouterModule，以便应用中有一个 Router 服务，并且让应用的根组件可以访问各个路由器指令。任何一个特性模块也必须导入 RouterModule，这样它们的组件模板中才能使用这些路由器指令。

如果 RouterModule 没有 forRoot()，那么每个特性模块都会实例化一个新的 Router 实例，而这会破坏应用的正常逻辑，因为应用中只能有一个 Router 实例。通过使用 forRoot() 方法，应用的根模块中会导入 RouterModule.forRoot(...)，从而获得一个 Router 实例，而所有的特性模块要导入 RouterModule.forChild(...)，它就不会实例化另外的 Router。

## 基础概念-组件

### 简介

Component 是组成模块的主要部分，不同组件与更深层次的模块构成了一个完整的视图。同一视图的组件及模块将会一起创建、更新、销毁。Component 中要声明描述视图的模板，即 html 与 css 文件。然后视图的双向绑定及控制都是由组件来完成。

### 使用

Component 的声明也需要用到装饰器，在文件中使用@Component 装饰器声明这是一个组件定义文件，@Component 中需要组件元数据的配置，配置项如下：

1. selector：是一个 CSS 选择器，它会告诉 Angular，一旦在模板 HTML 中找到了这个选择器对应的标签，就创建并插入该组件的一个实例。 比如，如果应用的 HTML 中包含`<app-hero-list></app-hero-list>`，Angular 就会在这些标签中插入一个 HeroListComponent 实例的视图。
2. templateUrl：该组件的 HTML 模板文件相对于这个组件文件的地址。 另外，你还可以用 template 属性的值来提供内联的 HTML 模板。 这个模板定义了该组件的宿主视图。
3. styleUrls：该组件的样式文件相对于组件文件的地址，这是一个数组，可以引入多个样式文件。这里也可以使用 style 属性来提供内联的 style 样式。
4. providers：当前组件所需的服务提供者的一个数组。在这个例子中，它告诉 Angular 该如何提供一个 HeroService 实例，以获取要显示的英雄列表。

### 生命周期

1. Constructor:类的构造器，不属于 Angular 框架的内容，因此不应该在此方法中做任何操作，但是可以在该方法的参数中用来依赖注入。
2. ngOnChanges()：当 Angular 设置或重新设置数据绑定的输入属性时响应。注意，如果你的组件没有输入，或者你使用它时没有提供任何输入，那么框架就不会调用 ngOnChanges()。
3. ngOnInit()：在第一轮 ngOnChanges() 完成之后调用，只调用一次。在 Angular 第一次显示数据绑定和设置指令/组件的输入属性之后，初始化指令/组件。
4. ngDoCheck()：紧跟在每次执行变更检测时的 ngOnChanges() 和 首次执行变更检测时的 ngOnInit() 后调用。检测，并在发生 Angular 无法或不愿意自己检测的变化时作出反应。
5. ngAfterContentInit()：第一次 ngDoCheck() 之后，当 Angular 把外部内容投影进组件视图或指令所在的视图之后调用，只调用一次。
6. ngAfterContentChecked()：ngAfterContentInit() 和每次 ngDoCheck() 之后，每当 Angular 检查完被投影到组件或指令中的内容之后调用。
7. ngAfterViewInit():第一次 ngAfterContentChecked() 之后，当 Angular 初始化完组件视图及其子视图或包含该指令的视图之后调用，只调用一次。
8. ngAfterViewChecked():ngAfterViewInit() 和每次 ngAfterContentChecked() 之后，每当 Angular 做完组件视图和子视图或包含该指令的视图的变更检测之后调用。
9. ngOnDestroy():在 Angular 销毁指令或组件之前立即调用。每当 Angular 每次销毁指令/组件之前调用并清扫。 在这儿取消订阅可观察对象和分离事件处理器，以防内存泄漏。

![banner](/images/blogs/blog/angular/2.png)

### 组件视图间交互

#### 输入绑定数据

通过@Input()装饰器来声明一个变量作为输入属性，该属性应该在父组件中的子组件标签上绑定。

#### 输出绑定方法

通过@Output()装饰器来声明一个变量作为输出属性，并使用 `new EventEmitter<T>()`来创建一个事件发射器，在父组件的子组件标签上应该绑定一个方法。在子组件中触发事件需要用 emit()方法，如果需要传递参数则直接带在括号中，然后在父组件绑定时括号中填写\$event。

![banner](/images/blogs/blog/angular/3.png)

## 基础概念-路由

### 路由守卫

使用路由守卫来防止用户未经授权就导航到应用的某些部分。Angular 中提供了以下路由守卫：

- CanActivate
- CanActivateChild
- CanDeactivate
- Resolve
- CanLoad

要想使用路由守卫，可以考虑使用无组件路由，因为这对于保护子路由很方便。

为你的守卫创建一项服务：

```sh
ng generate guard your-guard
```

请在守卫类里实现你要用到的守卫。下面的例子使用 CanActivate 来保护该路由。

```js
export class YourGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // your  logic goes here
  }
}
```

在路由模块中，在 routes 配置中使用相应的属性。这里的 canActivate 会告诉路由器它要协调到这个特定路由的导航。

```js
{
  path: '/your-path',
  component: YourComponent,
  canActivate: [YourGuard],
}
```

### 激活路由

路由的路径和参数可以通过注入名为 ActivatedRoute 的路由服务获得。它提供了大量有用的信息，包括：

|属性|说明|
|url|一个路由路径的 Observable，是一个由路由路径的各个部分组成的字符串数组。|
|data|包含提供给当前路由的 data 对象的 Observable。 也包含任何由解析守卫解析出的值。|
|paramMap|一个包含该路由的必要参数和可选参数 map 的 Observable。 这个 map 支持从同一个参数中获得单个或多个值。|
|queryParamMap|一个包含适用于所有路由的查询参数 map 的 Observable。 这个 map 支持从同一个查询参数中获得单个或多个值。|
|fragment|一个适用于所有路由的 URL 片段的 Observable。|
|outlet|用来渲染该路由的 RouterOutlet 的名字。 对于无名出口，这个出口的名字是 primary。|
|routeConfig|包含原始路径的那个路由的配置信息。|
|parent|当该路由是子路由时，表示该路由的父级 ActivatedRoute。|
|firstChild|包含该路由的子路由列表中的第一个 ActivatedRoute。|
|children|包含当前路由下所有激活的子路由。|

### 页面跳转

## 基础概念-服务

### 简介

服务是一个广义的概念，它包括应用所需的任何值、函数或特性。狭义的服务是一个明确定义了用途的类。它应该做一些具体的事，并做好。理想情况下，组件的工作只管用户体验，而不用顾及其它。 它应该提供用于数据绑定的属性和方法，以便作为视图（由模板渲染）和应用逻辑（通常包含一些模型的概念）的中介者。组件应该把诸如从服务器获取数据、验证用户输入或直接往控制台中写日志等工作委托给各种服务。通过把各种处理任务定义到可注入的服务类中，你可以让它被任何组件使用。

### 使用

服务的声明同样也需要装饰器来完成，服务的声明采用了依赖注入的方式，通过@Injectable()装饰器声明。依赖需要注册一个提供者，分为以下三种情况：

1. 根注入器
   这是 Angular CLI 创建服务后默认的方式，是把服务注册在了应用的根注入器中，这样可以让所有组件使用此服务，随着应用创建。
2. 模块注入
   可以通过@NgModule()装饰器的 providers 属性注册服务为模块服务，这会让该服务对模块中的所有组件可用，随着模块创建。
3. 组件注入
   可以通过@Component()装饰器的 providers 属性注册服务为组件服务，这样的服务只有该组件可以使用，随着组件创建。

### 单例服务

在 Angular 中有两种方式创建单例服务（指在应用中只存在一个实例的服务），分别是：

1. Angular6 之后
   把 @Injectable() 中的 providedIn 属性设置为 "root"。
2. Angular6 及之前
   把该服务包含在 AppModule 或某个只会被 AppModule 导入的模块中。

![banner](/images/blogs/blog/angular/4.png)

## 基础概念-RxJS

### 简介

响应式编程是一种面向数据流和变更传播的异步编程范式。RxJS（响应式扩展的 JavaScript 版）是一个使用可观察对象进行响应式编程的库，它让组合异步代码和基于回调的代码变得更简单。

### 使用

```js
import { Component } from "@angular/core";
import { Observable } from "rxjs";

@Component({
  selector: "app-watch",
  templateUrl: "./watch.component.html"
})
export class WatchComponent {
  watchValue: number;
  watchValue$: Observable<number>;

  startWatch(): void {
    this.watchValue$.subscribe(num => {
      this.watchValue = num;
    });
  }

  setValue(): void {
    this.watchValue$.next(10);
  }

  getValue(): number {
    return this.watchValue;
  }
}
```

![banner](/images/blogs/blog/angular/5.png)

## 基础概念-ChangeDetectorRef

### 简介

Angular 各种视图的基础类，提供变更检测功能。 变更检测树会收集要检查的所有视图。 使用这些方法从树中添加或移除视图、初始化变更检测并显式地把这些视图标记为脏的，意思是它们变了、需要重新渲染。

### 使用

1. markForCheck()
   当视图使用 OnPush（checkOnce）变更检测策略时，把该视图显式标记为已更改，以便它再次进行检查。
2. detach()
   从变更检测树中分离开视图。 已分离的视图在重新附加上去之前不会被检查。 与 detectChanges() 结合使用，可以实现局部变更检测。
3. detectChanges()
   检查该视图及其子视图。与 detach 结合使用可以实现局部变更检测。

<Valine></Valine>
