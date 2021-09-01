import { Location } from "./location";


export interface Character {
  id: number;
  image: string;
  name: string;
  status: string;
  gender: string;
  location: Location;
  episode: Array<string>;
}
