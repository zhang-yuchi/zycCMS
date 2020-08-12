const rule = {
  host: [{
    required: true,
    message: "数据库地址不能为空",
    trigger: "blur"
  }],
  dbport: [{
    required: true,
    message: "数据库端口号不能为空",
    trigger: "blur"
  }],
  dbname:[{
    required:true,
    message:"数据库名称不能为空",
    trigger:"blur"
  }],
  username:[{
    required:true,
    message:"请输入用户名",
    trigger:"blur"
  }]
}
export default rule