const API = require('../API/imyMuyang@API');
module.exports = { receive };
function receive(data) {
  var event = new Array();
  var eventdata = new Object();
  eventdata.timeStamp = data.time;
  if ('message_type' in data) {
    if (data.message_type == "private") {
      event[0] = 'OneBot > chat-private';
      event[2] = API.quickReplace('[QQ] *-（*-） 私聊 Bot => *-', '*-', data.sender.nickname, data.user_id, data.message);
      eventdata.platform = 'OneBot';
      eventdata.eventType = 'chat-private';
      eventdata.fromUser = data.user_id;
      eventdata.message = data.message;
    }
  }

  eventdata.source = data;
  event[1] = eventdata;
  return event;
}
