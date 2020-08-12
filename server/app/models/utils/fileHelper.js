const fs = require('fs')
class FileHelper {
  static jsonTransfer(path,source) {
     //将一个json文件变成另一个json文件 进行替换操作
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) throw err
      let target = JSON.parse(data)//源对象
      const returnObj = Object.assign(target,source)
      let newContent = JSON.stringify(target);
      fs.writeFile(path, newContent, 'utf8', (err) => {
        if (err) throw err;
        console.log('success done');
      });
    })
  }
}
module.exports = {
  FileHelper
}