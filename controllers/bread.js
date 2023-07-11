const router = require('express').Router()
const bread = require('../models/bread')
const Bread = require('../models/bread')

router.get('/', (req, res) =>{
    res.render('index', {breads: Bread})
})

router.get('/new', (req, res) => {
    res.render('new')
})

router.get('/:index', (req, res) => {
    const {index} = req.params
    res.render('show', {bread: Bread[index]})
    // res.send(Bread[index])
})

router.get('/name/:name', (req, res) => {
    const {name} = req.params
    const bread = Bread.find(b => b.name === name)
    res.send(bread)
})

router.post('/', (req, res) => {
    if(req.body.hasGluten === 'on'){
        req.body.hasGluten = true
    } else{
        req.body.hasGluten = false
    }

    if(!req.body.image){
        req.body.image = 'https://images.unsplash.com/photo-1534620808146-d33bb39128b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
    }

    Bread.push(req.body)
    res.redirect('/breads')
})

module.exports = router