const express = require('express')
const router = express.Router()

const Record = require('../../models/record')

// set create route
router.get('/new', (req, res) => {
  return res.render('new')
})

// Creating  the create router
router.post('/', (req, res) => {
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
