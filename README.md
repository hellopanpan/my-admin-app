<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [xxx小程序](#xxx%E5%B0%8F%E7%A8%8B%E5%BA%8F)
  - [0 功能](#0-%E5%8A%9F%E8%83%BD)
  - [1 技术依赖](#1-%E6%8A%80%E6%9C%AF%E4%BE%9D%E8%B5%96)
  - [2 开发、测试、线上环境](#2-%E5%BC%80%E5%8F%91%E6%B5%8B%E8%AF%95%E7%BA%BF%E4%B8%8A%E7%8E%AF%E5%A2%83)
    - [2.1 本地开发调试](#21-%E6%9C%AC%E5%9C%B0%E5%BC%80%E5%8F%91%E8%B0%83%E8%AF%95)
    - [2.2 开发指南](#22-%E5%BC%80%E5%8F%91%E6%8C%87%E5%8D%97)
      - [2.2.1 分支规范](#221-%E5%88%86%E6%94%AF%E8%A7%84%E8%8C%83)
  - [发版流程、规范](#%E5%8F%91%E7%89%88%E6%B5%81%E7%A8%8B%E8%A7%84%E8%8C%83)
      - [2.2.2 开发约定](#222-%E5%BC%80%E5%8F%91%E7%BA%A6%E5%AE%9A)
      - [2.2.3 命名风格](#223-%E5%91%BD%E5%90%8D%E9%A3%8E%E6%A0%BC)
    - [2.4 上线后生成CHANGELOG](#24-%E4%B8%8A%E7%BA%BF%E5%90%8E%E7%94%9F%E6%88%90changelog)
  - [FAQ](#faq)
    - [taro 项目单位 PX 大写自动格式化成小写问题](#taro-%E9%A1%B9%E7%9B%AE%E5%8D%95%E4%BD%8D-px-%E5%A4%A7%E5%86%99%E8%87%AA%E5%8A%A8%E6%A0%BC%E5%BC%8F%E5%8C%96%E6%88%90%E5%B0%8F%E5%86%99%E9%97%AE%E9%A2%98)
  - [PS](#ps)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# xxx小程序

```
微信公众号平台账号密码：

appID：
```

## 0 功能

- 基于`taro`

## 1 技术依赖

- 基于`taro`

## 2 开发、测试、线上环境

### 2.1 本地开发调试

```
cnpm install
yarn dev / npm run dev

```

### 2.2 开发指南

#### 2.2.1 分支规范

## 发版流程、规范

为了保证项目的可维护性，请最好依照下面的步骤来进行发版标记。
TODO: 简化该发版流程，或者用 shell 脚本自动化

0. 切换到本次修改的分支，如`1.4.0--201207--feat_broker_biz_card_share`
1. `npm version x.x.x -m "release x.x.x 版本：版本简介" -no-git-tag-version`
   使用上述命令来更新 package.json 中的版本号。
2. `yarn changelog`
   使用该命令自动更新 changelog
3. `git-cz`
   将步骤 1、2 的改动提交。
   commit type = "ci" // 虽然并不属于 CI
   commit msg="release x.x.x 版本：版本简介"
4. `git tag vX.X.X`
   commit 更新后，重新生成一个 git tag
5. `git push`
   将本次发版的 git commit 推送到远程
6. `git push origin --tags`
   将本次发版的 git tag 推送到远程
7. 将改动同步到 dev、master 分支

#### 2.2.2 开发约定

- 代码提交工具：[git-cz](https://github.com/streamich/git-cz)
  - `npm install -g git-cz`
  - 用 `git-cz` 替代 `git commit`
- 代码风格控制：ESlint
- 尽量 TS
- 考虑到装饰器、继承等都属于类组件的概念，可以没必要过分追求 Hooks
- scss 的全局 mixin 和全局 variable 请写到 src/styles 下对应的文件里，同时不需要 import，这两个文件已经配置为全局的了。
- 代码适度简洁
- 写注释，写标记（TODO: FIXME:）

#### 2.2.3 命名风格

- Scss 里的 mixin、变量等都用短横线小写命名，如`horizontal-list`
  参考： [scss 文档](https://sass-lang.com/documentation/at-rules/mixin) [scss guide](https://www.kancloud.cn/kancloud/sass-guidelin/48083)
- 类名用 wrapper 还是 container？: 包裹单个元素的用 wrapper，包裹多个元素的用 container
  参考：[css tricks](https://css-tricks.com/best-way-implement-wrapper-css/)

### 2.4 上线后生成CHANGELOG

借助`conventional-changelog-cli`
```shell
yarn run changelog
```

## FAQ

### taro 项目单位 PX 大写自动格式化成小写问题

只要在上面写`/* prettier-ignore */`即可避免自动格式化成小写字母

```scss
/* prettier-ignore */
height: 44PX;
```

## PS

- [产品 wiki]()

- [接口 wiki]()

- [设计稿]()
