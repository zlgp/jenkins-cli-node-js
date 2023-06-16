#!/usr/bin/env node
// 暂停构建
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
      message: "pipelineName",
      name: "pipelineName",
    },
    {
      type: "input",
      message: "buildNumber",
      name: "buildNumber",
    },
  ];
  inquirer.prompt(questions).then((res) => {
    let { pipelineName, buildNumber } = res;
    stopBuild(jenkins, pipelineName, buildNumber);
  });
});
async function stopBuild(jenkins, pipelineName, buildNumber) {
  const res = await jenkins.build.stop(pipelineName, buildNumber);
  console.log("success");
}
