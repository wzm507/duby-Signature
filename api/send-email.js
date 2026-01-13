import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { from_email } = req.body;

    if (!from_email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.163.com',
      port: parseInt(process.env.SMTP_PORT) || 465,
      secure: true,
      secureConnection: true,
      auth: {
        user: process.env.SMTP_USER || 'wzm2383983461@163.com',
        pass: process.env.SMTP_PASS || 'QBU3CyYuriRcctd9'
      }
    });

    const mailOptions = {
      from: { name: '迪拜旗舰房产网站', address: 'wzm2383983461@163.com' },
      to: 'inquiry@signaturehomesuae.com',
      subject: '迪拜旗舰房产网站 - 新客户咨询通知',
      text: `迪拜旗舰房产网站
客户咨询通知

尊敬的管理员：

您的网站收到了新的客户咨询信息：

客户邮箱：${from_email}
咨询时间：${new Date().toLocaleString()}

请及时与客户联系。

这是系统自动生成的通知邮件，请勿直接回复。

---
迪拜旗舰房产网站`,
      html: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="border: 1px solid #eee; border-radius: 8px; padding: 20px; background-color: #fff;">
        <h2 style="color: #2c3e50; margin-top: 0; border-bottom: 1px solid #eee; padding-bottom: 10px;">迪拜旗舰房产网站</h2>
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
    };

    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully', info: info.messageId });
  } catch (error) {
    console.error('邮件发送错误:', error);
    res.status(500).json({ 
      error: 'Failed to send email',
      details: error.message
    });
  }
}
