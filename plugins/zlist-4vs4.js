const handler = async (m, { conn, args }) => {
    if (args.length < 2) {
        conn.reply(m.chat, '𝘋𝘦𝘣𝘦𝘴 𝘱𝘳𝘰𝘱𝘰𝘳𝘤𝘪𝘰𝘯𝘢𝘳 𝘭𝘢 𝘩𝘰𝘳𝘢 (𝘏𝘏:𝘔𝘔) 𝘺 𝘦𝘭 𝘱𝘢𝘪́𝘴 (𝘉𝘖, 𝘗𝘌, 𝘊𝘓, 𝘈𝘙).', m);
        return;
    }

    const horaUsuario = args[0];
    const paisBase = args[1].toUpperCase();

    const zonasHorarias = {
        BO: 'America/La_Paz',  // Bolivia
        PE: 'America/Lima',    // Perú
        CL: 'America/Santiago',// Chile
        AR: 'America/Argentina/Buenos_Aires' // Argentina
    };

    if (!(paisBase in zonasHorarias)) {
        conn.reply(m.chat, 'País no válido. Usa BO para Bolivia, PE para Perú, CL para Chile o AR para Argentina.', m);
        return;
    }


    function obtenerHoraZona(zona, hora, minutos) {
        const opciones = { timeZone: zona, hour12: false, hour: '2-digit', minute: '2-digit' };
        const formatter = new Intl.DateTimeFormat('es-ES', opciones);

        const fecha = new Date();
        fecha.setHours(hora);
        fecha.setMinutes(minutos);
        fecha.setSeconds(0);
        fecha.setMilliseconds(0);

        return formatter.format(fecha);
    }


    const [horaInput, minutosInput] = horaUsuario.split(":").map(num => parseInt(num));


    const horaBase = obtenerHoraZona(zonasHorarias[paisBase], horaInput, minutosInput);

    const horasEnPais = {};
    for (let pais in zonasHorarias) {
        const hora = obtenerHoraZona(zonasHorarias[pais], horaInput, minutosInput);
        horasEnPais[pais] = hora;
    }

 
    const message = `
*4 𝐕𝐄𝐑𝐒𝐔𝐒 4*

${Object.keys(horasEnPais).map((pais) => {
    const bandera = {
        BO: '🇧🇴',
        PE: '🇵🇪',
        CL: '🇨🇱',
        AR: '🇦🇷'
    }[pais];
    return `${bandera} ${pais} : ${horasEnPais[pais]}`;
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