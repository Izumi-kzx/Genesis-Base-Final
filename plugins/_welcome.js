import { WAMessageStubType } from '@whiskeysockets/baileys';
import fetch from 'node-fetch';
import canvacard from 'canvacard';

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return !0;

  // Generar la imagen de bienvenida utilizando canvacard
  const img = "https://cdn.discordapp.com/embed/avatars/0.png"; // Avatar predeterminado (se puede modificar)
  const background = "https://i.imgur.com/5O7xmVe.png"; // Fondo predeterminado (se puede modificar)

  // Crear tarjeta de bienvenida
  const welcomer = new canvacard.WelcomeLeave()
    .setAvatar(img)
    .setBackground('COLOR', '#000000')  // Cambia el color del fondo si es necesario
    .setTitulo("Bienvenido al grupo", '#FFFFFF')
    .setSubtitulo("¡Esperamos que tengas un excelente día!", '#FFFFFF')
    .setOpacityOverlay(1)
    .setColorCircle('#FFFFFF')
    .setColorOverlay('#5865F2')
    .setTypeOverlay('ROUNDED');

  const welcomeCard = await welcomer.build("Cascadia Code PL, Noto Color Emoji");

  // Crear tarjeta de despedida
  const byeCard = new canvacard.WelcomeLeave()
    .setAvatar(img)
    .setBackground('COLOR', '#000000')
    .setTitulo("Adiós del grupo", '#FFFFFF')
    .setSubtitulo("¡Nos vemos pronto! ¡Que tengas un buen día!", '#FFFFFF')
    .setOpacityOverlay(1)
    .setColorCircle('#FFFFFF')
    .setColorOverlay('#5865F2')
    .setTypeOverlay('ROUNDED');

  const byeImage = await byeCard.build("Cascadia Code PL, Noto Color Emoji");

  // Crear tarjeta para el kick (expulsión)
  const kickCard = new canvacard.WelcomeLeave()
    .setAvatar(img)
    .setBackground('COLOR', '#000000')
    .setTitulo("Expulsado del grupo", '#FFFFFF')
    .setSubtitulo("¡Nos vemos pronto! ¡Que tengas un buen día!", '#FFFFFF')
    .setOpacityOverlay(1)
    .setColorCircle('#FFFFFF')
    .setColorOverlay('#5865F2')
    .setTypeOverlay('ROUNDED');

  const kickImage = await kickCard.build("Cascadia Code PL, Noto Color Emoji");

  let chat = global.db.data.chats[m.chat];
  let who = m.messageStubParameters[0] + '@s.whatsapp.net';
  let user = global.db.data.users[who];

  let userName = user ? user.name : await conn.getName(who);

  if (chat.welcome && m.messageStubType == 27) {
    let bienvenida = `❀ *Se unió* al grupo *${groupMetadata.subject.trim()}*\n    ✰ @${m.messageStubParameters[0].split`@`[0]} \n\n    Ꮚ⁠˘⁠ ⁠ꈊ⁠ ⁠˘⁠ ⁠Ꮚ ¡Bienvenido! ¡Esperamos que tengas un excelente día!\n\n> ✐ No olvides usar *#help* si necesitas algo.\n> 🜸 ¡Disfruta de tu tiempo con nosotros!`;

    // Enviar la tarjeta de bienvenida
    await conn.sendMessage(m.chat, { image: welcomeCard, caption: bienvenida });
  }

  if (chat.welcome && m.messageStubType == 28) {
    let bye = `❀ *Se salió* del grupo *${groupMetadata.subject.trim()}*\n    ✰ @${m.messageStubParameters[0].split`@`[0]}\n\n    Ꮚ⁠˘⁠ ⁠ꈊ⁠ ⁠˘⁠ ⁠Ꮚ ¡Nos vemos pronto! ¡Que tengas un buen día!\n\n> ✐ No olvides usar *#help* si necesitas algo.\n> 🜸 Proximamente...`;

    // Enviar la tarjeta de despedida
    await conn.sendMessage(m.chat, { image: byeImage, caption: bye });
  }

  if (chat.welcome && m.messageStubType == 32) {
    let kick = `❀ *Se expulsó* del grupo *${groupMetadata.subject.trim()}*\n    ✰ @${m.messageStubParameters[0].split`@`[0]}\n\n    Ꮚ⁠˘⁠ ⁠ꈊ⁠ ⁠˘⁠ ⁠Ꮚ ¡Nos vemos pronto! ¡Que tengas un buen día!\n\n> ✐ No olvides usar *#help* si necesitas algo.\n> 🜸 Proximamente...`;

    // Enviar la tarjeta de expulsión
    await conn.sendMessage(m.chat, { image: kickImage, caption: kick });
  }
}