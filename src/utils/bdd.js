import * as SQLite from "expo-sqlite";
import * as a from "../../assets/plants/apple/manzano.jpeg";

export const db = SQLite.openDatabase("BDD_Tesis.db");

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
      () => console.log("BDD iniciada :D"),
      (error) => console.error("Error al crear la tabla Derivados", error)
    );
  });
};

export const resetBDD = () => {
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
};

export const fetchAllData = () => {
  db.transaction((tx) => {
    // Consulta para la tabla Derivados
    tx.executeSql(
      `SELECT * FROM Derivados`,
      [],
      (_, { rows: { _array } }) => console.log("Datos de Derivados:", _array),
      (error) => console.error("Error al consultar la tabla Derivados", error)
    );

    // Consulta para la tabla Enfermedades
    tx.executeSql(
      `SELECT * FROM Enfermedades`,
      [],
      (_, { rows: { _array } }) =>
        console.log("Datos de Enfermedades:", _array),
      (error) =>
        console.error("Error al consultar la tabla Enfermedades", error)
    );

    // Consulta para la tabla Planta
    tx.executeSql(
      `SELECT * FROM Planta`,
      [],
      (_, { rows: { _array } }) => console.log("Datos de Planta:", _array),
      (error) => console.error("Error al consultar la tabla Planta", error)
    );
  });
};
