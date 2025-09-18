// eslint-disable-next-line @typescript-eslint/no-unused-vars
let db;
export function openDB() {
  const DBOpenRequest = self.indexedDB.open("toDoList");
  DBOpenRequest.onsuccess = () => {
    db = DBOpenRequest.result;
  };
}
