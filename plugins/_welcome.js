import { WAMessageStubType } from '@whiskeysockets/baileys';
import fetch from 'node-fetch';
import canvafy from 'canvafy';

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return !0;

  // Base de datos y variables
  let chat = global.db.data.chats[m.chat];
  let web = 'https://genesis-support.vercel.app/';
  let webb = 'https://izumikzx.vercel.app/';
  let who = m.messageStubParameters[0] + '@s.whatsapp.net';
  let user = global.db.data.users[who];
  let userName = user ? user.name : await conn.getName(who);

  // Obtener avatar del usuario
  const getUserAvatar = async () => {
    try {
      return await conn.profilePictureUrl(m.messageStubParameters[0], 'image');
    } catch (err) {
      return 'https://i.ibb.co/cFzgdNw/file.jpg'; // Avatar predeterminado en caso de error
    }
  };

  // Generador de imágenes dinámicas
  const generateImage = async (title, description) => {
    const userAvatar = await getUserAvatar();
    const img = await new canvafy.WelcomeLeave()
      .setAvatar(userAvatar) // Usar avatar real del usuario
      .setBackground(
        'image',
        'https://i.ibb.co/0cfqJLt/file.jpg'
      )
      .setTitle(title)
      .setDescription(description)
      .setBorder('#2a2e35')
      .setAvatarBorder('#2a2e35')
      .setOverlayOpacity(0.3)
      .build();

    return img;
  };

  // Mensajes personalizados
  if (chat.welcome && m.messageStubType == 27) {
    let bienvenida = `❀ *Se unió* al grupo *${groupMetadata.subject.trim()}*\n    ✰ @${m.messageStubParameters[0].split`@`[0]} \n\n    Ꮚ⁠˘⁠ ⁠ꈊ⁠ ⁠˘⁠ ⁠Ꮚ ¡Bienvenido! ¡Esperamos que tengas un excelente día!\n\n> ✐ No olvides usar *#help* si necesitas algo.\n> 🜸 ¡Disfruta de tu tiempo con nosotros!`;

    let img = await generateImage(
      '¡BIENVENIDO!',
      `¡Hola Bienvenido al grupo!`
    );

    await conn.sendAi(m.chat, packname, dev, bienvenida, img, img, web, null);
  }

  if (chat.welcome && m.messageStubType == 28) {
    let bye = `❀ *Se salió* del grupo  *${groupMetadata.subject.trim()}*\n    ✰ @${m.messageStubParameters[0].split`@`[0]}\n\n    Ꮚ⁠˘⁠ ⁠ꈊ⁠ ⁠˘⁠ ⁠Ꮚ ¡Nos vemos pronto! ¡Que tengas un buen día!\n\n> ✐ No olvides usar *#help* si necesitas algo.\n> 🜸 Próximamente...`;

    let img = await generateImage(
      '¡ADIOS!',
      `¡Hasta pronto Usuario!`
    );

    await conn.sendAi(m.chat, packname, dev, bye, img, img, webb, null);
  }

  if (chat.welcome && m.messageStubType == 32) {
    let kick = `❀ *Fue expulsado* del grupo  *${groupMetadata.subject.trim()}*\n    ✰ @${m.messageStubParameters[0].split`@`[0]}\n\n    Ꮚ⁠˘⁠ ⁠ꈊ⁠ ⁠˘⁠ ⁠Ꮚ ¡Nos vemos pronto! ¡Que tengas un buen día!\n\n> ✐ No olvides usar *#help* si necesitas algo.\n> 🜸 Próximamente...`;

    let img = await generateImage(
      'EXPULSADO',
      `¡fue expulsado del grupo.!`
    );

    await conn.sendAi(m.chat, packname, dev, kick, img, img, web, null);
  }
}