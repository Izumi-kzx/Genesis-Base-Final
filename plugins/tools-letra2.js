const partidas = {};
const handler = async (m, { conn, args, command }) => {
if (command === 'anotar') {
const who = m.sender;
const { name } = global.db.data.users[who];
const partidaId = args[0];
if (!partidas[partidaId]) {
conn.reply(m.chat, "No hay una partida activa en este momento.", m);
return;
}
if (partidas[partidaId].jugadores.includes(name) || partidas[partidaId].suplentes.includes(name)) {
conn.reply(m.chat, "¡Ya estás anotado en esta partida!", m);
const mensaje = generarMensaje(partidas[partidaId]);
conn.sendMessage(m.chat, {text: mensaje, footer: "¡Anótate para el 4vs4!", buttons: [{buttonId: `.anotar ${partidaId}`, buttonText: {displayText: "📌 Anotar"}}], viewOnce: true, headerType: 1}, {quoted: m});
return;
}
if (partidas[partidaId].jugadores.length < 4) {
partidas[partidaId].jugadores.push(name);
} else if (partidas[partidaId].suplentes.length < 2) {
partidas[partidaId].suplentes.push(name);
} else {
conn.reply(m.chat, "¡La escuadra y suplentes ya están llenos! Lista cerrada.", m);
conn.sendMessage(m.chat, "Lista llena, suerte en el VS!", m);
return;
}
if (partidas[partidaId].jugadores.length === 4 && partidas[partidaId].suplentes.length === 2) {
conn.reply(m.chat, "¡Lista llena, suerte en el VS!", m);
}
const mensaje = generarMensaje(partidas[partidaId]);
conn.sendMessage(m.chat, {text: mensaje, footer: "¡Anótate para el 4vs4!", buttons: [{buttonId: `.anotar ${partidaId}`, buttonText: {displayText: "📌 Anotar"}}], viewOnce: true, headerType: 1}, {quoted: m});
return;
}
if (args.length < 4) {
conn.reply(m.chat, 'Debes proporcionar esto.\n*.4vs4 <región> <hora> <Bandera> <modalidad>*\n\n*Regiones*\nSR (Sudamérica)\nEU (Estados Unidos)\n\n*Ejemplo:*\n.4vs4 SR 22:00 🇦🇷 infinito\n.4vs4 SR 22:00 🇦🇷 vivido\n.4vs4 EU 20:00 🇲🇽 infinito\n.4vs4 EU 20:00 🇲🇽 vivido', m);
return;
}
const modalidad = args[3].toLowerCase();
if (modalidad !== 'infinito' && modalidad !== 'vivido') {
conn.reply(m.chat, '𝘔𝘰𝘥𝘢𝘭𝘪𝘥𝘢𝘥 𝘯𝘰 𝘷𝘢́𝘭𝘪𝘥𝘢. 𝘌𝘴𝘤𝘳𝘪𝘣𝘦 "𝘪𝘯𝘧𝘪𝘯𝘪𝘵𝘰" 𝘰 "𝘷𝘪́𝘷𝘪𝘥𝘰".', m);
return;
}
const region = args[0].toUpperCase();
if (region !== 'SR' && region !== 'EU') {
conn.reply(m.chat, '𝘓𝘢 𝘳𝘦𝘨𝘪𝘰́𝘯 𝘯𝘰 𝘦𝘴 𝘷𝘢́𝘭𝘪𝘥𝘢. 𝘜𝘴𝘢 𝘚𝘙 𝘰 𝘌𝘜.', m);
return;
}
const partidaId = `${m.chat}-${args[0]}-${args[1]}`;
const horariosSR = { BO: "21:00", PE: "20:00", AR: "22:00" };
const horariosEU = { CO: "21:00", MX: "20:00" };
const horarios = region === 'SR' ? horariosSR : horariosEU;
if (!partidas[partidaId]) {
partidas[partidaId] = {jugadores: [], suplentes: [], hora: args[1], modalidad: modalidad.toUpperCase(), reglas: modalidad === 'infinito' ? '.reglasinf' : '.reglasvv2', horarios: horarios};
}
const mensaje = generarMensaje(partidas[partidaId]);
conn.sendMessage(m.chat, {text: mensaje, footer: "¡Anótate para el 4vs4!", buttons: [{buttonId: `.anotar ${partidaId}`, buttonText: {displayText: "📌 Anotar"}}], viewOnce: true, headerType: 1}, {quoted: m});
};
function generarMensaje(partida) {
const horarios = Object.entries(partida.horarios)
.map(([pais, hora]) => {const bandera = {BO: "🇧🇴", PE: "🇵🇪", AR: "🇦🇷", CO: "🇨🇴", MX: "🇲🇽"}[pais];return `*${bandera} ${pais} :* ${hora}`;})
.join("\n");
const escuadra = [`🥷 ${partida.jugadores[0] || ""}`, `🥷 ${partida.jugadores[1] || ""}`, `🥷 ${partida.jugadores[2] || ""}`, `🥷 ${partida.jugadores[3] || ""}`].join("\n");
const suplentes = [`🥷 ${partida.suplentes[0] || ""}`, `🥷 ${partida.suplentes[1] || ""}`].join("\n");
return `*4 VERSUS 4 ${partida.modalidad}*\n${horarios}\n*REGLAS:* ${partida.reglas}\n𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔\n${escuadra}\n𝗦𝗨𝗣𝗟𝗘𝗡𝗧𝗘𝗦\n${suplentes}`.trim();
}
handler.command = /^(4vs4|vs4|anotar)$/i;
export default handler;