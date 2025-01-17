import {WAMessageStubType} from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, {conn, participants, groupMetadata}) {
  if (!m.messageStubType || !m.isGroup) return !0;
  const groupName = (await conn.groupMetadata(m.chat)).subject;
  let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://qu.ax/Tdxwk.jpg')
  let img = await (await fetch(`${pp}`)).buffer()
  let chat = global.db.data.chats[m.chat]
  
  let who = m.messageStubParameters[0] + '@s.whatsapp.net';
  let user = global.db.data.users[who];

  let userName = user ? user.name : await conn.getName(who);

  if (chat.welcome && m.messageStubType == 27) {
    let bienvenida = `❀ *Se unio* al grupo *${groupName}*\n    ✰ @${m.messageStubParameters[0].split`@`[0]} \n\n        •(=^●ω●^=)• ¡Bienvenido! ¡Esperamos que tengas un excelente día!\n\n> ✐ no olvides usar *#help* si necesitas algo.\n > 🜸 ¡Disfruta de tu tiempo con nosotros!`;
    
await conn.sendAi(m.chat, packname, dev, bienvenida, img, img, canal, estilo)
  }
  
  if (chat.welcome && m.messageStubType == 28) {
    let bye = `❀ *se salio* del grupo  *${groupName}*\n    ✰ @${m.messageStubParameters[0].split`@`[0]}\n\n    •(=^●ω●^=)• ¡Nos vemos pronto! ¡Que tengas un buen día!\n\n> ✐ No olvides usar *#help* si necesitas algo.\n> 🜸 Proximamente...`;

await conn.sendAi(m.chat, packname, dev, bye, img, img, canal, estilo)
  }
  
  if (chat.welcome && m.messageStubType == 32) {
    let kick = `❀ *se salio* del grupo  *${groupName}*\n    ✰ @${m.messageStubParameters[0].split`@`[0]}\n\n    •(=^●ω●^=)• ¡Nos vemos pronto! ¡Que tengas un buen día!\n\n> ✐ No olvides usar *#help* si necesitas algo.\n> 🜸 Proximamente...`;
await conn.sendAi(m.chat, packname, dev, kick, img, img, canal, estilo)
}}
