import express from 'express'
import usersRouter from './routes/users.routes'
import databaseService from './services/database.services'
import { envConfig } from './constants/config'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import wordsRouter from './routes/words.routes'
import topicsRouter from './routes/topics.routes'
import favoriteWordsRouter from './routes/favoriteWords.routes'
import newWordsRouter from './routes/newWords.routes'
import learnedWordsRouter from './routes/learnedWords.routes'
import learnedPackageRouter from './routes/learnedPackage.routes'
import feedbacksRouter from './routes/feedbacks.routes'
import statisticsRouter from './routes/statistic.routes'
const app = express()
const PORT = envConfig.port
databaseService.connect().then(() => {
  databaseService.createIndexes()
})
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello!')
})

app.use('/api/users', usersRouter)
app.use('/api/words', wordsRouter)
app.use('/api/topics', topicsRouter)
app.use('/api/favorite-words', favoriteWordsRouter)
app.use('/api/new-words', newWordsRouter)
app.use('/api/learned-words', learnedWordsRouter)
app.use('/api/learned-packages', learnedPackageRouter)
app.use('/api/feedbacks', feedbacksRouter)
app.use('/api/statistics', statisticsRouter)

//Error Handler must be place in the end of handlers
app.use(defaultErrorHandler)

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}!`)
})
