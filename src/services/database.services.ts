import { Collection, Db, MongoClient, ServerApiVersion } from 'mongodb'
import dotenv from 'dotenv'
import User from '~/models/schemas/User.schema'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
import { envConfig } from '~/constants/config'
import Word from '~/models/schemas/Word.schema'
import Topic from '~/models/schemas/Topic.schema'
import FavoriteWord from '~/models/schemas/FavoriteWord.schema'
import NewWord from '~/models/schemas/NewWord.schema'
import { LearnedWord } from '~/models/schemas/LearnedWord.schema'
import { LearnedPackage } from '~/models/schemas/LearnedPackage.schema'
import Feedback from '~/models/schemas/Feedback.schema'
import Statistic from '~/models/schemas/Statistic.schema'
dotenv.config()
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@signlanguagecluster.dcsmszh.mongodb.net/?retryWrites=true&w=majority&appName=SignLanguageCluster`

class DatabaseService {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(process.env.DB_NAME)
  }
  async connect() {
    try {
      // Send a ping to confirm a successful connection
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.log('Database Error:', error)
    }
  }
  async createIndexes() {
    await Promise.all([this.indexWords(), this.indexNewWords()])
  }
  async indexWords() {
    const exists = await this.words.indexExists(['name_text'])
    if (!exists) {
      this.words.createIndex(
        {
          name: 'text'
        },
        { default_language: 'none' }
      )
    }
  }
  async indexNewWords() {
    const exists = await this.newWord.indexExists(['name_text'])
    if (!exists) {
      this.newWord.createIndex(
        {
          name: 'text'
        },
        { default_language: 'none' }
      )
    }
  }
  // async indexTweets() {
  //   const exists = await this.tweets.indexExists(['content_text'])
  //   if (!exists) {
  //     this.tweets.createIndex(
  //       {
  //         content: 'text'
  //       },
  //       { default_language: 'none' }
  //     )
  //   }
  // }
  get users(): Collection<User> {
    return this.db.collection(envConfig.dbUsersCollection as string)
  }
  get refreshTokens(): Collection<RefreshToken> {
    return this.db.collection(envConfig.dbRefreshTokensCollection as string)
  }

  get words(): Collection<Word> {
    return this.db.collection(envConfig.dbWordsCollection as string)
  }
  get topics(): Collection<Topic> {
    return this.db.collection(envConfig.dbTopicsCollection as string)
  }
  get favoriteWord(): Collection<FavoriteWord> {
    return this.db.collection(envConfig.dbFavoriteWordsCollection as string)
  }
  get newWord(): Collection<NewWord> {
    return this.db.collection(envConfig.dbNewWordsCollection as string)
  }
  get learnedWord(): Collection<LearnedWord> {
    return this.db.collection(envConfig.dbLearnedWordCollection as string)
  }
  get learnedPackage(): Collection<LearnedPackage> {
    return this.db.collection(envConfig.dbLearnedPackageCollection as string)
  }
  get feedBack(): Collection<Feedback> {
    return this.db.collection(envConfig.dbFeedbackCollection as string)
  }
  get statistic(): Collection<Statistic> {
    return this.db.collection(envConfig.dbStatisticCollection as string)
  }
}
const databaseService = new DatabaseService()
export default databaseService
