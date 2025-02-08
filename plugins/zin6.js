import fetch from 'node-fetch';
import yts from 'yt-search';
import { prepareWAMessageMedia, generateWAMessageFromContent } from '@whiskeysockets/baileys';

const handler = async (m, { conn, args }) => {
    if (!args[0]) return conn.reply(m.chat, '*\`Ingresa el nombre de lo que quieres buscar\`*', m);

    await m.react('🕓');
    try {
        let res = await search(args.join(" "));
        let video = res[0];
        let img = await (await fetch(video.image)).buffer();

        let txt = `> *YouTube Play 🍧.*\n\n`;
        txt += `${video.title}\n\n`;
        txt += `• *Duración:* ${secondString(video.duration.seconds)}\n`;
        txt += `• *Autor:* ${video.author.name || 'Desconocido'}\n`;
        txt += `• *Publicado:* ${eYear(video.ago)}\n`;
        txt += `• *Url:* _https://youtu.be/${video.videoId}_\n\n`;

        // Enviar el mensaje con los botones de YouTube y el texto
        await conn.sendMessage(m.chat, {
            image: img,
            caption: txt,
            footer: 'Presiona el botón para el tipo de descarga.',
            buttons: [
                {
                    buttonId: `.ytmp3 https://youtu.be/${video.videoId}`,
                    buttonText: {
                        displayText: 'ᯓᡣ𐭩 ᥲᥙძі᥆',
                    },
                },
                {
                    buttonId: `.ytmp4 https://youtu.be/${video.videoId}`,
                    buttonText: {
                        displayText: 'ᯓᡣ𐭩 ᥎іძᥱ᥆',
                    },
                },
                {
                    type: 4,
                    nativeFlowInfo: {
                        name: 'single_select',
                        paramsJson: JSON.stringify({
                            title: 'Dont click',
                            sections: [
                                {
                                    title: 'my focking bicht',
                                    highlight_label: '',
                                    rows: [
                                        {
                                            header: '⌬ Message',
                                            title: 'menu all',
                                            description: 'i like pussydog',
                                            id: ".menu"
                                        },
                                        {
                                            header: '⌬ Message',
                                            title: 'check ping',
                                            description: 'i like pussycat',
                                            id: ".ping"
                                        },
                                    ],
                                },
                            ],
                        }),
                    },
                },
            ],
            viewOnce: true,
            headerType: 4,
        }, { quoted: m });

        await m.react('✅');
    } catch (e) {
        console.error(e);
        await m.react('✖️');
        conn.reply(m.chat, '*\`Error al buscar el video.\`*', m);
    }
};

handler.help = ['playtg *<texto>*'];
handler.tags = ['dl'];
handler.command = ['playtg'];

export default handler;

async function search(query, options = {}) {
    let search = await yts.search({ query, hl: "es", gl: "ES", ...options });
    return search.videos;
}

function secondString(seconds) {
    seconds = Number(seconds);
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h > 0 ? h + 'h ' : ''}${m}m ${s}s`;
}

function eYear(txt) {
    if (txt.includes('year')) return txt.replace('year', 'año').replace('years', 'años');
    if (txt.includes('month')) return txt.replace('month', 'mes').replace('months', 'meses');
    if (txt.includes('day')) return txt.replace('day', 'día').replace('days', 'días');
    if (txt.includes('hour')) return txt.replace('hour', 'hora').replace('hours', 'horas');
    if (txt.includes('minute')) return txt.replace('minute', 'minuto').replace('minutes', 'minutos');
    return txt;
}