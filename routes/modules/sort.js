const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/:category', (req, res) => {
  const sort = req.params.category
  Record.find()
    .lean()
    .then(records => {
      const filterRecords = records.filter(e => e.category === sort)
      let total = 0
      for (let i = 0; i < filterRecords.length; i++) {
        total += Number(filterRecords[i].amount)
      }
      Category.find()
        .lean()
        .sort({ _id: 'asc' })
        .then(category => {
          res.render('index', { total, category, records: filterRecords })
        })
    })
    .catch(error => console.log(error))
})

module.exports = router
