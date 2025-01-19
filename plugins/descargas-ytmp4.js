import fetch from 'node-fetch';

const limit = 50 * 1024 * 1024;

let handler = async (m, { conn, text }) => {
    if (!text) return conn.reply(m.chat, `❀ Ingresa un link de YouTube`, m);
    
    try {
        await m.react('🕒');
        
        let api = await fetch(`https://apidl.asepharyana.cloud/api/downloader/ytmp4?url=${text}&quality=360`);
        let json = await api.json();
        
        let { title, duration, downloadUrl, quality, fileSize } = json;

        let sizeInBytes = parseInt(fileSize.split(' ')[0]) * 1024 * 1024;
        
        let HS = `*Título:* ${title}\n*Duración:* ${duration}\n*Calidad:* ${quality}p\n*Tamaño:* ${fileSize}`;

        if (sizeInBytes > limit) {
            await conn.sendMessage(m.chat, {
                document: { url: downloadUrl },
                mimetype: 'video/mp4',
                fileName: `${title}.mp4`,
                caption: HS
            }, { quoted: m });
        } else {
            await conn.sendMessage(m.chat, {
                video: { url: downloadUrl },
                caption: HS
            }, { quoted: m });
        }

        await m.react('✅');
    } catch (error) {
        console.error(error);
        await m.react('✖️');
    }
};

handler.command = ['ytmp4'];

export default handler;




/* import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.reply(m.chat, `❀ Ingresa un  link de youtube`, m)
    
try {
await m.react('🕒');
let api = await fetch(`https://apidl.asepharyana.cloud/api/downloader/ytmp4?url=${text}&quality=360`)
let json = await api.json()
let { title, author, authorUrl, lengthSeconds, views, uploadDate, thumbnail, description, duration, downloadUrl, quality } = json
let HS = `*Titulo :* ${title}
*Duracion :* ${duration}
*Calidad :* ${quality}p`
await conn.sendMessage(m.chat, { video: { url: downloadUrl }, caption: HS }, { quoted: m })
await m.react('✅');
} catch (error) {
console.error(error)
await m.react('✖️');
}}

handler.command = ['ytmp4']

export default handler */