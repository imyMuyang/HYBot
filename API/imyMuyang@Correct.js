// 用于手动校正一些错误的API返回数据，添加更多内容
module.exports = { check };
function check(messageData) {
  var returnData = messageData
  // if (messageData.group_id != null && messageData.raw_message != null) { // 校正莫名其妙的群消息被上报成私聊消息与群消息杂交出来的杂种的问题
  //   returnData.message_type = "group";
  // };
  return returnData;
};