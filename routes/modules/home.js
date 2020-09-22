const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

//  定義首頁路由
router.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(records => {
      let total = 0
      records.forEach(e => {
        total += Number(e.amount)
      })
      Category.find()
        .lean()
        .sort({ _id: 'asc' })
        .then(category => {
          res.render('index', { total, category, records })
        })
    })
    .catch(error => console.error(error))
})

module.exports = router
