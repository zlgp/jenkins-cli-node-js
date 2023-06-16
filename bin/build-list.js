#!/usr/bin/env node
// 查看正在构建的任务
// 文件操作模块
const fs = require("fs");
const http = require("http");
fs.readFile("index.txt", (err, data) => {
  if (err) throw err;
  let { host, userName, password } = JSON.parse(data);
  http.get(
    `http://${userName}:${password}@${host}/computer/api/json?tree=computer[executors[currentExecutable[url]],oneOffExecutors[currentExecutable[url]]]&xpath=//url&wrapper=builds`,
    (res) => {
      let data = "";
      res.on("data", (d) => {
        data += d;
      });
      res.on("end", () => {
        console.log(JSON.parse(data).computer[0].executors);
      });
    }
  );
});
