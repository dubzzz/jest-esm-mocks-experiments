import { extname } from "path";

export function play() {
  return extname("toto.txt");
}
