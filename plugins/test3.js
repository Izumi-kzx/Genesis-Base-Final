let handler = async (m, { conn, participants }) => {
    // Filtrar los participantes, excluyendo al creador y al bot
    const groupAdmins = participants.filter(p => p.admin);
    const botId = conn.user.jid;
    const groupOwner = groupAdmins.find(p => p.isAdmin)?.id;  // Encontrar el propietario del grupo
    const groupNoAdmins = participants.filter(p => p.id !== botId && p.id !== groupOwner && !p.admin).map(p => p.id);

    if (groupNoAdmins.length === 0) throw '*⚠️ No hay usuarios para eliminar.*'; // Verifica que haya usuarios para eliminar

    let pesan = "Grupo limpiado por el bot";  // Mensaje que aparecerá cuando se actualice el título del grupo
    let text = `「 *𝙲𝚕𝚎𝚊𝚗𝚎𝚍* 」`.trim();

    let txt2 = `*[🌠] Eliminación Exitosa.*`;

    try {
        conn.groupUpdateSubject(m.chat, pesan); // Actualizar el título del grupo
    } catch (e) {
        throw '*⚠️ El título del grupo no puede exceder los 25 caracteres.*';
    }

    await conn.sendMessage(m.chat, { text, mentions: conn.parseMention(text) }, { quoted: m });

    // Eliminar a cada miembro con un retraso de 2 segundos
    for (let userId of groupNoAdmins) {
        await conn.groupParticipantsUpdate(m.chat, [userId], 'remove');
        await new Promise(resolve => setTimeout(resolve, 2000));  // Espera de 2 segundos entre eliminaciones
    }

    m.reply(txt2);
}

handler.help = ['kickall', '-'].map(v => 'o' + v + ' @user');
handler.tags = ['owner'];
handler.command = /^(kickall)$/i;

handler.group = true;
handler.botAdmin = true;

export default handler;