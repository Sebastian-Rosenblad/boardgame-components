export function getNewID(ids: Array<string>): string {
  let newID: string = Math.random().toString(16).slice(2, 8);
  while (ids.includes(newID)) newID = Math.random().toString(16).slice(2, 8);
  return newID;
}
