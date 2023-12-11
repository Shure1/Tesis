import * as SQLite from "expo-sqlite";
import * as a from "../../assets/plants/apple/manzano.jpeg";

export const db = SQLite.openDatabase("Tesis.db");

export const initBDD = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Derivados (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_planta INTEGER NOT NULL,
        id_enfermedad INTEGER NOT NULL,
        nombre TEXT NOT NULL,
        descripcion TEXT,
        protocolos TEXT,
        precauciones TEXT,
        FOREIGN KEY (id_planta) REFERENCES Planta (id),
        FOREIGN KEY (id_enfermedad) REFERENCES Enfermedades (id)
      )`,
      [],
      () => console.log("Tabla Derivados creada con éxito"),
      (error) => console.error("Error al crear la tabla Derivados", error)
    );

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Enfermedades (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        descripcion TEXT,
        sintomas TEXT,
        causas TEXT
      )`,
      [],
      () => console.log("Tabla Enfermedades creada con éxito"),
      (error) => console.error("Error al crear la tabla Enfermedades", error)
    );

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Planta (
        id INTEGER PRIMARY KEY,
        nombre TEXT(200) NOT NULL,
        nombre_cientifico TEXT, 
        imagen TEXT,
        descripcion TEXT,
        recomendaciones TEXT 
      )`,
      [],
      () => {
        console.log("Tabla Planta creada con éxito");
      },
      (error) => console.error("Error al crear la tabla Planta", error)
    );
  });
};

/* export const resetBDD = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `DROP TABLE IF EXISTS Derivados`,
      [],
      () => console.log("Tabla Derivados eliminada con éxito"),
      (error) => console.error("Error al eliminar la tabla Derivados", error)
    );

    tx.executeSql(
      `DROP TABLE IF EXISTS Enfermedades`,
      [],
      () => console.log("Tabla Enfermedades eliminada con éxito"),
      (error) => console.error("Error al eliminar la tabla Enfermedades", error)
    );

    tx.executeSql(
      `DROP TABLE IF EXISTS Planta`,
      [],
      () => console.log("Tabla Planta eliminada con éxito"),
      (error) => console.error("Error al eliminar la tabla Planta", error)
    );

    console.log("Todas las tablas eliminadas con éxito");
  });
}; */
