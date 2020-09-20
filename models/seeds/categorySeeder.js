//  需要Category的Model創建種子清單
const Record = require('../record')
const db = require('../../config/mongoose')
db.on('error', () => {
  console.log('mongoDB error！')
})
db.once('open', () => {
  console.log('mongoDB connected category:)')

  const promise = []
  promise.push(Record)
  Record.create(
    {
      CategoryName: '家居物業',
      icon: '<i class="fas fa-home"></i>'
    },
    {
      CategoryName: '交通出行',
      icon: '<i class="fas fa-shuttle-van"></i>'
    },
    {
      CategoryName: '休閒娛樂',
      icon: '<i class="fas fa-grin-beam"></i>'
    },
    {
      CategoryName: '餐飲食品',
      icon: '<i class="fas fa-utensils"></i>'
    },
    {
      CategoryName: '其他',
      icon: '<i class="fas fa-pen"></i>'
    }
  )
  //  全部完成
  Promise.all(promise).then(() => {
    db.close()
  })
})
