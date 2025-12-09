const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = 3000;

// 启用 CORS，允许前端页面跨域请求此服务器
app.use(cors());
// 解析 JSON 格式的请求体
app.use(express.json());

// 定义日志文件的路径
const LOG_FILE = path.join(__dirname, 'user_activity_log.txt');

// 辅助函数：写日志
function appendLog(message) {
    // 获取当前时间戳
    const timestamp = new Date().toLocaleString();
    const logContent = `[${timestamp}] ${message}\n`;

    // 1. 在 Node.js 后台控制台输出
    console.log(message); // 根据需求，控制台只输出核心内容，也可以加上时间

    // 2. 转存到 txt 文件内
    fs.appendFile(LOG_FILE, logContent, (err) => {
        if (err) {
            console.error('无法写入日志文件:', err);
        }
    });
}

// 路由：处理登录日志
app.post('/api/login', (req, res) => {
    const { username } = req.body;
    
    if (username) {
        // 需求：日志内容为：xxx已登录
        appendLog(`${username}已登录`);
        res.json({ status: 'success', message: 'Logged in' });
    } else {
        res.status(400).json({ status: 'error', message: 'Username missing' });
    }
});

// 路由：处理登出日志
app.post('/api/logout', (req, res) => {
    const { username } = req.body;

    if (username) {
        // 需求：日志内容为：xxx已登出
        appendLog(`${username}已登出`);
        res.json({ status: 'success', message: 'Logged out' });
    } else {
        res.status(400).json({ status: 'error', message: 'Username missing' });
    }
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`日志服务器正在运行，端口: ${PORT}`);
    console.log(`日志将保存在: ${LOG_FILE}`);
});