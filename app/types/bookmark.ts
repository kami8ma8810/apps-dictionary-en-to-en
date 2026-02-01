/** A word saved to bookmarks */
interface BookmarkedWord {
  id?: number
  word: string
  folderIds: number[]
  createdAt: Date
}

/** A folder for organizing bookmarked words */
interface Folder {
  id?: number
  name: string
  order: number
}

export type { BookmarkedWord, Folder }
