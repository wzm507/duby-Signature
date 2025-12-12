// 简单的邮件发送后端服务
import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

// 加载环境变量
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());

// 创建Nodemailer传输器
const transporter = nodemailer.createTransport({
  // 使用163邮箱配置
  host: process.env.SMTP_HOST || 'smtp.163.com',
  port: parseInt(process.env.SMTP_PORT) || 465,
  secure: true, // 使用SSL
  secureConnection: true, // 确保使用安全连接
  auth: {
    user: process.env.SMTP_USER || 'wzm2383983461@163.com', // 发件人邮箱
    pass: process.env.SMTP_PASS || 'QBU3CyYuriRcctd9' // 163邮箱授权码
  }
});

// 验证SMTP配置
console.log('开始验证SMTP配置...');
console.log('使用的SMTP配置:', {
  host: process.env.SMTP_HOST || 'smtp.163.com',
  port: parseInt(process.env.SMTP_PORT) || 465,
  user: process.env.SMTP_USER || 'wzm2383983461@163.com'
});
transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP验证失败:', {
      message: error.message,
      code: error.code,
      response: error.response,
      stack: error.stack
    });
  } else {
    console.log('SMTP验证成功:', success);
  }
});

// 发送邮件路由
app.post('/send-email', async (req, res) => {
  try {
    console.log('收到邮件发送请求:', JSON.stringify(req.body, null, 2));
    const { from_email } = req.body;

    if (!from_email) {
      console.log('请求缺少email参数');
      return res.status(400).json({ error: 'Email is required' });
    }

    // 设置邮件内容
    const mailOptions = {
      from: { name: '迪拜旗舰房产网站', address: 'wzm2383983461@163.com' }, // 发件人信息
      to: 'wzm2383983461@163.com', // 收件人邮箱
      subject: '迪拜旗舰房产网站 - 新客户咨询通知', // 邮件主题
      text: `迪拜旗舰房产网站
客户咨询通知

尊敬的管理员：

您的网站收到了新的客户咨询信息：

客户邮箱：${from_email}
咨询时间：${new Date().toLocaleString()}

请及时与客户联系。

这是系统自动生成的通知邮件，请勿直接回复。

---
迪拜旗舰房产网站`, // 邮件内容
      html: `<!DOCTYPE html>
<html>
<head>
    <title>迪拜旗舰房产网站 - 新客户咨询</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="border: 1px solid #eee; border-radius: 8px; padding: 20px; background-color: #fff;">
        <h2 style="color: #2c3e50; margin-top: 0;\ border-bottom: 1px solid #eee; padding-bottom: 10px;">迪拜旗舰房产网站</h2>
        <h3 style="color: #34495e;">新客户咨询通知</h3>
        
        <p>尊敬的管理员：</p>
        
        <p>您的迪拜旗舰房产网站收到了新的客户咨询信息，详情如下：</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>客户邮箱：</strong>${from_email}</p>
            <p style="margin: 10px 0;"><strong>咨询时间：</strong>${new Date().toLocaleString()}</p>
        </div>
        
        <p>请及时与客户取得联系，提供专业的房产咨询服务。</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #7f8c8d;">
            <p>这是系统自动生成的通知邮件，请勿直接回复。</p>
            <p>© 2024 迪拜旗舰房产网站</p>
        </div>
    </div>
</body>
</html>`
    }

    console.log('邮件选项:', JSON.stringify(mailOptions, null, 2));
    console.log('开始发送邮件...');
    // 发送邮件
    const info = await transporter.sendMail(mailOptions);
    console.log('邮件发送成功:', JSON.stringify(info, null, 2));
    console.log('Message ID:', info.messageId);
    res.status(200).json({ message: 'Email sent successfully', info: info.messageId });
  } catch (error) {
    console.error('邮件发送错误详情:', {
      message: error.message,
      code: error.code,
      name: error.name,
      response: error.response,
      stack: error.stack
    });
    res.status(500).json({ 
      error: 'Failed to send email',
      details: {
        message: error.message,
        code: error.code,
        name: error.name,
        response: error.response ? {
          status: error.response.status,
          message: error.response.response ? error.response.response : error.response.message
        } : null
      }
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
