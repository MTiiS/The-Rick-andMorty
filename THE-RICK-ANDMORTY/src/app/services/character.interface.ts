export interface Character {
  id: number,
  image: string,
  name: string,
  status: string,
  gender: string,
  location: { name: string },
  episode: Array<string>,
  firstSeen: string,
}
