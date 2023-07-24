const router = require('express').Router()
const Baker = require('../models/baker')
const Bread = require('../models/bread')
const bakerSeedData = require('../models/bakerSeedData')
const breadSeedData = require('../models/breadSeedData')

router.get('/data/seed', async (req, res) => {
    await Promise.all([Baker.deleteMany(), Bread.deleteMany()])
    const bakers = await Baker.insertMany(bakerSeedData)
    const bakerIds = bakers.map(baker => baker._id)
    breadSeedData.forEach(bread => {
        const randomIndex = Math.floor(Math.random() * bakers.length)
        bread.baker = bakerIds[randomIndex]
    })
    await Bread.insertMany(breadSeedData)
    res.redirect('/breads')
})

router.get('/', async (req, res) => {
    const bakers = await Baker.find().populate('breads')
    res.json(bakers)
})

router.get('/:id', async (req, res) => {
    const {id} = req.params
    const baker = await Baker.findById(id).populate('breads')
    res.render('bakerShow', {baker})
})

router.delete('/:id', async (req, res) => {
    const {id} = req.params
    await Baker.findByIdAndDelete(id)
    res.redirect('/breads')
})

module.exports = router