const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

router.get('/category', (req, res) => {
  const filter = req.query.filter
  const userId = req.user._id
  if (filter.length === 0) { return res.redirect('/') }
  Record.find({ category: `${req.query.filter}`, userId })
    .lean()
    .then(records => {
      let totalAmount = 0
      const promise = []
      for (let i = 0; i < record.length; i++) {
        promise.push(record[i])
        totalAmount += Number(promise[i].amount)
      }
      let totalAmountFormat = numberFormat(totalAmount)

      res.render('index', { records, totalAmountFormat, filter })
    })
    .catch(error => console.log('error!'))
})

module.exports = router