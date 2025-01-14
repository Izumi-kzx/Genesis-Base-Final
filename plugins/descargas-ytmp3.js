import yts from 'yt-search';

let handler = async (m, { conn, text }) => {
  if (!text) throw 'Por favor, proporciona una URL de YouTube';

  // Validar si es una URL válida de YouTube
  const ytRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
  if (!ytRegex.test(text)) throw 'La URL proporcionada no es válida. Asegúrate de que sea un enlace de YouTube';

  let src = await yts({ videoId: text.split('v=')[1] || text.split('/').pop() });
  let yt = src.videos[0];

  if (!yt) throw 'No se encontró información para este enlace. Por favor, verifica la URL';

  // Enviar el mensaje con la miniatura y título
  await conn.sendMessage(m.chat, { 
    image: { url: yt.thumbnail }, 
    caption: yt.title 
  }, { quoted: m });

  // Enviar el archivo de audio
  return conn.sendMessage(m.chat, {
    audio: {
      url: `https://kepolu-ytdl.hf.space/yt/dl?url=${yt.url}&type=audio`
    },
    mimetype: 'audio/mpeg',
    contextInfo: {
      externalAdReply: {
        title: yt.title,
        body: 'PLAY AUDIO',
        mediaType: 2,
        mediaUrl: yt.url,
        thumbnailUrl: yt.thumbnail,
        sourceUrl: yt.url,
        containsAutoReply: true,
        renderLargerThumbnail: true,
        showAdAttribution: false,
      }
    }
  }, { quoted: m });
};

handler.help = ['playyt']
handler.command = ['playyt']
handler.tags = ['downloader']
export default handler;






/* import yts from 'yt-search';

let handler = async (m, {conn, text}) => {
if (!text) throw 'Masukkan judul'

let src = await yts(text)
let yt = src.videos[0]

await conn.sendMessage(m.chat, {image:{url:yt.thumbnail}, caption: yt.title}, {quoted:m})
return conn.sendMessage(m.chat, {
audio: {
    url: `https://kepolu-ytdl.hf.space/yt/dl?url=${yt.url}&type=audio`
},
mimetype: 'audio/mpeg',
contextInfo: {
externalAdReply: {
title: yt.title,
body: 'PLAY AUDIO',
mediaType: 2,
mediaUrl: yt.url,
thumbnailUrl: yt.thumbnail,
sourceUrl: yt.url,
containsAutoReply: true,
renderLargerThumbnail: true,
showAdAttribution: false,
}}}, { quoted: m})
    
}

handler.help = ['play']
 handler.command = ['playyt']
handler.tags = ['downloader']
export default handler */





/* import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
    if (!text) {
        await m.react('✖️');
        return conn.reply(m.chat, `☁️ Ingresa un enlace de YouTube.`, m, fake);
    }

    try {
        await m.react('🕒');

        let api = await fetch(`https://restapi.apibotwa.biz.id/api/ytmp3?url=${text}`);
        let json = await api.json();

        if (!json || !json.result || !json.result.download || !json.result.download.url) {
            await m.react('❌');
            return conn.reply(
                m.chat,
                `《❌》No se pudo obtener el enlace de descarga. Verifica el enlace y vuelve a intentarlo.`,
                m
            );
        }

        let title = json.result.metadata.title || "Sin título";
        let dl_url = json.result.download.url;

        await conn.sendMessage(
            m.chat,
            { 
                audio: { url: dl_url }, 
                fileName: `${title}.mp3`, 
                mimetype: 'audio/mp4' 
            },
            { quoted: m }
        );

        await m.react('✅');

    } catch (error) {
        console.error(error);
        await m.react('❌');
        conn.reply(
            m.chat,
            `《❌》Ocurrió un error al intentar descargar el audio. Por favor, verifica el enlace e inténtalo nuevamente.`,
            m
        );
    }
};

handler.help = ['ytmp3 *<url>*']
handler.tags = ['dl']
handler.command = ['ytmp3', 'fgmp3', 'yta'];

export default handler; */