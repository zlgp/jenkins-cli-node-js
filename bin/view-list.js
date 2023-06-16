#!/usr/bin/env node
// 查看所有的view,相当于是工作区
const Jenkins = require("jenkins");
const console = require('console');
// 文件操作模块
const fs = require("fs");
fs.readFile("index.txt", (err, data) => {
  if (err) throw err;
  let { userName, password, host } = JSON.parse(data);
  const jenkins = new Jenkins({
    baseUrl: `http://${userName}:${password}@${host}`,
  });
  ViewList(jenkins);
});
async function ViewList(jenkins) {
  const result = await jenkins.view.list();
  console.dir(result);
}
