const axios = require('axios');
const jsyaml = require('js-yaml');
const fs = require('fs');
const API = require('./imyMuyang@API');
var url;
module.exports = { sendPrivateMsg, sendGroupMsg };

async function sendPrivateMsg(uid, message, gid, autoEscape) {
  url = jsyaml.load(fs.readFileSync('./config/bot.yml')).QQ.APIServer + '/send_private_msg';
  url += '?user_id=' + uid + '&message=' + message;
  if (gid != null) {
    url += '&group_id=' + gid;
  }
  if (autoEscape == true) {
    url += '&autoEscape=true';
  }
  url = encodeURI(url);
  return axios.get(url).then(res => {
    API.act('[QQ] Bot 私聊 ' + uid + ' => ' + message);
    return res.data;
  });
}

async function sendGroupMsg(gid, message, autoEscape) {
  url = jsyaml.load(fs.readFileSync('./config/bot.yml')).QQ.APIServer + '/send_group_msg';
  url += '?group_id=' + gid + '&message=' + message;
  if (autoEscape == true) {
    url += '&autoEscape=true';
  }
  url = encodeURI(url);
  return axios.get(url).then(res => {
    API.act('[QQ] Bot 群聊 ' + gid + ' => ' + message);
    return res.data;
  });
}
