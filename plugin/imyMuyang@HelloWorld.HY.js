const API = require('../API/imyMuyang@API');
const QQ = require('../API/OneBot@Bot');
const TG = require('../API/Telegram@bot');
const events = require('events');
const Bot = new events.EventEmitter();

module.exports = {
  getInfo,
  Bot,
};

Bot.on('HYBot > init', version => {
  // 插件初始化调用，请在此初始化您的插件
  return 0;
});

function getInfo() {
  // 插件基本信息 请填写以下信息（注：如果文件名与appId不对应将拒绝载入）
  var appInfo = new Object();
  appInfo.appId = 'imyMuyang@HelloWorld'; //appID 为每个插件唯一的标识符，格式为“作者@插件标识名”，如 imyMuyang@HelloWorld
  appInfo.author = 'imyMuyang'; // auther 即作者，应当为 appid 中 @ 前的部分。
  appInfo.version = '0.0.1'; // version 即版本，请使用语义化版本。https://semver.org/lang/zh-CN/
  return appInfo;
}

Bot.on('OneBot > privateMsg', event => {
  //使用Bot.on(type, event =>)来注册一个监听器，获取消息
  if (event.message == '你好') {
    QQ.sendPrivateMsg(event.user_id, '你好呀~');
  }
});

Bot.on('OneBot > groupMsg', event => {
  if (event.message == 'FlyOS') {
    QQ.sendGroupMsg(event.group_id, '嘿，如果你要打听FlyOS的话，恭喜你来对了地方！\n输入这些问题来探索FlyOS吧~\nFlyOS的作者是谁？\nFlyOS的官网是什么？\nFlyOS为什么这么牛？\n我应该怎么贡献FlyOS？');
  }
  if (event.message == 'FlyOS的作者是谁？') {
    QQ.sendGroupMsg(event.group_id, 'FlyOS的作者就是我们超级无敌牛逼的群主，邢宇杰大大~[CQ:at,qq=2072769652]\n你也可以来https://github.com/jsun969/flyos获取作者的更多信息喵~');
  }
  if (event.message == 'FlyOS的官网是什么？') {
    QQ.sendGroupMsg(event.group_id, 'http://flyosgeek.com/ 不用谢我是雷锋awa');
  }
  if (event.message == 'FlyOS为什么这么牛？') {
    QQ.sendGroupMsg(event.group_id, '50w行代码打造中国原创精品OS，就是这么牛~');
  }
  if (event.message == '我应该怎么贡献FlyOS？') {
    QQ.sendGroupMsg(event.group_id, '很简单~\n1.star这个仓库\n2.给作者大大打冥币，一千万起步\n3.邀请更多技术大大来这个群');
  }
});
