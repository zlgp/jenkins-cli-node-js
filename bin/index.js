#!/usr/bin/env node
const fs = require("fs");
// 人机交互模块
const inquirer = require("inquirer");
let questionList = [
  // 用户名
  {
    type: "input",
    message: "Username",
    name: "userName",
  },
  // 密码
  {
    type: "password",
    message: "Password",
    name: "password",
  },
  // 域名
  {
    type: "input",
    message: "Host",
    name: "host",
  },
];
inquirer.prompt(questionList).then((res) => {
  // 将信息存储起来
  fs.writeFile("index.txt", JSON.stringify(res), "utf8", function (error) {
    if (error) throw error
  });
});
