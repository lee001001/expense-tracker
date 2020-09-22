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
  const categoryArry = category.split(',')
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

// ---- Updata Funcation------
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .lean()
    .then(records => {
      const selectedCategory = records.category
      Category.find()
        .lean()
        .sort({ _id: 'asc' })
        .then(category => {
          const filterCategory = category.filter(e => e.name !== selectedCategory)
          res.render('edit', { records, category: filterCategory })
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .then(records => {
      const { name, date, amount, category } = req.body
      const categoryArry = category.split(',')
      const data = {
        name,
        date,
        amount,
        category: categoryArry[0],
        icon: categoryArry[1]
      }
      Object.assign(records, data)
      return records.save()
    })
    .then(() => res.redirect('/'))
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
