const handler = async (m, { conn, args }) => {

    if (args.length < 2) {
        conn.reply(m.chat, '𝘋𝘦𝘣𝘦𝘴 𝘱𝘳𝘰𝘱𝘰𝘳𝘤𝘪𝘰𝘯𝘢𝘳 𝘭𝘢 𝘩𝘰𝘳𝘢 (𝘏𝘏:𝘔𝘔) 𝘺 𝘦𝘭 𝘱𝘢𝘪́𝘴 (𝘉𝘖, 𝘗𝘌, 𝘊𝘓, 𝘈𝘙).', m);
        return;
    }

    const horaRegex = /^([01]\d|2[0-3]):?([0-5]\d)$/;
    if (!horaRegex.test(args[0])) {
        conn.reply(m.chat, '𝘍𝘰𝘳𝘮𝘢𝘵𝘰 𝘥𝘦 𝘩𝘰𝘳𝘢 𝘪𝘯𝘤𝘰𝘳𝘳𝘦𝘤𝘵𝘰. 𝘋𝘦𝘣𝘦 𝘴𝘦𝘳 𝘏𝘏:𝘔𝘔 𝘦𝘯 𝘧𝘰𝘳𝘮𝘢𝘵𝘰 𝘥𝘦 24 𝘩𝘰𝘳𝘢𝘴.', m);
        return;
    }

    const horaUsuario = args[0];
    let paisBase = args[1].toUpperCase();

    const banderasToPais = {
        '🇧🇴': 'BO',
        '🇵🇪': 'PE',
        '🇨🇱': 'CL',
        '🇦🇷': 'AR'
    };


    if (banderasToPais[paisBase]) {
        paisBase = banderasToPais[paisBase];
    }

    const diferenciasHorarias = {
        BO: 0, // Bolivia
        PE: -1, // Perú 
        CL: 1,  // Chile
        AR: 1   // Argentina
    };

    if (!(paisBase in diferenciasHorarias)) {
        conn.reply(m.chat, 'País no válido. Usa BO para Bolivia, PE para Perú, CL para Chile o AR para Argentina. También puedes usar las banderas correspondientes.', m);
        return;
    }


    const diferenciaBase = diferenciasHorarias[paisBase];

    const hora = parseInt(horaUsuario.split(':')[0], 10);
    const minutos = parseInt(horaUsuario.split(':')[1], 10);

    const horaBase = new Date();
    horaBase.setHours(hora - diferenciaBase);
    horaBase.setMinutes(minutos);
    horaBase.setSeconds(0);
    horaBase.setMilliseconds(0);

    const horasEnPais = [];
    for (let i = 0; i < 4; i++) {
        const horaActual = new Date(horaBase.getTime());
        horaActual.setHours(horaBase.getHours() + i);

        const horasAjustadas = Object.keys(diferenciasHorarias).map(pais => {
            const diferencia = diferenciasHorarias[pais];
            const horaEnPais = new Date(horaActual.getTime() + (3600000 * diferencia));
            return { pais, hora: horaEnPais };
        });

        horasEnPais.push(horasAjustadas);
    }


    const formatTime = (date) => date.toLocaleTimeString('es', { hour12: false, hour: '2-digit', minute: '2-digit' });

    const message = `
*4 𝐕𝐄𝐑𝐒𝐔𝐒 4*

${horasEnPais[0].map(({ pais, hora }) => {
        const bandera = {
            BO: '🇧🇴',
            PE: '🇵🇪',
            CL: '🇨🇱',
            AR: '🇦🇷'
        }[pais];
        return `${bandera} ${pais} : ${formatTime(hora)}`;
    }).join('\n')}

𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔

👑 ┇ 
🥷🏻 ┇  
🥷🏻 ┇ 
🥷🏻 ┇ 


ㅤʚ 𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄:
🥷🏻 ┇ 
🥷🏻 ┇
`.trim();

    conn.sendMessage(m.chat, { text: message }, { quoted: m });
};
handler.help = ['4vs4']
handler.tags = ['freefire']
handler.command = /^(4vs4|vs4)$/i;
export default handler;