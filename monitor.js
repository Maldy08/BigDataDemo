const { MongoClient } = require("mongodb");

// URL de conexión
const uri = "mongodb://localhost:27017"; // Cambia si usas Atlas
const client = new MongoClient(uri);

async function monitor() {
  try {
    await client.connect();
    const db = client.db("BigDataDemo");
    const collection = db.collection("temperatura_actual");

    // Activar Change Stream
    const changeStream = collection.watch();

    console.log("🛰️  Monitoreando cambios en la colección 'temperatura_actual'...");

    changeStream.on("change", (next) => {
      console.log("🔔 Cambio detectado:");
      console.log(JSON.stringify(next.fullDocument, null, 2));
    });

  } catch (error) {
    console.error(error);
  }
}

monitor();