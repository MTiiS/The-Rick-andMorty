import { Character } from "./character";

export interface ApiData {
  results: Character [];
  info: any;
  error: string;
}