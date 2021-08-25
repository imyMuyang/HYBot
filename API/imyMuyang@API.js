const dayjs = require('dayjs');
const chalk = require('chalk');

function info(message) {
  console.log(chalk.white(dayjs().format('[[]HH:mm:ss]') + ' [INFO] ' + message));
}

function error(message) {
  console.log(chalk.red(dayjs().format('[[]HH:mm:ss]') + ' [ERROR] ' + message));
}

function warn(message) {
  console.log(chalk.yellow(dayjs().format('[[]HH:mm:ss]') + ' [WARN] ' + message));
}

function fatel(message) {
  console.log(chalk.red('--------------------\n我们发生了一点致命的错误，程序即将退出。'));
  console.log(chalk.red(dayjs().format('[[]HH:mm:ss]') + ' [FATEL] ' + message));
  console.log(chalk.red('请向作者反馈 Bug，感谢您对 HYBot 的支持。\n--------------------'));
  process.exit();
}

function act(message) {
  console.log(chalk.blue(dayjs().format('[[]HH:mm:ss]') + ' [ACT] ' + message));
}

function confirm(message) {
  console.log(chalk.cyan(dayjs().format('[[]HH:mm:ss]') + ' [CONFIRM] ' + message));
}

function quickReplace(text, replacetext) {
  var returnData = text;
  console.log(arguments)
  if (arguments.length > 1) {
    for (let i = 0; i < arguments.length; i++) {
      returnData = text.replace(replacetext, arguments[i+2]);
    }
    return returnData;
  }
  return text;
}

module.exports = {
  info,
  warn,
  error,
  fatel,
  act,
  confirm,
  quickReplace
};
