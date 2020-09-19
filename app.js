// 載入 express 並建構應用程式伺服器
const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000

const Record = require('./models/record')
const Category = require('./models/category')

require('./config/mongoose')

const methodOverride = require('method-override')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(methodOverride('_method'))

// 設定首頁路由
app.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(records => res.render('index', { records, Category }))
})

// 設定 port 3000
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})
