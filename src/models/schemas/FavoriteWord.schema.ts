import { ObjectId } from 'mongodb'

interface FavoriteWordType {
  _id?: ObjectId
  idUser: ObjectId
  words: ObjectId[]
  created_at?: Date
  updated_at?: Date
}

export default class FavoriteWord {
  _id?: ObjectId
  idUser: ObjectId
  words: ObjectId[]
  created_at?: Date
  updated_at?: Date

  constructor(favoriteWord: FavoriteWordType) {
    const date = new Date()
    this._id = favoriteWord._id
    this.idUser = favoriteWord.idUser
    this.words = favoriteWord.words || []
    this.created_at = favoriteWord.created_at || date
    this.updated_at = favoriteWord.updated_at || date
  }
}
