const express = require('express')

const { gifs } = require('../db')

const router = express.Router()

router.get('/', (req, res) => {
  res.json({
    message: '👋'
  })
})

router.get('/gifs', (req, res) => {
  gifs
    .find({}, ['id', 'text', 'allText', 'categories', 'images.fixed_height.url', 'images.fixed_height_small_still.url'])
    .then(all => res.json(all))
})

router.get('/gifs/:text', (req, res) => {
  const { text } = req.params

  gifs
    .find({
      allText: {
        $elemMatch: {
          $regex: text
        }
      },
    }, ['id', 'text', 'allText', 'categories', 'images.fixed_height.url', 'images.fixed_height_small_still.url']).then(all => res.json(all))
})

router.get('/gif/:id', (req, res) => {
  const { id } = req.params

  gifs
    .findOne({
      id
    }).then(all => res.json(all))
})

module.exports = router
