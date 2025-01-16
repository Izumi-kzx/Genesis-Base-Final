const handler = async (m, { conn, args }) => {
    if (args.length < 2) {
        conn.reply(m.chat, 'Debes proporcionar la hora (HH:MM) y el país base (BO, PE, CL, AR).', m);
        return;
    }

    const horaUsuario = args[0];
    const paisBase = args[1].toUpperCase();

    // Zonas horarias para cada país
    const zonasHorarias = {
        BO: 'America/La_Paz',       // Bolivia
        PE: 'America/Lima',         // Perú
        CL: 'America/Santiago',     // Chile
        AR: 'America/Argentina/Buenos_Aires' // Argentina
    };

    // Validar el país base
    if (!(paisBase in zonasHorarias)) {
        conn.reply(m.chat, 'País no válido. Usa BO para Bolivia, PE para Perú, CL para Chile o AR para Argentina.', m);
        return;
    }

    // Validar formato de hora
    const [horas, minutos] = horaUsuario.split(':').map(num => parseInt(num, 10));
    if (isNaN(horas) || isNaN(minutos) || horas < 0 || horas > 23 || minutos < 0 || minutos > 59) {
        conn.reply(m.chat, 'Hora inválida. Debe estar en formato HH:MM (ejemplo: 21:00).', m);
        return;
    }

    // Crear la hora base en la zona horaria del país base
    const fechaBase = new Date();
    fechaBase.setUTCHours(horas, minutos, 0, 0); // Establecer la hora ingresada en UTC
    const fechaEnZonaBase = new Date(fechaBase.toLocaleString('en-US', { timeZone: zonasHorarias[paisBase] }));

    // Convertir la hora a las zonas horarias de los demás países
    const horasEnPais = {};
    for (let pais in zonasHorarias) {
        const horaConvertida = new Date(
            fechaEnZonaBase.toLocaleString('en-US', { timeZone: zonasHorarias[pais] })
        );
        const formatoHora = horaConvertida.toLocaleTimeString('es-ES', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit'
        });
        horasEnPais[pais] = formatoHora;
    }

    // Generar el mensaje con las horas en cada país
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

handler.help = ['4vs4'];
handler.tags = ['freefire'];
handler.command = /^(4vs4|vs4)$/i;
export default handler;