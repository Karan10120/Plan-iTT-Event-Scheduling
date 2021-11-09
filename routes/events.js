const express = require('express')
const Event = require('./../models/event')
const router = express.Router()

router.get('/new', (req, res) => {
    res.render('events/new', { event: new Event() })
})

router.get('/edit/:id', async (req, res) => {
    const event = await Event.findById(req.params.id)
    res.render('events/edit', { event: event })
})

router.get('/:slug', async (req, res) => {
    const event = await Event.findOne({ slug: req.params.slug })
    if (event == null) res.redirect('/')
    res.render('events/show', { event: event })
})

router.post('/', async (req, res, next) => {
    req.event = new Event()
    next()
}, saveEventAndRedirect('new'))

router.put('/:id', async (req, res, next) => {
    req.event = await Event.findById(req.params.id)
    next()
}, saveEventAndRedirect('edit'))

router.delete('/:id', async (req, res) => {
    await Event.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

function saveEventAndRedirect(path) {
    return async (req, res) => {
        let event = req.event
        event.title = req.body.title
        event.date = req.body.date
        event.time = req.body.time
        try {
            event = await event.save()
            res.redirect(`/events/${event.slug}`)
        } catch (e) {
            res.render(`events/${path}`, { event: event })
        }
    }
}

module.exports = router