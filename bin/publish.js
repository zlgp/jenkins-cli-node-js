#!/usr/bin/env node
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
      message: "PipelineName",
      name: "pipelineName",
    },
  ];

  inquirer.prompt(questions).then((res) => {
    let { pipelineName } = res;
    publish(jenkins, pipelineName);
  });
});

//轮询获取输出日志
function waitForBuildNumber(jenkins, buildId) {
  // 返回一个 Promise
  return new Promise(function (resolve, reject) {
    // 开启定时器做轮训
    const timer = setInterval(async function () {
      try {
        // 观察当然队列项
        const item = await jenkins.queue.item(buildId);
        if (item.executable) {
          // 得到 buildNumber 后，将结果 resolve 出去
          resolve(item.executable.number);
          // 清除定时器
          clearInterval(timer);
        } else if (item.cancelled) {
          // 构建取消，清除定时器
          clearInterval(timer);
          // reject Promise
          reject();
        }
      } catch (e) {
        reject(e);
      }
    }, 500);
  });
}

// 发布函数
async function publish(jenkins, name) {
  const buildId = await jenkins.job.build({ name });
  const buildNumber = await waitForBuildNumber(jenkins, buildId);
  const log = jenkins.build.logStream(name, buildNumber, "text", 2000);
  log.on("data", (text) => {
    process.stdout.write(text);
  });
  // 构建失败
  log.on("error", (err) => {
    console.log("error", err);
  });
  // 构建结束
  log.on("end", () => {
    console.log("end");
  });
}
