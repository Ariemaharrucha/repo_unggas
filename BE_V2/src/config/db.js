import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const db = mysql.createPool({
  host: process.env.APP_HOST,
  user: process.env.APP_USER,
  password: process.env.APP_PASSWORD,
  database: process.env.APP_DATABASE,
});

const dbConnection = async () => {
  try {
    const connection = await db.promise().getConnection();
    console.log("datasbase connected");
    connection.release();
  } catch (error) {
    console.log("connection failed", error);
  }
};

const query = async (query, values) => {
  try {
    const [value] = await db.promise().query(query, values ?? []);
    return value;
  } catch (error) {
    console.error(error);
  }
};

export {db, dbConnection, query };
