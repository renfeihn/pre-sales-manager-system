# 学习笔记

## 摘要介绍

`Ant Design Pro` 是一个基于`Ant Design`搭建起来的模板项目。它提供了两个主要布局：`BasicLayout`、`UserLayout`，在布局基础上制作了20多个基础页面，详情见`模板`介绍段落。

`Ant Design Pro` 主体代码使用[ES2015+](http://es6.ruanyifeng.com/)语法规则，因此在阅读源码时遇到不理解的语法，可前往相关主页进行查询。在学习笔记中，除非遇到关键的语法点，否则不对语法进行额外说明。

在接下来，将按照以下几个方面介绍项目的相关代码。
......

## 目录结构

```
├── mock                     # 本地模拟数据
├── node_modules             # 依赖库
├── public
│   ├── favicon.ico          # Favicon
│   └── index.html           # HTML 入口模板
├── src
│   ├── common               # 应用公用配置，如导航信息
│   ├── components           # 业务通用组件
│   ├── e2e                  # 集成测试用例
│   ├── layouts              # 通用布局
│   ├── models               # dva model
│   ├── routes               # 业务页面入口和常用模板
│   ├── services             # 后台接口服务
│   ├── utils                # 工具库
│   ├── g2.js                # 可视化图形配置
│   ├── polyfill.js          # 兼容性垫片
│   ├── theme.js             # 主题配置
│   ├── index.js             # 应用入口
│   ├── index.less           # 全局样式
│   └── router.js            # 路由入口
├── tests                    # 测试工具
├── .editorconfig            # 编辑器配置
├── .eslintrc                # js代码检测工具
├── .ga                      # 未知
├── .gitignore               # git版本配置
├── .roadhogrc               # roadhog配置
├── .roadhogrc.mock.js       # roadhog的模拟配置
├── .stylelintrc             # css代码审查配置
├── .travis.yml              # travis持续构建工具配置
├── package.json             # web前端项目配置文件
├── README.md
└──

```

### 项目中的几项配置文件


> **Q**:为什么要用`编辑器配置`？
>
> **A**:当多人共同开发一个项目的时候，往往会出现大家用不同编辑器的情况。就前端开发者来说，有人喜欢 Sublime，有人喜欢 Webstorm , 也有人喜欢 Atom，还有人喜欢 Vim，HBuilder 等等。各种不同编程语言的开发者喜欢各种不同的编辑器。问题来了，如何让使用不同编辑器的开发者在共同开发一个项目时“无痛”地遵循编码规范(编码风格)？
>
> ___
> **Q**：怎么用`编辑器配置`？
>
> **A**：在项目根创建一个名为 .editorconfig 的文件。安装与编辑器对应的 EditorConfig 插件。详情参考[编辑器配置](http://www.jianshu.com/p/712cea0ef70e)
>
> ___
> **Q**：`代码检查工具`是什么？
>
> **A**：js的代码检查工具是ESLint，css的代码检查工具是StyleLint，相应的配置项保存在`.eslintrc`和`.stylelintrc`文件中。一般来说，都不需要进行修订，深入学习可参考[js代码检测工具](http://www.jianshu.com/p/2bcdce1dc8d4)、[css代码审查配置](http://www.jianshu.com/p/1d974ae2a7dc)
>
> ___
> **Q**：`git`是什么？
>
> **A**：`git`是版本控制工具，类似的工具还有`svn`。有关`.gitignore`的配置参考[git版本配置](http://www.cnblogs.com/haiq/archive/2012/12/26/2833746.html)
>
> ___
> **Q**：什么是`持续集成系统`？
>
> **A**：对个人而言，就是让你的代码在提交到远程——这里是GitHub——后，立即自动编译，并且在失败后可以自动给你发邮件的东西。当然，除了编译，还能做自动化测试、自动部署等。对团队或企业而言，这意味着更多的东西，是敏捷开发的一种践行。`travis`是一种持续集成工具，企业中还有用`jenkins`的。有关`travis`的更多介绍见[travis持续构建工具配置](http://www.jianshu.com/p/c80b37f775a0)
>
> ___
> **Q**：什么是`roadhog`？
>
> **A**：这是一个 cli 工具，提供 `server`、 `build` 和 `test` 三个命令，分别用于本地调试和构建。更多介绍见[roadhog配置](https://www.npmjs.com/package/mg-roadhog)
>
> ___
> **Q**：web前端项目的配置是package？
>
> **A**：每个web前端项目的根目录下面，一般都有一个 `package.json` 文件，定义了这个项目所需要的各种模块，以及项目的配置信息（比如名称、版本、许可证等元数据）。更多介绍见[web前端项目配置文件](http://javascript.ruanyifeng.com/nodejs/packagejson.html)
>
> ___
> **Q**：最关键，**初学者应着重关心哪些**？
>
> **A**：初学者应将精力放在`package.json`、`roadhog`这两者上，其他的都可以忽略掉。

#### package.json摘要介绍

`npm install`命令根据这个`package.json`配置文件，自动下载所需的模块，也就是配置项目所需的运行和开发环境。`package.json`文件就是一个JSON对象，该对象的每一个成员就是当前项目的一项设置。

`scripts`指定了运行脚本命令的npm命令行缩写，比如start指定了运行`npm run start`时，所要执行的命令。

进行前端开发时可能经常用到的几个命令是：`npm run start`（进行开发调试，缩写成`npm start`）、`npm run build`（进行构建打包）。当然也可以尝试`package.json`中给出的其他命令，如：`npm run analyze`、`npm run test`等，甚至也可以自己在`package.json`中添加需要的命令。

`dependencies`字段指定了项目运行所依赖的模块，`devDependencies`指定项目开发所需要的模块。它们都指向一个对象。该对象的各个成员，分别由模块名和对应的版本要求组成，表示依赖的模块及其版本范围。更多信息参见[web前端项目配置文件](http://javascript.ruanyifeng.com/nodejs/packagejson.html#toc2)

`babel`配置项，其实是有关`babel`的配置内容，写在`package.json`中实际上是一种省略，也可以写在`.babelrc`文件中。

`lint-staged`是与代码检查有关的配置项，`jest`是与单元测试有关的配置项。这两项的配置可以参考[jest](http://www.jianshu.com/p/a656a5459e73)、[lint](https://segmentfault.com/a/1190000009546913)。这两项与写业务逻辑代码没有直接关联。

#### roadhog摘要介绍

`roadhog` 是一个 cli 工具，提供 `server`、 `build` 和 `test` 三个命令，分别用于本地调试和构建，并且提供了特别易用的 `mock` 功能。命令行体验和 `create-react-app` 一致，配置略有不同，比如默认开启 `css modules`，然后还提供了 `JSON` 格式的配置方式。

重点介绍`roadhog`有关的几个配置项，主要是在`ant design pro`的代码中用到了这些配置项。

##### entry

指定 `webpack` 入口文件，支持 `glob` 格式。

如果你的项目是多页类型，会希望把 `src/pages` 的文件作为入口。可以这样配：
```
"entry": "src/pages/\*.js"
```

##### env

针对特定的环境进行配置。`server` 的环境变量是 `development`，`build` 的环境变量是 `production`。

比如：
```
"extraBabelPlugins": ["transform-runtime"],
"env": {
  "development": {
    "extraBabelPlugins": ["dva-hmr"]
  }
}
```
这样，开发环境下的 `extraBabelPlugins` 是 `["transform-runtime", "dva-hmr"]`，而生产环境下是 `["transform-runtime"]`。

```
"env": {
  "development": {
    "extraBabelPlugins": [
      "dva-hmr",
      "transform-runtime",
      "transform-decorators-legacy",
      "transform-class-properties",
      ["import", { "libraryName": "antd", "style": true }]
    ]
  },
  "production": {
    "extraBabelPlugins": [
      "transform-runtime",
      "transform-decorators-legacy",
      "transform-class-properties",
      ["import", { "libraryName": "antd", "style": true }]
    ]
  }
}
```
在这段代码中，开发环境和生产环境分别配置，其中开发环境使用了`dva-hmr`插件，



##### externals
配置 `webpack` 的 `externals` 属性。

##### theme
配置主题，实际上是配 `less` 的 `modifyVars`。支持 `Object` 和文件路径两种方式的配置。

比如：
```
"theme": {
  "@primary-color": "#1DA57A"
}
```
或者，
```
"theme": "./node_modules/abc/theme-config.js"
```
这里有 [如何配置 antd theme  的例子](https://github.com/dvajs/dva-example-user-dashboard/commit/d6da33b3a6e18eb7f003752a4b00b5a660747c31) 。

#### babel
上述多处提到了`babel`，因此有必要针对`babel`进行了解。用官方的用语：`Babel 是一个 JavaScript 编译器。今天就来用下一代 JavaScript 语法写代码吧！`。换句话说：`Babel`是一个广泛使用的转码器，可以将`ES6`代码转为`ES5`代码，从而在现有环境执行。

既然如此，接下来重点说说`package.json`、`.roadhogrc`中有关`babel`的配置内容：

`presets`字段用来设定转码规则，如`package.json`中
```
"babel": {
  "presets": [
    "env",
    "react"
  ],
  ...
}
```
就是设定了`env`、`react`两个转码规则。其中`env`指的是[babel-preset-env](https://www.npmjs.com/package/babel-preset-env)，这是一个新的 `preset`，可以根据配置的目标运行环境（`environment`）自动启用需要的 `babel` 插件。`react`指的是[babel-preset-react](https://www.npmjs.com/package/babel-preset-react)，主要是针对所有`react`插件的转码规则。

`plugins`配置项不用多说，从名称就能看出来，就是`babel`的一系列插件，与`ant design pro`的`package.json`相关的两个插件在这里：[transform-decorators-legacy](https://www.npmjs.com/package/babel-plugin-transform-decorators-legacy)、[transform-class-properties](https://www.npmjs.com/package/babel-plugin-transform-class-properties)。而在`.roadhogrc`配置文件中也额外配置了`babel`的插件：[transform-runtime](http://babeljs.io/docs/plugins/transform-runtime/)、[dva-hmr](https://www.npmjs.com/package/babel-plugin-dva-hmr)、[babel-plugin-import](http://blog.csdn.net/qq_35809834/article/details/72670220)。其中唯一需要多说一点的是按需加载插件`babel-plugin-import`，它可以针对[antd](http://npm.taobao.org/package/babel-plugin-antd)插件中的部分元素样式进行按需加载。

***其实不用更多了解相关内容，只需知道如此配置之后，1.开发者可以使用最新的`ES6`书写代码；2.放心使用react相关插件；3.在进行`run start`或`run build`时，代码能够自动转换成`ES5`代码，从而在浏览器中执行。***

### 项目中的几个目录

其中`mock`是本地模拟数据目录、`node_modules`是依赖库目录、`public`是入口目录、`src`是源码目录、`tests`是测试工具目录。在进行`npm run build`之后还会生成（默认情况下）`dist`目录，这是生成的生产环境下的运行代码目录。其他目录不必多说，只需要核心了解`src`的目录组成即可。

```
├── src
│   ├── common               # 应用公用配置，如导航信息
│   ├── components           # 业务通用组件
│   ├── e2e                  # 集成测试用例
│   ├── layouts              # 通用布局
│   ├── models               # dva model
│   ├── routes               # 业务页面入口和常用模板
│   ├── services             # 后台接口服务
│   ├── utils                # 工具库
│   ├── g2.js                # 可视化图形配置
│   ├── polyfill.js          # 兼容性垫片
│   ├── theme.js             # 主题配置
│   ├── index.js             # 应用入口
│   ├── index.less           # 全局样式
│   └── router.js            # 路由入口
```

#### index.js 应用入口

这个页面核心就是`import`、`const`这两个命令，至于其是否是`ES6`的暂且不管。

##### import

语法介绍见[这里](http://es6.ruanyifeng.com/#docs/module#import-命令)。在`index.js`这个文件中核心就是加载并执行了一系列`module`，并引入了`dva`、`models`两个变量。

>有关ES6的语法推荐查询阮一峰翻译的[ECMAScript 6 入门](http://es6.ruanyifeng.com/)，后续不再赘述。

##### const

语法介绍见[这里](http://es6.ruanyifeng.com/#docs/let#const-命令)。这里就是声明了一个变量`app`。

##### 其他

至于`index`页面中的`const app = dva({})`、`models.forEach((m)=>{app.model(m);});`、`app.router(require('./router'));`、`app.start('#root');`这几句代码暂时不理会，待梳理调用流程时再进行解析。

简单说一下，由于这里是入口，所有这些内容都是用来进行全局设置的，至于其如何实现？如何调用？这些是细节内容，在概略浏览代码时，可以不关注这些点。

#### router.js 路由入口

这个页面核心就是定义路由策略。并引出了`export`命令。

##### export

语法介绍见[这里](http://es6.ruanyifeng.com/#docs/module#export-default-命令)。这里是将定义好的函数`RouterConfig`默认输出出去。

##### 定义路由策略

通过`function`关键字定义了`RouterConfig`函数，其输入参数是`{history}`对象，返回值是一个页面，其由`LocaleProvider`、`Router`、`Switch`、`Route`、`Redirect`标签（component）组成的。其中每个component从哪里来，怎么操作暂时先不去关注这些细节，在模仿实现的时候可以有样学样。

核心认识到通过`/user`路径可以访问到`UserLayout`，通过`/`可以访问到`BasicLayout`，默认情况下（`Redirect`)，会跳转到`/`。具体代码就是如下这段：
```
<Switch>
  <Route path="/user" component={UserLayout} />
  <Route path="/" component={BasicLayout} />
  <Redirect to="/" />
</Switch>
```

#### 其他文件

`theme.js`主要是主题配置、`index.less`主要是进行了全局样式设置、`polyfill.js`是兼容性垫片、`g2.js`是可视化图形的配置。一般情况下，如果不需要修改全局样式、主题修改、对g2进行配置，不进行额外的浏览器兼容性考虑，这些文件可以不进行深入了解。

其实对这些文件的加载过程是其使用的脚手架完成的，暂且不深入了解脚手架及`webpack`相关的实现机制。

#### dva

先来看看`dva`的介绍：*`dva` 是基于现有应用架构 (`redux` + `react-router` + `redux-saga` 等)的一层轻量封装，没有引入任何新概念，全部代码不到 100 行。`dva` 是 framework，不是 library，类似 emberjs，会很明确地告诉你每个部件应该怎么写，这对于团队而言，会更可控。另外，除了 `react` 和 `react-dom` 是 `peerDependencies` 以外，`dva` 封装了所有其他依赖。`dva` 实现上尽量不创建新语法，而是用依赖库本身的语法，比如 `router` 的定义还是用 `react-router` 的 `JSX` 语法的方式(dynamic config 是性能的考虑层面，之后会支持)。* 引用自[这里](https://github.com/dvajs/dva/issues/1)，github的中文介绍在[这里](https://github.com/dvajs/dva/blob/master/README_zh-CN.md)

这又引出了一系列新的概念：`redux`、`react`、`react-router`、`react-dom`等。暂且先不管这些新的概念是什么，只需要知道`dva`是一套框架（framework），尽量不引入新的语法，只是明确了每个部件该怎么写。

#### redux

由于`dva`是一层皮，其内涵是`redux`、`react`等。那就了解下`redux`是什么？`redux`的中文文档从[这里](http://cn.redux.js.org)找到。用几句话概括就是：*`Redux` 是 `JavaScript` 状态容器，提供可预测化的状态管理。可以让你构建一致化的应用，运行于不同的环境（客户端、服务器、原生应用），并且易于测试。不仅于此，它还提供 超爽的开发体验，比如有一个时间旅行调试器可以编辑后实时预览。*

从阅读其介绍就可以获知：*`Redux` 试图让 `state` 的变化变得可预测*，它就是管理`state`的解决方案。至于如何使用`redux`、它具有哪些核心概念、如何操作`redux`中的函数、使用它有哪些注意事项。可以通过学习`redux`获知。这应该是2天工作量的就可以完成的学习任务。

由于后续进行开发时会反复使用到`redux`相关的概念，这一章节必须进行扩展学习，可以安排后续的学习任务。但为不影响主线，暂且放下，进行整体思路梳理。

#### react及其他
`React` 是一个采用声明式，高效而且灵活的用来构建用户界面的框架。因此，有必要对`react`的基础逻辑进行理解，此处需要安排2天的学习任务，了解`react`的基础知识。中文的教程在[这里](https://doc.react-china.org/)

`React Router` 是完整的 `React` 路由解决方案。`React Router` 保持 UI 与 URL 同步。它拥有简单的 API 与强大的功能例如代码缓冲加载、动态路由匹配、以及建立正确的位置过渡处理。中文教程在[这里](https://react-guide.github.io/react-router-cn/)

`React Dom`提供了针对dom的方法，具体参考[这里](https://doc.react-china.org/docs/react-dom.html)。

#### 各目录及相互关系

`common`是应用公共配置，如导航信息；`components`是业务通用组件；`layouts`是通用布局；`models`是`dva model`；`routes`是业务页面入口和常用模板；`services`是后台接口服务；`utils`是工具库；`e2e`是集成测试用例。

从入口开始看起，一步步抽丝剥茧看看各个组件之间是怎样进行调用的。

首先在`index.js`中加载了`models`中的所有`model`并进行了注册。其中`app.model()`函数来自于`dva`的用法，而且`model`的概念也是`dva`中的概念，详见[这里](https://github.com/dvajs/dva/blob/master/docs/API_zh-CN.md#model)，而所有的`model`均来自于`./models`目录。之后又通过`app.router()`语句注册了路由表，详细介绍见[这里](https://github.com/dvajs/dva/blob/master/docs/API_zh-CN.md#approuter-history-app---routerconfig)。`index.js`文件的最后调用了 `app.start('#root');`，这句话的含义是启动应用，详细介绍见[这里](https://github.com/dvajs/dva/blob/master/docs/API_zh-CN.md#appstartselector)。

在启动应用之后，开发者可以通过浏览器向服务器发起请求访问，以获取页面和数据。不详细展开路由过程，依照路由字面含义。在访问`/`时，会被路由到`BasicLayout`布局页面（此处参见`router.js`）。

##### 布局页面
布局页面在开始的位置`import`了一系列的组件（component），定义了一些`const`（常量），先不去管它。接下来出现了诡异的`class`关键字，这有中`java`代码乱入的感觉，没关系。这是`ES6`的新特性，参见[这里](http://es6.ruanyifeng.com/#docs/class)，简单理解起来可以将之看作对象。这个`class`继承自`React.PureComponent`，在`class`中定义了静态变量、构造方法，以及一系列的内部方法，值得注意的是方法只有被调用时才会执行，因此`class`中的一系列方法都可以视为声明，而不会顺序执行。直到最后出现了一个`render`方法，这个方法会在渲染组件时被调用（此处请参考[react组件相关](https://doc.react-china.org/docs/components-and-props.html)），因此我们关心页面显示相关逻辑就主要是关注`render`这个方法。

在对`render`方法展开说之前，先把`BasicLayout`最后的`export`说完。`export default`是`ES6`相关语法，前面已有介绍，指默认输出。`connect`是`react-redux`中的一个api，是用来连接 `React` 组件与 `Redux store`的，其用法详情见[这里](http://cn.redux.js.org/docs/react-redux/api.html)，只需知道其返回的仍是原`React`组件（当前事例中是`BasicLayout`），并与已有的状态信息`state`相关联。

再展开说`render`。1.在`render`中，用到了一系列来自`antd`的组件如：`Layout`、`Menu`等，其相关的介绍不展开，可以到`antd`网站参考其相关教程。2.当然也需要用到`dva`封装好的有关路由的一系列组件，如：`Link`、`Route`、`Redirect`、`Switch`。3.同样也用到了`ant design pro`中创建的组件，如：`HeaderSearch`、`NoticeIcon`、`GlobalFooter`。如果深入进去了解每个组件的实现原理，会不可避免陷入泥潭，对此只需阅读`antd`、`dva`的相关api，明确该组件是什么、怎么做就好，接下来就是实践中掌握。

`BasicLayout`布局的`render`中，核心布局就是左边栏（`Sider`，参考`antd`的[Layout.Sider](https://ant.design/components/layout-cn/#Layout.Sider)）、顶部（`Header`，参考[Layout.Header](https://ant.design/components/layout-cn/#Layout)、内容区（`Content`，参考[Layout.Content](https://ant.design/components/layout-cn/#Layout)。在内容区除了整体的可更换的页面以外还有自创建的脚部区域（`GlobalFooter`），其中左边栏、顶部使用了`ant design pro`样例中自创建的组件，包括：搜索框（`HeaderSearch`）、通知提醒框（`NoticeIcon`），以及`antd`中已经封装好的通用模板：菜单栏（`Menu`）、下拉菜单（`Dropdown`）、头像（`Avatar`）、加载中（`Spin`）、图标（`Icon`）、标签（`Tag`）、全局提示（`message`）。如上所述，有关`antd`、`dva`中已经封装好的通用模板，应当阅读相关的api，而不应该重新造一遍轮子。

> 整个布局页面大体就是这个样子，在`ant design pro`中还提供了另一个页面布局就是`UserLayout`。如果实际开发中还需要其他的页面布局，就需要自己撰写，大体来说就要研究清楚`BasicLayout`页面中的各方面细节，并能够再依照需求完成创建。

##### Redirect 路由
在`BasicLayout`页面布局中，`Content`区是通过
```
{
  getRouteData('BasicLayout').map(item =>
    (
      <Route
        exact={item.exact}
        key={item.path}
        path={item.path}
        component={item.component}
      />
    )
  )
}
<Redirect to="/dashboard/analysis" />
```
完成页面加载。有关`Redirect`、`Route`的详细介绍在[这里](http://react-guide.github.io/react-router-cn/docs/API.html)或[这里](http://www.ruanyifeng.com/blog/2016/05/react_router.html)。先来看看`getRouteData`函数干了什么。

`getRouteData`函数来自于`../utils/utils`文件，通过对`utils.js`查看，可以看出该函数引用了`../common/nav`文件，也就是`nav.js`，结合`nav.js`文件进行梳理。综合三个位置可以分析得到如下过程：

1. 在`nav.js`中通过`import...from...`引入了`layouts`、`routes`中的布局页面和业务页面（常用模板）。由此可知 **如需添加新的页面可以参照这个格式引入**。
2. 在`nav.js`中定义了`data`，以`json`的格式定义了菜单目录结构，并将引入的页面（1.）以变量的形式引入进来。这个目录内在含义可以后续深入了解，需要注意的是：**在添加新页面时应参照这个json格式添加**。
3. 通过`export default`关键字把`data`输出出来。
4. `utils.js`中，`import navData from '../common/nav';`引入了刚刚定义的data并重命名为navData。
5. `utils.js`中的函数`getRouteData`中，用到了数组对象中的函数`some`（[官方中译文档](http://lzw.me/pages/ecmascript/#359)、[解读参考](http://www.zhangxinxu.com/wordpress/2013/04/es5%E6%96%B0%E5%A2%9E%E6%95%B0%E7%BB%84%E6%96%B9%E6%B3%95/#some)）、`filter`（[官方中译文档](http://lzw.me/pages/ecmascript/#362)、[解读参考](http://www.zhangxinxu.com/wordpress/2013/04/es5%E6%96%B0%E5%A2%9E%E6%95%B0%E7%BB%84%E6%96%B9%E6%B3%95/#filter)）以及[lodash](http://www.css88.com/doc/lodash/)的`cloneDeep`。
6. 依照字面意思来理解，`getRouteData`做了两件事：1.对输入参数`path`，进行检查，如果检查不通过返回`null`（检查含义主要是确保`path`是一个有效`layout`，同时`layout`的`children`不为空）；2.对检查通过的`path`，获取该布局下的所有数据，并将数据转换成数组，数组的每个元素是被称为`item`，该`item`具有`path`属性、`exact`属性、`component`属性、`children`属性。
7. 解释下`item`的四个属性：`path`属性会赋值给外层调用中`Route`的`path`属性；`component`属性会赋值给外层调用中`component`属性；`children`属性是用来控制如何进行递归的；`exact`属性会赋值给外层调用中`exact`属性。
8. `getRouteData`就获得了具有`path`、`component`等属性的元素数组。
9. 在`BasicLayout`中调用了`getRouteData`函数并对返回数组逐项拆解，组成`Route`。
10. 通过以上过程就将`nav`中的`json`格式配置转换成了页面中的跳转路由。当页面中的地址栏中出现`/一级目录/二级目录`时，就可以通过`Route`找到对应的`component`并进行加载。

这样一来，`layouts`、`routes`、`nav.js`、`utils.js`之间进行路由的链路就清晰了。由于我们是在实践中学习，对一些实现细节还不必过度深究，只需要知道页面是怎样串起来的，以及为什么改变`nav.js`中的目录样式就能够操作路由，同时能够结合实际的路由需要对路由进行必要整改就可以动手执行了。

##### Menu 导航菜单
导航菜单顾名思义就是左侧栏中的内容，在`BasicLayout`中就是这段代码
```
<Menu
  theme="dark"
  mode="inline"
  {...menuProps}
  onOpenChange={this.handleOpenChange}
  selectedKeys={this.getCurrentMenuSelectedKeys()}
  style={{ margin: '16px 0', width: '100%' }}
>
  {this.getNavMenuItems(this.menus)}
</Menu>
```
核心函数封装成了`getNavMenuItems`，其操作的对象是`menus`属性，而在构造方法中对`menus`的值进行了初始化。综合来看梳理成如下过程：

1. 在`BasicLayout`的构造方法中，通过`getNavData`方法获取到`nav.js`中定义好的`data`。
2. `data`本身是数组，通过`reduce`（[官方中译文档](http://lzw.me/pages/ecmascript/#363)、[解读参考](http://www.zhangxinxu.com/wordpress/2013/04/es5%E6%96%B0%E5%A2%9E%E6%95%B0%E7%BB%84%E6%96%B9%E6%B3%95/#reduce)）方法和concat（[官方中译文档](http://lzw.me/pages/ecmascript/#346)）方法将数组规约成一个新的数组。新的数组是原数组中每个元素的`children`数组再拼装在一起组成的。换句话说，`nav`中定义的`data`，第一层级是布局（layout），布局的children是页面集合（第二层级），页面集合的children是业务页面（第三层级）。此处的转换就是将layout去掉，拼装成页面集合（第二层级）的数组。
3. 在`getNavMenuItems`函数中，对`menus`进行操作。对每一项（也就是页面集合）转换成一个`Menu.Item`。这是可以理解的。
4. `getNavMenuItems`函数从上到下核心做了5件事：1.判断有没有可显示的`name`，如果没有将返回`null`；2.给`item`制定`path`，也就是跳转路径，采用父子路径拼装的思路完成；3.如果存在`children`且存在`name`不为空，构造子菜单`SubMenu`；4.明确可显示的图标；5.拼装成`Menu.Item`
5. 在拼装`Item`过程中，涉及到了跳转路径`path`的构造、可显示的`name`、`icon`。

结合路由和导航就可以理解整个页面左侧导航栏的动态显示、通过导航栏的点击实现页面的路由过程。

##### 布局页面的其他关注点
在`BasicLayout`中还引入了`styles`，这是一个`less`文件。
> `Less` 是一门 CSS 预处理语言，它扩展了 CSS 语言，增加了变量、Mixin、函数等特性，使 CSS 更易维护和扩展。

因此只需要把[less](http://less.bootcss.com/)当成是基本的样式对待就好。虽然它有不少新的特性，但大多数情况下，styles都是出现在某个组件的`className`位置，以引用的方式加入进来（css的外联）。

有关[Link](http://www.ruanyifeng.com/blog/2016/05/react_router.html)、[Icon](https://ant.design/components/icon-cn/)等框架提供的组件，需要自行查阅相关API，`HeaderSearch`、`NoticeIcon`、`GlobalFooter`的用法在后续提到`components`的用法时再行展开。


#### 动态获取数据
在`BasicLayout`页面中进行动态加载数据就涉及到`React`的[组件生命周期](http://www.ruanyifeng.com/blog/2015/03/react.html)，相关资料也可参考[这里](https://doc.react-china.org/docs/state-and-lifecycle.html)，总之在`BasicLayout`页面中用到的就是`componentDidMount`函数进行数据动态加载的。这个函数核心只是调用了`dispatch`：
```
componentDidMount() {
  this.props.dispatch({
    type: 'user/fetchCurrent',
  });
}
```
此时就要引出前面提到的`dva`、`redux`相关的概念了。上文中提到了`app.model()`这个函数及其[参考](https://github.com/dvajs/dva/blob/master/docs/API_zh-CN.md#model)。接下来把整体逻辑串起来：

1. 通过`app.model()`方法，对`model`进行注册，这个[model概念](https://github.com/dvajs/dva/blob/master/docs/API_zh-CN.md#model)来自于`dva`。
2. `model`中的[effects部分](http://leonshi.com/redux-saga-in-chinese/docs/basics/DeclarativeEffects.html)，包装自`redux-saga`。
3. `this.props.dispatch`方法源自`redux`，见[这里](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)。
4. 在`model`注册时，其实就是注册了一系列的监听器，等待着被触发。
5. 在`dispatch`时，会接受一个 `Action` 对象作为参数，将它发送出去。关于redux的数据流程参见[这里](http://cn.redux.js.org/docs/basics/DataFlow.html)。
6. 以`'user/fetchCurrent'`为例，依照`dva`的逻辑会找到`model`中的`user`命名空间，并在其下找到`fetchCurrent`方法。因此，`dispatch`之后会触发`models/user.js`中的`fetchCurrent`方法。
7. 又通过`import`加载了`services/user.js`中的`queryCurrent`异步调用方法。
8. 在`services/user.js`中，`import`了`utils/request.js`，并调用了其中的`request`请求。并传递请求路径为`'/api/currentUser'`
9. 最终在`utils/request.js`中找到了`request`函数，其核心调用了`dva`的`fetch`函数进行url请求。
10. `dva`中的`fetch`包装自`isomorphic-fetch`，说明见[这里](https://github.com/dvajs/dva/blob/master/docs/API_zh-CN.md#dvafetch)。
11. 至此将发起`fetch`请求，向服务端请求相应的数据。以`queryCurrent`为例，将利用url：`'/api/currentUser'`。
12. 在`.roadhogrc.mock.js`中配置了代理，同时可以找到`/api/currentUser`请求返回的数据。后续不再赘述。

通过上述分析，可见关键点在1.`model`的撰写和注册；2.`dispatch`的正确调用；3.后台业务请求的封装。这涉及到了`models`、`services`目录内容及`utils/request.js`（由于这个文件主要完成的是底层封装，基本可以不去关注。以添加新的后台请求为例，需要完成：1.在`services`目录下定义好请求的url以及函数名称；2.将该后台请求添加到对应的`model`中。以添加新的数据加载为例，需要完成：1.在`models`目录下中定义新的`model`，注意`namespace`、`state`、`effects`、`reducers`、`subscriptions`的合理使用；2.如果涉及到后台请求数据需要引入`services`；3.在合理的事件处发起`dispatch`。需要注意的是`dispatch`的目录要与`model`的`namespace`相一致。

#### components目录
这个目录其实是抽象出来的一系列的业务通用组件。详细内容不再展开。包括`BasicLayout`中已经提到的`HeaderSearch`、`NoticeIcon`、`GlobalFooter`组件，实际上都是自行封装的结果。

#### e2e目录
这个目录是端到端测试的相关目录，相关信息可以从[这里](http://sentsin.com/web/658.html)了解一些。
由于不在主线学习范围之内暂不理会。

### 关于redux-auth-wrapper
这个项目的github地址在[这里](https://github.com/mjrussell/redux-auth-wrapper/)。

通过对这个项目demo的初步体验，感觉到它是基于redux的state进行设计的。先来说说state，这是驻留在浏览器内存中的一个数据结构，可以讲起理解为记录在浏览器（客户端）中的用户最新状态信息。redux-auth-wrapper的作用位置是route时，就是利用state中的信息验证用户是否可以进行跳转。这是对用户体验的一重优化。

### 有关图标

#### 扩展当前的图标

核心参考这篇[扩展教程](http://www.jianshu.com/p/2934316a5899)。

- Q：为什么需要用到扩展图标？
- A：阿里框架所使用的图标库，不足以满足实际开发需要。

- Q：阿里框架库中有哪些图标？
- A：阿里框架中的所有图标可以在ant design的资源列表中下载到，点击[这里](https://github.com/ant-design/ant-design/releases/download/resource/iconfont-2.10.x.zip)。

- Q：为什么在下载的图标库中有些图标找不到？如：dashboard，它出现在ant design pro的项目中，但是在图标库中却没有。
- A：因为ant design pro依赖的是ant-design-3.0.0-beta.5，阿里发布的图标库的版本号是2.10.x

- Q：如何找到最新的图标库？
- A：可以在ant-design代码库的tag中找到3.0.0-beta.5的代码中找到。其路径是components\style\core\iconfont.less中能够找到映射关系。当然阿里使用了一整套的图标（svg、ttf、woff、eot等多种格式，扫盲贴见[这里](https://zhuanlan.zhihu.com/p/28179203)），并用css和js完成适配映射，将图标映射成16进制的unicode，并指定相应的class代码。只要确保工程项目中使用到的图标库中存在某个图标，就可以直接在项目中使用相应的unicode代码或class代码。如果工程项目中使用到了第三方图标，可以对其扩展。

- Q：如何依照阿里的icon框架进行图标扩展？
- A：参考[扩展教程](http://www.jianshu.com/p/2934316a5899)。

- Q：还有哪些值得参考的与ant design图标有关的资料？
- A：1.[图标设计规范](https://ant.design/docs/spec/icon-cn)；2.[本地部署 Iconfont 示例](https://github.com/ant-design/antd-init/tree/master/examples/local-iconfont)；3.[antd图标库2.10.x](https://ant.design/components/icon-cn/)；4.[内网环境使用离线Icon图标资源](http://blog.csdn.net/xiaoyu19910321/article/details/73750061)

- Q：在adp项目中应该怎么操作？
- A：由于我们的工程打包环境是可以联网的，因此不需要进行离线Icon设置，也不需要完成Iconfont的本地部署。只需要按照[扩展教程](http://www.jianshu.com/p/2934316a5899)进行新组建的扩充即可。在扩充时用[iconfont](http://iconfont.cn/)添加新的icon，然后构造成相应的图标库，在下载到对应位置即可。鉴于已完成基础性操作，后续添加新图标的流程：1.在iconfont的图标库中添加新的图标；2.将图标库下载下来覆盖项目图标目录`/public/fonts/iconfont`；3.在项目中使用图标代码。

#### React Developer Tools

- Q：react的源代码通过编译组成了普通html、css代码。那怎样在浏览器中查看对应的源代码?
- A：使用React Developer Tools可以辅助在chrome中查看源代码，参见[这里](http://www.cnplugins.com/devtool/react-developer-tools/)。

- Q：相关链接
- A：chrome插件[下载地址](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=zh-CN)

#### 有关样式的几个注意事项

- Q：如何在ant design的样式代码中使用css常用的'-'？如：“font-size”
- A：此处核心遇到的是js中的'.'取值与'[]'取值的区别，参考[这里的解答](http://bbs.csdn.net/topics/391963666)。

- Q：ant design中推荐哪种方式编写样式？
- A：ant design中推荐使用驼峰式的样式书写，如：'fontSize'。同时这个框架中大量使用了'.'操作符进行对象操作，使用import语法进行整个的代码组织。

- Q：在引用样式时传统的写法可以使用多个classname，如`class="csdn-toolbar csdn-toolbar-skin-black "`，在ant design中怎样使用多个样式？
- A：使用composes，参考[这里](http://www.ruanyifeng.com/blog/2016/06/css_modules.html)的`Class 的组合`章节。

- Q：还有哪些注意事项？
- A：1.在ant design的框架下推荐XXX.js文件与XXX.css（或XXX.less）文件放在一起，而不是使用分开的css、html、js目录分别管理不同类型的文件。这是源自react的模块化管理的思想。2.CSS Modules是ant design中默认使用。简要介绍见[这里](http://www.ruanyifeng.com/blog/2016/06/css_modules.html)。

- Q：为什么样式会变成类似于`class="globalFooter___1cM92"`？
- A：因为CSS Modules定义了局部作用域的概念，为达到局部作用效果，构建工具会对class的name进行哈希操作，使类名变成独一无二。常用工具就是webpack，而使用的插件是[css-loader](https://github.com/webpack/css-loader#css-modules)。

#### 关于数据查询的方法

- Q：如何制定模拟的数据请求？
- A：ant design pro中使用了mock。可以在.roadhogrc.mock.js中进行数据请求配置。比如`'GET /api/testapi'`是新添加的模拟数据请求。可以尝试在浏览器中访问这个url：`http://localhost:8000/api/testapi`，确认该接口可以访问数据。

- Q：在ant design pro中如何发起数据请求？
- A：在services目录中的文件添加一个request请求。如：`export async function queryTestData(){  return request('/api/testapi'); }`就在js中定义了一个request，发起相应的request请求。因此，就可以在需要请求数据的位置直接调用`queryTestData`方法。

- Q：可不可以在页面点击事件中直接调用`queryTestData`方法？ant design pro中为什么没用这种方法？
- A：首先，这种调用方法是基础的调用，是可以在页面布局中引入相应的文件直接调用这个函数的。ant design pro中遵从了react和redux的设计理念，承认component的模块化设计理念，并加强浏览器缓存的管理。

- Q：ant design pro设计框架中在哪里调用`queryTestData`方法？
- A：在models中进行调用。

- Q：那models有什么含义？
- A：在浏览器的缓存中，每个component都有其自身的state（这是redux里的基础概念），也就是缓存。而models就是缓存进行对象化管理的抽象。因此可以把models中的model看作是不同的业务对象。而每个业务对象都可以按对象逻辑调用service方法。如在models/user.js中进行如下调用：
```
*fetchTestData(_, { call, put }){
  const response = yield call(queryTestData);
  yield put({
    type: 'returnTestData',
    payload:response,
  });
}
```

- Q：fetchTestData函数书写有什么值得注意的地方？
- A：1.这个函数写在model中，model的概念来自于dva，见[这里](https://github.com/dvajs/dva/blob/master/docs/API_zh-CN.md#model)，同时其概念解释见[这里](https://github.com/dvajs/dva/blob/master/docs/Concepts_zh-CN.md)。2.要充分理解model的概念，才能更合理书写和调用相关函数。3.model的概念还整合了redux-saga的设计理念。4.model中的effects设计来源于redux-saga的设计，参考[这里](http://leonshi.com/redux-saga-in-chinese/docs/basics/DeclarativeEffects.html)。5.effects部分中使用了星号和yield关键字，是源自于ES6中的[Generator语法](http://es6.ruanyifeng.com/#docs/generator)，以及[异步调用](http://es6.ruanyifeng.com/#docs/generator-async)，因此只需要认识到[星号标识了这不是普通函数，是可以暂停执行的，加星号以示区别](http://www.ruanyifeng.com/blog/2015/04/generator.html)；yield标识此处可以暂停，并在获得执行权时从此处开始执行，调用方式参考[文档](http://www.ruanyifeng.com/blog/2015/04/generator.html)里的next调用。6.call和put来自于[redux-saga](http://leonshi.com/redux-saga-in-chinese/index.html)（是Redux异步操作的中间件），更全的redux接口见[这里](http://leonshi.com/redux-saga-in-chinese/docs/api/index.html)。7.call实际上就是创建了一条描述结果的信息（上例中的含义就是异步（yield）调用queryTestData，调用完成后（call）将结果赋值给response）。8.put实际上是用来创建dispatch Effect的（上例中的含义就是异步（yield）调用returnTestData，并传递参数response），可从[这里](http://www.jianshu.com/p/69f13e9123d9)、[这里](https://github.com/dvajs/dva/blob/master/docs/Concepts_zh-CN.md)以及[这里](http://leonshi.com/redux-saga-in-chinese/docs/basics/DispatchingActions.html#)了解更多的信息。

- Q：model中如何改变相关状态？
- A：model的状态存储在state对象中，在示例中我们添加了`testdata:{},`对象。依照redux的设计理念，所有对状态的修改都应该在reducer中完成。因此model中的reducers部分就是定义一系列修改state的函数，如：queryTestData函数。

- Q：model中的state和action是什么？
- A：其中state是函数调用前的状态，而action就是dispatch发出的action。

- Q：model中的状态信息（state）怎么在页面中使用？
- A：通过connect函数（来自于[react-redux](http://www.redux.org.cn/docs/react-redux/quick-start.html)），其实connect设计的初衷就是把容器组件与redux相连接。其更多使用方法见[这里](http://www.redux.org.cn/docs/react-redux/quick-start.html)。在示例中，就是通过
```
@connect(state => ({
  chart: state.chart,
  testdata: state.user.testdata,
}))
```
方法将redux中的state连接到了这个页面（容器组件）中。通过这句话`testdata: state.user.testdata,`就将全局state中命名空间（namespace）为user下的状态（state）属性testdata对象与容器组件中的testdata属性（存在于props中）相关联。

- Q：怎样把容器组件中的属性与页面显示相关联？
- A：通过`const { chart,testdata } = this.props;`这句话能够把属性（props）中的对象testdata解析出来。在页面上通过`{testdata.name}`将相应的值取出来。

#### 例：Analysis页面折线图切换

```
<Card
  loading={loading}
  className={styles.offlineCard}
  bordered={false}
  bodyStyle={{ padding: '0 0 32px 0' }}
  style={{ marginTop: 32 }}
>
  <Tabs
    activeKey={activeKey}
    onChange={this.handleTabChange}
  >
    {
      offlineData.map(shop => (
        <TabPane
          tab={<CustomTab data={shop} currentTabKey={activeKey} />}
          key={shop.name}
        >
          <div style={{ padding: '0 24px' }}>
            <TimelineChart
              data={offlineChartData}
              titleMap={{ y1: '客流量', y2: '支付笔数' }}
            />
          </div>
        </TabPane>)
      )
    }
  </Tabs>
</Card>
```

- Q：怎样从接口中获取数据？
- A：涉及到数据获取的部分有两个对象：offlineData、offlineChartData。这两个对象都是通过如下方法实现的数据调用，详细过程见'关于数据查询的方法'部分
```
  componentDidMount() {
    this.props.dispatch({
      type: 'chart/fetch',
    }).then(() => this.setState({ loading: false }));
  }
```

- Q：`currentTabKey`怎样在页面实现数值传递？
- A：先明确页面加载时会调用的几个函数：`componentDidMount`、`componentWillUnmount`、`render`。这涉及到react组件的生命周期概念，参考[这里的简介](http://www.jianshu.com/p/4784216b8194)。现在只需要知道：
`componentDidMount()`方法会在组件（所谓组件就是`Component`）挂在之后调用一次；
`componentWillUnmount()`方法会在组件被卸载时调用。；
`render()`有四种触发场景，详情不赘述，只需知道页面中调用`this.setState`方法是会触发当前组件的更新。
可以看出如下过程：
1.组件初始化时定义了`currentTabKey`变量，并赋值为''；
2.在初始化时最后调用了`render`方法，依据`currentTabKey`给`activeKey`进行赋值；
3.在真正渲染时通过`activeKey`设置`Tabs`的`activeKey`属性并传值给`CustomTab`组件；
4.在`Tabs`组件被点击时通过`onChange`方法回调`handleTabChange`函数；
5.在回调函数中通过`this.setState`将`state`中的`currentTabKey`值修改；
6.`this.setState` 触发了`render`函数被再次调用。

- Q：还有哪些是值得关注的点？
- A：`TabPane`的变量通过`const { TabPane } = Tabs;`从`Tabs`中析取出来，也就是说`TabPane`是定义在`Tabs`中的一个子组件；
`CustomTab`是一个自定义组件，由于其在`Tab`的页签位置，同时使用了`ReactNode`来做页签，因此需要自行控制选中状态，由此`theme={(currentKey !== data.name) && 'light'}`和`color={(currentKey !== data.name) && '#BDE4FF'}`就是在控制相应的样式。



### 相关链接整理
#### 很有用的单独说一遍
[dva：github项目](https://github.com/dvajs/dva)<br>
[React中文文档](https://doc.react-china.org/)<br>
[React 入门实例教程（阮一峰）](http://www.ruanyifeng.com/blog/2015/03/react.html)<br>
[Redux 入门教程（一）：基本用法（阮一峰）](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)<br>
[Redux 中文文档](http://cn.redux.js.org/index.html)<br>
[Redux-saga 中文文档](http://leonshi.com/redux-saga-in-chinese/index.html)<br>
[Redux 三重境](https://zhuanlan.zhihu.com/p/26485702)<br>
[ECMAScript 6 入门](http://es6.ruanyifeng.com/)<br>
[React Router 中文文档](http://react-guide.github.io/react-router-cn/index.html)<br>
[React Router 使用教程（阮一峰）](http://www.ruanyifeng.com/blog/2016/05/react_router.html)<br>
[Ant Design 指引](https://ant.design/docs/spec/introduce-cn)<br>

#### 全
[dva：github项目](https://github.com/dvajs/dva)<br>
[dva：React+Redux最佳实践](https://github.com/sorrycc/blog/issues/1)<br>
[dva：中文Readme](https://github.com/dvajs/dva/blob/master/README_zh-CN.md)<br>
[dva：中文API](https://github.com/dvajs/dva/blob/master/docs/API_zh-CN.md)<br>
[一起学react (1) 10分钟 让你dva从入门到精通](http://www.jianshu.com/p/69f13e9123d9)<br>
[初识 Dva](https://juejin.im/entry/5852184b128fe1006b5454c6)<br>
[dva源码解析（一）](http://www.zhimengzhe.com/Javascriptjiaocheng/325894.html)<br>
[dva 入门：手把手教你写应用](http://www.codesec.net/view/449505.html)<br>
<br>
[React中文文档](https://doc.react-china.org/)<br>
[React：State&生命周期](https://doc.react-china.org/docs/state-and-lifecycle.html)<br>
[React：组件 & Props](https://doc.react-china.org/docs/components-and-props.html)<br>
[React 入门实例教程（阮一峰）](http://www.ruanyifeng.com/blog/2015/03/react.html)<br>
[React PureComponent源码解析](https://segmentfault.com/a/1190000006741060)<br>
[ReactJS分析之入口函数render](http://www.cnblogs.com/accordion/p/4501118.html)<br>
[谈一谈创建React Component的几种方式](http://www.cnblogs.com/Unknw/p/6431375.html)<br>
[React Dom](https://doc.react-china.org/docs/react-dom.html)<br>
<br>
[Redux 入门教程（一）：基本用法（阮一峰）](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)<br>
[Redux 关于react-redux中的connect用法介绍及原理解析](http://www.jianshu.com/p/9873d4ccb891)<br>
[Redux 中文文档](http://cn.redux.js.org/index.html)<br>
[Redux 数据流](http://www.jianshu.com/p/faee4de8e092)<br>
[Redux-saga 中文文档](http://leonshi.com/redux-saga-in-chinese/index.html)<br>
[Redux-saga 实践总结](https://segmentfault.com/a/1190000007261052)<br>
[Redux 三重境](https://zhuanlan.zhihu.com/p/26485702)<br>
[实例讲解基于 React+Redux 的前端开发流程](http://blog.csdn.net/fengyinchao/article/details/51566555)<br>
<br>
[ECMAScript 6 入门](http://es6.ruanyifeng.com/)<br>
[ES5中新增的Array方法详细说明](http://www.zhangxinxu.com/wordpress/?p=3220)<br>
[Ecma标准](http://lzw.me/pages/ecmascript/)<br>
[Lodash 中文文档](http://www.css88.com/doc/lodash/)<br>
[exports 和 module.exports 的区别](http://cnodejs.org/topic/5231a630101e574521e45ef8)<br>
[ES6：export default 和 export 区别](http://www.jianshu.com/p/edaf43e9384f)<br>
[fetch的用法](http://www.51xuediannao.com/javascript/fetchdyf_1142.html)<br>
[React 语法之let和const命令](http://blog.csdn.net/xiangzhihong8/article/details/52366380)<br>
[ES6展开运算符](https://segmentfault.com/a/1190000007022442)<br>
<br>
[React Router](https://reacttraining.com/react-router/)<br>
[React Router 中文文档](http://react-guide.github.io/react-router-cn/index.html)<br>
[React Router 使用教程（阮一峰）](http://www.ruanyifeng.com/blog/2016/05/react_router.html)<br>
[React Router Redirect](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/Redirect.md)<br>
[path-to-regexp](https://www.npmjs.com/package/path-to-regexp)<br>
[Path-to-RegExp 使用](https://www.villainhr.com/page/2017/05/13/Path-to-RegExp%20%E4%BD%BF%E7%94%A8)<br>
<br>
[Ant Design 指引](https://ant.design/docs/spec/introduce-cn)<br>
[Ant Design of React](https://ant.design/docs/react/introduce-cn)<br>
[Ant Design Pro教程](https://pro.ant.design/docs/getting-started)<br>
[自定义主题开发中，修改theme.js需要重启](https://segmentfault.com/q/1010000007899143)<br>
[如何评价 Ant Design 这个项目（一个设计语言）？](https://www.zhihu.com/question/33629737/answer/148582778)<br>
[Ant Design源码分析（一）：Icon组件](https://segmentfault.com/a/1190000010416622)<br>
<br>
[roadhog](https://www.npmjs.com/package/roadhog)<br>
[less 快速入门](http://less.bootcss.com/)<br>
[Less简介及简单用法](http://blog.csdn.net/turingty/article/details/49851543)<br>
[Babel 入门教程（阮一峰，<s>不知何故他已经在自己的博客中删除了，只能从archive找到</s>）](https://web.archive.org/web/20170707232725/http://www.ruanyifeng.com/blog/2016/01/babel.html)<br>
[stylelint初体验](https://segmentfault.com/a/1190000006237659)<br>
[JS/React 开发者的 Atom 终极配置](https://segmentfault.com/a/1190000009600026)<br>
[自动化e2e测试 -- WebDriverJS，Jasmine和Protractor](http://sentsin.com/web/658.html)<br>
[Webpack单元测试，e2e测试](http://www.cnblogs.com/cqhaibin/p/6581350.html)<br>
[怎么为大中型的vue.js项目编写e2e测试？](https://www.zhihu.com/question/51764943)<br>
[Atom编辑器折腾记_(23)加快React开发的插件汇总](http://blog.csdn.net/crper/article/details/52196675)<br>
[Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)<br>
[react&webpack使用css、less && 安装原则 --- 从根本上解决问题。](http://www.cnblogs.com/zhuzhenwei918/p/7231418.html)<br>
[less-loader](https://doc.webpack-china.org/loaders/less-loader/)<br>
[webpack-中文文档](https://doc.webpack-china.org/)<br>
[React中的DOM操作](http://www.jianshu.com/p/c401e417bd8a)<br>
[编辑器配置](http://www.jianshu.com/p/712cea0ef70e)<br>
[js代码检测工具](http://www.jianshu.com/p/2bcdce1dc8d4)<br>
[css代码审查配置](http://www.jianshu.com/p/1d974ae2a7dc)<br>
[git版本配置](http://www.cnblogs.com/haiq/archive/2012/12/26/2833746.html)<br>
[travis持续构建工具配置](http://www.jianshu.com/p/c80b37f775a0)<br>
[roadhog配置](https://www.npmjs.com/package/mg-roadhog)<br>
[web前端项目配置文件](http://javascript.ruanyifeng.com/nodejs/packagejson.html)<br>
[jest](http://www.jianshu.com/p/a656a5459e73)<br>
[lint](https://segmentfault.com/a/1190000009546913)<br>
[如何配置 antd theme  的例子](https://github.com/dvajs/dva-example-user-dashboard/commit/d6da33b3a6e18eb7f003752a4b00b5a660747c31)<br>
[dva-hmr](https://www.npmjs.com/package/babel-plugin-dva-hmr)<br>
[babel-plugin-import](http://blog.csdn.net/qq_35809834/article/details/72670220)<br>
[babel-preset-env](https://www.npmjs.com/package/babel-preset-env)<br>
[babel-preset-react](https://www.npmjs.com/package/babel-preset-react)<br>
[transform-decorators-legacy](https://www.npmjs.com/package/babel-plugin-transform-decorators-legacy)<br>
[transform-class-properties](https://www.npmjs.com/package/babel-plugin-transform-class-properties)<br>
[transform-runtime](http://babeljs.io/docs/plugins/transform-runtime/)<br>
[antd](http://npm.taobao.org/package/babel-plugin-antd)<br>
