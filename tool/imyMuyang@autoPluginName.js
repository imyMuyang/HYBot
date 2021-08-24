const API = require('../API/imyMuyang@API')
const fs = require('fs');

API.info("HYBot autoPluginName 1.0.0 By imyMuyang")
API.info("autoPluginName，将插件文件名自动修正的工具")

API.act("尝试读取插件文件夹内的插件信息");
for (let i = 0; i < fs.readdirSync("./plugin").length; i++) {
  API.info("正在读取插件 " + fs.readdirSync("./plugin")[i] + " 的基本信息");
  try {
    plugin = require("../plugin/" + fs.readdirSync("./plugin")[i]);
    API.act("重命名：" + fs.readdirSync("./plugin")[i] + " => " + plugin.getInfo().appId + ".HY.js")
    fs.renameSync("./plugin/" + fs.readdirSync("./plugin")[i], "./plugin/" + plugin.getInfo().appId + ".HY.js")
    API.info("插件 " + plugin.getInfo().displayName + " 已修改完成");
  } catch (error) {
    API.fatel("插件未公开 getInfo() 方法，或这不是一个插件。")
  }
}

process.exit();