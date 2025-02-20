const schedule = require('node-schedule');
const pool = require('../db');

// Programar el job para ejecutarse a las 00:05 AM, 06:05 AM, 12:05 PM y 06:05 PM
schedule.scheduleJob('5 0,6,12,18 * * *', async () => {
    console.log('Ejecutando Job: Actualizar Status Clientes');
    let client;
    try {
        client = await pool.connect();
        await client.query('CALL public.actualizar_status_enespera();'); // Llama al SP
        console.log('Job ejecutado exitosamente');
    } catch (error) {
        console.error('Error ejecutando el Job:', error.message, error.stack);
    } finally {
        if (client) {
            client.release(); // Libera la conexión
        }
    }
});

module.exports = schedule;

// const schedule = require('node-schedule');
// const pool = require('../db');

// // Programar el job para ejecutarse a las 00:05 AM, 06:05 AM, 12:05 PM y 06:05 PM
// schedule.scheduleJob('5 0,6,12,18 * * *', async () => {
//     console.log('Ejecutando Job: Actualizar Status Clientes');
//     try {
//         const client = await pool.connect();
//         await client.query('CALL public.actualizar_status_enespera();'); // Llama al SP
//         console.log('Job ejecutado exitosamente');
//         client.release(); // Libera la conexión
//     } catch (error) {
//         console.error('Error ejecutando el Job:', error.message);
//     }
// });

// module.exports = schedule;


// const schedule = require('node-schedule');
// const pool = require('../db');

// // Job programado para ejecutarse todos los días a las 00:05 AM
// schedule.scheduleJob('5 0 * * *', async () => {
// // schedule.scheduleJob('* * * * *', async () => {
//     console.log('Ejecutando Job: Actualizar Status Clientes');
//     try {
//         const client = await pool.connect();
//         await client.query('CALL public.actualizar_status_enespera();'); // Llama al SP
//         console.log('Job ejecutado exitosamente');
//         client.release(); // Libera la conexión
//     } catch (error) {
//         console.error('Error ejecutando el Job:', error.message);
//     }
// });

// module.exports = schedule;
