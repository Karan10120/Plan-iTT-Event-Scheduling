const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')

const Event = require('./models/event')
const articleRouter = require('./routes/articles')
const eventRouter = require('./routes/events');
const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb+srv://process.env.DB_USERNAME:process.env.DB_PASSWORD@cluster0.w5kry.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

// app.get('/', async (req, res) => {
//   const events = await Event.find().sort({ createdAt: 'desc' })
//   res.render('events/index', { events: events })
// })


app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)
// app.use('/events', eventRouter)

app.listen(5000)
