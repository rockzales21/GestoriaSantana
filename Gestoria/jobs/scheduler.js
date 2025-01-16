const schedule = require('node-schedule');
const pool = require('../db');

// Job programado para ejecutarse todos los días a las 00:05 AM
schedule.scheduleJob('5 0 * * *', async () => {
// schedule.scheduleJob('* * * * *', async () => {
    console.log('Ejecutando Job: Actualizar Status Clientes');
    try {
        const client = await pool.connect();
        await client.query('CALL public.actualizar_status_enespera();'); // Llama al SP
        console.log('Job ejecutado exitosamente');
        client.release(); // Libera la conexión
    } catch (error) {
        console.error('Error ejecutando el Job:', error.message);
    }
});

module.exports = schedule;
