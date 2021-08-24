//#region 代码依赖
const API = require('./API/imyMuyang@API');
const correct = require('./API/imyMuyang@Correct');
const fs = require('fs');
const express = require('express');
const jsyaml = require('js-yaml');
const onebot = express();
const telegram = express();
const bodyParser = require('body-parser');
var plugin;
var emitType;
//#endregion

API.info('HYBot 0.0.1 Preview By imyMuyang');
API.info('为你明灯三千，为你花开满城，为你所向披靡。');

//#region 插件初始化
for (let i = 0; i < fs.readdirSync('./plugin').length; i++) {
  API.act('正在读取插件 ' + fs.readdirSync('./plugin')[i] + ' 的 基本信息');
  try {
    plugin = require('./plugin/' + fs.readdirSync('./plugin')[i]);
    if (fs.readdirSync('./plugin')[i] != plugin.getInfo().appId + '.HY.js') {
      API.fatel('插件 ' + fs.readdirSync('./plugin')[i] + ' 的文件名与appId不对应。请把文件名修改为appId后重新启动。');
    }
    plugin.Bot.emit('HYBot > init', '0.0.1');
    API.info('插件 ' + plugin.getInfo().appId + ' 已加载完成');
  } catch (error) {
    console.log(error);
    API.fatel('这不是插件或插件结构错误。');
  }
}
//#endregion

server();

function server() {
  API.act('正在启动 Bot 协议');
  API.warn('HYBot 的任何协议都在本地的端口上启用，如果想进行跨设备操作，请自行开放内网服务。');
  if (jsyaml.load(fs.readFileSync('./config/bot.yml')).QQ.enable == 'enable') {
    onebot.post('/', bodyParser.json(), (req, res) => {
      const messageData = correct.check(req.body); // 引入correct校正模块
      if (messageData.message_type == 'private') {
        // 私聊消息
        API.info('[QQ] ' + messageData.sender.nickname + '(' + messageData.user_id + ') 私聊 Bot => ' + messageData.raw_message);
        emitType = 'OneBot > privateMsg';
      } else if (messageData.message_type == 'group') {
        // 群聊消息
        API.info('[QQ] ' + messageData.group_id + ' | ' + messageData.user_id + ' 群聊 Bot => ' + messageData.raw_message);
        emitType = 'OneBot > groupMsg';
      } else {
        console.log(messageData);
        emitType = 'OneBot > unknown';
      }
      for (let i = 0; i < fs.readdirSync('./plugin').length; i++) {
        delete require.cache[require.resolve('./plugin/' + fs.readdirSync('./plugin')[i])];
        plugin = require('./plugin/' + fs.readdirSync('./plugin')[i]);
        try {
          plugin.Bot.emit(emitType, messageData);
        } catch (error) {
          console.log(error);
          API.fatel('未知错误');
        }
      }
      res.send('OK');
    });
    onebot.listen(jsyaml.load(fs.readFileSync('./config/bot.yml')).QQ.port);
    API.act('HYBot 的 OneBot 协议已在本地的 ' + jsyaml.load(fs.readFileSync('./config/bot.yml')).QQ.port + ' 端口上启用');
  } else {
    API.act('HYBot 的 OneBot 协议已禁用');
  }
  if (jsyaml.load(fs.readFileSync('./config/bot.yml')).TG.enable == 'enable') {
    telegram.post('/', bodyParser.json(), (req, res) => {
      const messageData = req.body;
      if (messageData.hasOwnProperty('message')) {
        if (messageData.message.hasOwnProperty('text')) {
          if (messageData.message.chat.type == 'private') {
            API.info('[TG] ' + messageData.message.from.username + '(' + messageData.message.from.id + ') 私聊 Bot => ' + messageData.message.text);
          } else if (messageData.message.chat.type == 'group') {
            API.info('[TG] ' + messageData.message.chat.title + '(' + messageData.message.chat.id + ') - ' + messageData.message.from.username + '(' + messageData.message.from.id + ') 群聊 Bot => ' + messageData.message.text);
          } else {
            API.info('[TG] ' + messageData.message.chat.title + '(' + messageData.message.chat.id + ') - ' + messageData.message.from.username + '(' + messageData.message.from.id + ') 超级群聊 Bot => ' + messageData.message.text);
          }
        } else if (messageData.message.hasOwnProperty('sticker')) {
          if (messageData.message.chat.type == 'private') {
            API.info('[TG] ' + messageData.message.from.username + '(' + messageData.message.from.id + ') 私聊 Bot => 表情包 ' + messageData.message.sticker.set_name);
          } else if (messageData.message.chat.type == 'group') {
            API.info('[TG] ' + messageData.message.chat.title + '(' + messageData.message.chat.id + ') - ' + messageData.message.from.username + '(' + messageData.message.from.id + ') 群聊 Bot => 表情包 ' + messageData.message.sticker.set_name);
          } else {
            API.info('[TG] ' + messageData.message.chat.title + '(' + messageData.message.chat.id + ') - ' + messageData.message.from.username + '(' + messageData.message.from.id + ') 超级群聊 Bot => 表情包 ' + messageData.message.sticker.set_name);
          }
        } else if (messageData.message.hasOwnProperty('photo')) {
          if (messageData.message.chat.type == 'private') {
            API.info('[TG] ' + messageData.message.from.username + '(' + messageData.message.from.id + ') 私聊 Bot => 图片');
          } else if (messageData.message.chat.type == 'group') {
            API.info('[TG] ' + messageData.message.chat.title + '(' + messageData.message.chat.id + ') - ' + messageData.message.from.username + '(' + messageData.message.from.id + ') 群聊 Bot => 图片');
          } else {
            API.info('[TG] ' + messageData.message.chat.title + '(' + messageData.message.chat.id + ') - ' + messageData.message.from.username + '(' + messageData.message.from.id + ') 超级群聊 Bot => 图片');
          }
        } else {
          return 0;
        }
      } else {
        console.log(messageData);
      }
      res.send('OK');
    });
    telegram.listen(jsyaml.load(fs.readFileSync('./config/bot.yml')).TG.port);
    API.act('HYBot 的 Telegram 协议已在本地的 ' + jsyaml.load(fs.readFileSync('./config/bot.yml')).TG.port + ' 端口上启用');
  } else {
    API.act('HYBot 的 Telegram 协议已禁用');
  }
}
