export interface LiveData {
  member: {
    name: string,
    icon: string,
  },

  streaming: {
    datetime: Date,
    url: string,
    thumbnail: string,
    now: boolean,
  },
}