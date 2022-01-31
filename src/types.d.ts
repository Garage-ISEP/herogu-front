
export { }
declare global {
  interface Object {
    fromEntries: (entries: [string, any][]) => Object;
  }
}