# 联系表单邮件发送配置说明

当前网站使用 **FormSubmit.co** 服务来处理联系表单的邮件发送功能。以下是配置和使用说明：

## 1. 激活FormSubmit.co服务

在使用之前，您需要激活FormSubmit.co服务：

1. 打开您的邮箱 `wzm2383983461@163.com`
2. 查找来自FormSubmit.co的验证邮件
3. 点击邮件中的验证链接激活服务

## 2. 表单功能说明

### 2.1 表单结构

联系表单包含：
- 邮箱输入框（必填，用于接收访客的联系方式）
- 发送按钮

### 2.2 邮件内容

当访客提交表单时，您将收到格式如下的邮件：

```
主题：Contact from Website Visitor

内容：
This is an email from a website visitor.
From: [访客邮箱地址]
```

## 3. 代码配置

### 3.1 前端代码

表单处理逻辑位于 `src/main.js` 文件中：

```javascript
// 使用Fetch API发送邮件到FormSubmit.co
const response = await fetch('https://formsubmit.co/ajax/wzm2383983461@163.com', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  body: JSON.stringify({
    subject: 'Contact from Website Visitor',
    message: 'This is an email from a website visitor.',
    from_email: email,
    _captcha: false
  })
});
```

### 3.2 FormSubmit.co配置参数

- `subject`：邮件主题
- `message`：邮件内容
- `from_email`：访客邮箱（表单中收集的）
- `_captcha`：是否启用验证码（设为false，简化用户体验）

## 4. 测试表单

要测试表单是否正常工作：

1. 确保您已经激活了FormSubmit.co服务
2. 在网站上填写联系表单并提交
3. 检查您的邮箱 `wzm2383983461@163.com` 是否收到测试邮件

## 5. 常见问题

### 5.1 邮件没有收到

- 检查是否已激活FormSubmit.co服务
- 检查邮箱的垃圾邮件文件夹
- 确保FormSubmit.co服务没有被邮箱服务商拦截

### 5.2 表单提交后没有反应

- 检查浏览器控制台是否有错误信息
- 确保网络连接正常
- 检查FormSubmit.co服务是否正常（可以访问其官网查看状态）

## 6. 替代方案

如果FormSubmit.co服务不满足需求，可以考虑以下替代方案：

### 6.1 自建后端服务

使用Node.js和Nodemailer创建简单的邮件发送服务：

```javascript
// 示例代码（需要安装nodemailer、express等依赖）
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.163.com',
  port: 465,
  secure: true,
  auth: {
    user: 'wzm2383983461@163.com',
    pass: 'YOUR_163_EMAIL_PASSWORD' // 163邮箱授权码
  }
});
```

### 6.2 其他邮件服务

- SendGrid
- Mailgun
- AWS SES

## 7. 注意事项

- FormSubmit.co免费版有发送限制，如需更多功能请考虑付费版本
- 不要在前端代码中暴露敏感信息（如邮箱密码等）
- 定期检查邮件发送功能是否正常工作

如果您有任何问题，请随时联系网站开发者。
