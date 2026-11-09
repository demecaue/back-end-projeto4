import mysql from 'mysql2/promise';

// Rubrica: integração entre serviços, o back-end conecta ao MySQL
export const banco = mysql.createPool({
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.MYSQL_PORT ?? 3306),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});
