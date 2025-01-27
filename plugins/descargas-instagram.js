import axios from 'axios';

let handler = async (m, { conn, usedPrefix, args, command, text }) => {
    if (!args[0]) {
        await m.react('✖️');
        return conn.reply(m.chat, `☁️ Ingresa un link de historia de Instagram`, m, fake);
    }

    // Expresión regular para aceptar solo enlaces de historias de Instagram
    if (!args[0].match(new RegExp('^https?:\\/\\/(www\\.)?instagram\\.com\\/(stories|s)\\/([a-zA-Z0-9_.-]+)\\/([0-9]+)(\\/)?(\\?.*)?$'))) {
        await m.react('✖️');
        return conn.reply(m.chat, `☁️ Verifica que sea un link válido de historia de Instagram`, m);
    }

    try {
        await m.react('🕑');
        let api = await axios.get(`https://apidl.asepharyana.cloud/api/downloader/igdl?url=${args[0]}`);

        let processedUrls = new Set();

        for (let a of api.data.data) {
            if (!processedUrls.has(a.url)) {
                processedUrls.add(a.url);

                // Verificación de si la URL es una imagen o un video
                if (a.url.includes('jpg') || a.url.includes('png') || a.url.includes('jpeg') || a.url.includes('webp') || a.url.includes('heic') || a.url.includes('tiff') || a.url.includes('bmp')) {
                    await conn.sendMessage(
                        m.chat,
                        { 
                            image: { url: a.url }, 
                            caption: '*✔️🍟Downloader instagram.*' 
                        },
                        { quoted: m }
                    );
                } else {
                    await conn.sendMessage(
                        m.chat,
                        { 
                            video: { url: a.url }, 
                            caption: '*✔️🍟Downloader instagram.*' 
                        },
                        { quoted: m }
                    );
                }
            }
        }
        await m.react('✅'); 
    } catch (error) {
        console.log(error);
        await m.react('❌');
    }
};

handler.help = ['igstory <username>'];
handler.tags = ['downloader'];
handler.command = ['igstory', 'ighistoria'];

export default handler;






/* import axios from 'axios';

let handler = async (m, { conn, usedPrefix, args, command, text }) => {
    if (!args[0]) {
        await m.react('✖️');
        return conn.reply(m.chat, `☁️ Ingresa un link de Instagram`, m, fake);
    }

    if (!args[0].match(new RegExp('^https?:\\/\\/(www\\.)?instagram\\.com\\/(p|tv|reel)\\/([a-zA-Z0-9_-]+)(\\/)?(\\?.*)?$'))) {
        await m.react('✖️');
        return conn.reply(m.chat, `☁️ Verifica que sea un link de Instagram`, m);
    }

    try {
        await m.react('🕑');
        let api = await axios.get(`https://apidl.asepharyana.cloud/api/downloader/igdl?url=${args[0]}`);
        

        let processedUrls = new Set();

        for (let a of api.data.data) {
            if (!processedUrls.has(a.url)) {
                processedUrls.add(a.url);

                if (a.url.includes('jpg') || a.url.includes('png') || a.url.includes('jpeg') || a.url.includes('webp') || a.url.includes('heic') || a.url.includes('tiff') || a.url.includes('bmp')) {
                    await conn.sendMessage(
                        m.chat,
                        { 
                            image: { url: a.url }, 
                            caption: '*✔️🍟Downloader instagram.*' 
                        },
                        { quoted: m }
                    );
                } else {
                    await conn.sendMessage(
                        m.chat,
                        { 
                            video: { url: a.url }, 
                            caption: '*✔️🍟Downloader instagram.*' 
                        },
                        { quoted: m }
                    );
                }
            }
        }
        await m.react('✅'); 
    } catch (error) {
        console.log(error);
        await m.react('❌');
    }
};

handler.help = ['ig *<link>*'];
handler.tags = ['dl'];
handler.command = /^(ig|igdl|instagram)$/i;

export default handler; */