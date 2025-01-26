import fetch from 'node-fetch';
import { writeFile } from 'fs/promises';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  await m.react('✖️');
  if (!text) throw `Proporcióname el enlace de la historia de Instagram para que pueda ayudarte. 📷`;

  await m.react('🕓');

  try {
    const apiKey = 'xenzpedo'; // Manteniendo el API key original
    const response = await fetch(`https://api.botcahx.eu.org/api/dowloader/igdowloader?url=${encodeURIComponent(text)}&apikey=${apiKey}`);
    const result = await response.json();

    if (result.status && result.result) {
      // Eliminamos duplicados basándonos en las URLs únicas
      const uniqueStories = Array.from(new Set(result.result.map(item => item.url))).map(url => {
        return result.result.find(item => item.url === url);
      });

      for (const item of uniqueStories) {
        const isVideo = item.url.endsWith('.mp4');
        const mediaType = isVideo ? 'video' : 'image';
        const mimetype = isVideo ? 'video/mp4' : 'image/jpeg';

        // Descargamos el archivo antes de enviarlo
        const res = await fetch(item.url);
        const buffer = await res.buffer();

        // Guardamos el archivo temporalmente
        const filePath = `/tmp/${Date.now()}_${mediaType}.${isVideo ? 'mp4' : 'jpg'}`;
        await writeFile(filePath, buffer);

        // Enviamos el archivo descargado
        await conn.sendMessage(
          m.chat,
          {
            [mediaType]: { url: filePath },
            mimetype
          },
          { quoted: m }
        );
      }

      await m.react('✅');
    } else {
      throw new Error('Error: No se pudo obtener las historias');
    }
  } catch (error) {
    await m.react('❌');
    m.reply(`❌ *Error:* ${error.message || 'Ocurrió un error desconocido'}`);
  }
};

handler.help = ['igstory *<url>*'];
handler.command = ['igstory'];
handler.tags = ['dl'];

export default handler;