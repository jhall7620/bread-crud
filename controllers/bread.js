const router = require('express').Router()
const Bread = require('../models/bread')
const Baker = require('../models/baker')

// GET all bread
router.get('/', async (req, res) =>{
    const breads = await Bread.find()
    const bakers = await Baker.find()
    res.render('index', {breads, bakers})
})

// GET render new page
router.get('/new', async (req, res) => {
    const bakers = await Baker.find()
    res.render('new', {bakers})
})

//GET bread by id
router.get('/:id', async (req, res) => {
    const {id} = req.params
    const bread = await Bread.findById(id).populate('baker')
    res.render('show', {
        bread
    })
    // res.send(Bread[index])
})

//GET bread by name
router.get('/name/:name', (req, res) => {
    const {name} = req.params
    const bread = Bread.find(b => b.name === name)
    res.send(bread)
})

//GET edit page
router.get('/:id/edit', async (req, res) => {
    const {id} = req.params
    const bread = await Bread.findById(id)
    const bakers = await Baker.find()
    res.render('edit', {
        bread,
        bakers
    })
})

//POST create a new bread
router.post('/', async (req, res) => {
    if(req.body.hasGluten === 'on'){
        req.body.hasGluten = true
    } else{
        req.body.hasGluten = false
    }

    if(!req.body.image){
        req.body.image = undefined
    }

    await Bread.create(req.body)
    res.redirect('/breads')
})

// PUT update a bread by index
router.put('/:id', async (req, res) => {
    const {id} = req.params
    if(req.body.hasGluten === 'on'){
        req.body.hasGluten = true
    } else{
        req.body.hasGluten = false
    }

    if(!req.body.image){
        req.body.image = 'https://images.unsplash.com/photo-1534620808146-d33bb39128b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
    }

    await Bread.findByIdAndUpdate(id, req.body)
    res.status(303).redirect(`/breads/${id}`)
})


// DELETE bread by id
router.delete('/:id', async (req, res) => {
    const {id} = req.params
    await Bread.findByIdAndDelete(id)
    res.status(303).redirect('/breads')
})

module.exports = router