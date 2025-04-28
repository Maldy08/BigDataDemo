// archivo: simulador_temperaturas.js

const { MongoClient } = require("mongodb");

// URL de conexión
const uri = "mongodb://localhost:27017"; // Cambia si usas Atlas

// Crear conexión
const client = new MongoClient(uri);

// Función principal
async function run() {
  try {
    await client.connect();
    const db = client.db("BigDataDemo");
    const collection = db.collection("temperatura_actual");

    setInterval(async () => {
      const nuevaTemperatura = {
        estacion_id: Math.floor(Math.random() * 4) + 1, // Estaciones 1 a 4
        fecha: new Date(),
        temperatura: parseFloat((Math.random() * 30 + 10).toFixed(1)) // Temperaturas entre 10 y 40 °C
      };

      await collection.insertOne(nuevaTemperatura);
      console.log("Insertado:", nuevaTemperatura);
    }, 1000); // Cada 5 segundos

  } catch (error) {
    console.error(error);
  }
}

run();