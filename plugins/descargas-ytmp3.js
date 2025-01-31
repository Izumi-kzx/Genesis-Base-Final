/* 
- Downloader Ytmp3 By Izumi-kzx
- https://whatsapp.com/channel/0029VaJxgcB0bIdvuOwKTM2Y
*/
/* import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!text) throw `Proporcióname el enlace de YouTube para que pueda ayudarte. 🎵`;

  await m.react('🕓');

  try {
    const apiKey = 'user1';
    const apiUrl = `https://dark-core-api.vercel.app/api/download/ytmp3?url=${encodeURIComponent(text)}&type=audio&format=mp3&key=${apiKey}`;

    const response = await fetch(apiUrl);
    const result = await response.json();

    if (result.success && result.downloadLink) {
      await conn.sendMessage(
        m.chat,
        { 
          audio: { url: result.downloadLink }, 
          mimetype: 'audio/mpeg' 
        },
        { quoted: m }
      );

      await m.react('✅');
    } else {
      throw new Error('Error: No se pudo obtener el audio');
    }
  } catch (error) {
    await m.react('❌');
    m.reply(`❌ *Error:* ${error.message || 'Ocurrió un error desconocido'}`);
  }
};

handler.help = ['ytmp3 *<url>*']; 
handler.command = ['ytmp3'];
handler.tags = ['dl'];

export default handler; */




import fetch from 'node-fetch';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `Proporcióname el enlace de YouTube para que pueda ayudarte. 🎵`;

  await m.react('🕓');

  try {
    const apiKey = 'xenzpedo';
    const response = await fetch(`https://api.botcahx.eu.org/api/dowloader/yt?url=${encodeURIComponent(text)}&apikey=${apiKey}`);
    const result = await response.json();

    if (result.status && result.result && result.result.mp3) {
      await conn.sendMessage(
        m.chat,
        { 
          audio: { url: result.result.mp3 }, 
          mimetype: 'audio/mpeg' 
        },
        { quoted: m }
      );

      await m.react('✅');
    } else {
      throw new Error('Error: Unable to fetch audio');
    }
  } catch (error) {
    await m.react('❌');
    m.reply(`❌ *Error:* ${error.message || 'An unknown error occurred'}`);
  }
};

handler.help = ['ytmp3 *<url>*']; 
handler.command = ['ytmp3'];
handler.tags = ['dl'];

export default handler;
