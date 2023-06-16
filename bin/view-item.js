#!/usr/bin/env node
// 查看工作区里面的所有构建item
const Jenkins = require("jenkins");
// 文件操作模块
const fs = require("fs");
// 人机交互模块
const inquirer = require("inquirer");
fs.readFile("index.txt", (err, data) => {
  if (err) throw err;
  let { userName, password, host } = JSON.parse(data);
  const jenkins = new Jenkins({
    baseUrl: `http://${userName}:${password}@${host}`,
  });
  const questions = [
    // 构建空间名
    {
      type: "input",
      message: "viewName",
      name: "viewName",
    },
  ];
  inquirer.prompt(questions).then((res) => {
    let { viewName } = res;
    viewItem(jenkins, viewName);
  });
});
async function viewItem(jenkins, viewName) {
  const res = await jenkins.view.get(viewName);
  console.log(res, "res");
}
