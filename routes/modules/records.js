const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

// set create route
router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(category => {
      res.render('new', { category })
    })
})

// Creating  the create router
router.post('/', (req, res) => {
  // 接收 name category data amount 的參數
  const { name, date, category, amount } = req.body
  let categoryArry = category.split(',')
  Record.create({
    name,
    date,
    amount,
    category: categoryArry[0],
    icon: categoryArry[1]
  })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

// Delete
router.delete('/:id', (req, res) => {
  const id = req.params.id
  console.log('id', id)
  return Record.findById(id)
    .then(records => records.remove())
    .then(() => res.redirect('/'))
    .catch((err) => {
      console.log(err)
      res.sendStatus(404)
    })
})

module.exports = router
