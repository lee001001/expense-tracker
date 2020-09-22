const express = require('express')
const router = express.Router()

const home = require('./modules/home')
router.use('/', home)

const records = require('./modules/records')
router.use('/records', records)

const sort = require('./modules/sort')
router.use('/sort', sort)

module.exports = router
