// 載入 express 並建構應用程式伺服器
const express = require('express')
const methodOverride = require('method-override')
const port = 3000
const app = express()

require('./confing/mongoose')
// 連線異常

app.use(methodOverride('_method'))

// 設定首頁路由
app.get('/', (req, res) => {
  res.send('hello world')
})

// 設定 port 3000
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})
