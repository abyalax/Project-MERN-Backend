// Pilih database yang ingin dilihat
use('db_tokopedia');

// Menampilkan koleksi yang tersedia di database
const collections = db.getCollectionNames();
console.log("Collections in this database:", collections);

// Menampilkan struktur dari setiap koleksi
collections.forEach(collection => {
  const schema = db.getCollection(collection).findOne();
  console.log(`Schema of ${collection}:`, schema);
});
