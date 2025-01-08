// YOUTUBE DOWNLOAD MP4
// Fitur by nano gembul
// https://whatsapp.com/channel/0029VagvXerC1FuF4KH1yd1F
import axios from 'axios';

async function dansyaytdl(link) {
    try {
        // Obtener token desde el servicio
        const response = await axios.get('https://y2ts.us.kg/token');
        const token = response.data?.token;

        if (!token) {
            throw new Error('No se pudo obtener el token.');
        }

        // Construir la URL para la solicitud de descarga
        const url = `https://y2ts.us.kg/youtube?url=${encodeURIComponent(link)}`;
        const headers = {
            'Authorization-Token': token,
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
            'Content-Type': 'application/json',
        };

        // Hacer la solicitud al servicio
        const videoResponse = await axios.get(url, { headers });

        if (videoResponse.data?.status) {
            return videoResponse.data.result || {};
        } else {
            throw new Error('La solicitud fue rechazada. Verifica el enlace.');
        }
    } catch (error) {
        throw new Error(error.message || 'Error al obtener datos del video.');
    }
}

async function handler(m, { text, conn, botname }) {
    if (!text) {
        return conn.sendMessage(m.chat, { text: ' [ Ejemplo ] :*\n> *.ytmp4 <enlace de YouTube>*' }, { quoted: m });
    }

    conn.sendMessage(m.chat, { text: 'Espera un momento...' }, { quoted: m });

    try {
        const data = await dansyaytdl(text);

        if (!data.mp4) {
            throw new Error('No se encontró un enlace MP4.');
        }

        const ytc = `*[ YOUTUBE DOWNLOADER ]*
🔥 *Título*: ${data.title || 'Desconocido'}
🔥 *Descripción*: ${data.description || 'No disponible'}
🔥 *Vistas*: ${data.views || 'No disponible'}
© ${botname}`;

        await conn.sendMessage(m.chat, { video: { url: data.mp4 }, caption: ytc }, { quoted: m });
    } catch (e) {
        conn.sendMessage(m.chat, { text: '*Error:* ' + e.message }, { quoted: m });
    }
}

handler.help = ['ytmp4'];
handler.tags = ['downloader'];
handler.command = ['ytmp4']; // Cambié el comando para ser más relevante

export default handler;