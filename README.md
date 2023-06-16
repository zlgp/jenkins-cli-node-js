# node-jenkins-cli

jenkins is operated from the node command line

# Installation globally

npm i -g node-jenkin-cli

# Installation locally

npm i -S node-jenkin-cli

# Usage

## login

### login in jenkins

Options

- userName&nbsp;(string)&nbsp;: Jenkins user

- password&nbsp;(string)&nbsp;: Jenkins password

- host&nbsp;(string)&nbsp;: Jenkins host

## viewList

### Get view list

#### Result

```javascript
[
  {
    _class: "hudson.model.AllView",
    name: "前端",
    url: "http://×××/",
  },
];
```

## viewItem

### Get view list item

Options

- viewName&nbsp;(string)&nbsp;: view name

#### Result

```javascript
{
[
  {
    _class: 'hudson.model.AllView',
    name: 'all',
    url: 'http://×××/'
  }
  ],
  name: '前端',
  property: [],
  url: 'http://×××/view/%E6%B7%B1%E5%9C%B3%E5%89%8D%E7%AB%AF/'
}
```

## publish

### Build task

Options

- pipelineName&nbsp;(string)&nbsp;: Jenkins pipelineName

## buildList

### Get build list

#### Result

```javascript
[
  {
    currentExecutable: {
      _class: "hudson.model.FreeStyleBuild",
      url: "http://×××/job/pdm-web-2.3.x-publish/275/",
    },
  },
  { currentExecutable: null },
];
```

## stopBuild

### stop building

Options

- pipelineName&nbsp;(string)&nbsp;: Jenkins pipelineName

- buildNumber&nbsp;(number)&nbsp;: Jenkins buildNumber
