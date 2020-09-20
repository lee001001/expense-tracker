const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

// set create route
router.get('/records/new', (req, res) => {
  Category.find()
    .lean()
    .then(categories => res.render('new', { categories }))
})

// Creating  the create router
router.post('/records', (req, res) => {
  // 接收 name category data amount 的參數
  const { name, date, categories, amount } = req.body
  const [category, icon] = categories.split('|')
  console.log('icon', icon)
  console.log('category', category)

  return Record.create({ name, category, date, amount, icon })
    .then(() => res.redirect('/'))
    .catch((err) => {
      console.log(err)
      res.sendStatus(404)
    })
})


module.exports = router
