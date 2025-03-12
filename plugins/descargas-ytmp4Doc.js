import axios from 'axios'

let handler = async (m, { usedPrefix, command, conn, text }) => {
  if (!text) throw `Error! Ingresa un usuario. *Ejemplo:* ${usedPrefix + command} mrbeast`

  try {
    m.reply('⏳ Buscando información...')

    let ress = await axios.get(`https://api.koboo.my.id/api/stalk/tiktok?username=${text}`)
    let res = ress.data

    if (res.status !== 200) throw 'Error! No se encontró el usuario. Asegúrate de escribirlo correctamente.'

    let user = res.result.user
    let stats = res.result.stats
    let profileTab = user.profileTab

    let teks = `乂  *STALKER TIKTOK*\n
*◦ NOMBRE :* ${user.nickname}
*◦ USUARIO :* ${user.uniqueId}
*◦ ID :* ${user.id}
*◦ SEGUIDORES :* ${stats.followerCount}
*◦ SIGUIENDO :* ${stats.followingCount}
*◦ ME GUSTAS :* ${stats.heartCount}
*◦ VIDEOS :* ${stats.videoCount}
*◦ AMIGOS :* ${stats.friendCount}
*◦ DESCRIPCIÓN :* ${user.signature || 'Sin descripción'}
*◦ REGIÓN :* ${user.region || 'Desconocida'}
*◦ ID SEGURO :* ${user.secUid}
*◦ CUENTA PRIVADA :* ${user.privateAccount ? '🔒 Sí' : '🔓 No'}
*◦ VERIFICADO :* ${user.verified ? '✅ Sí' : '❌ No'}
*◦ CUENTA COMERCIAL :* ${user.commerceUserInfo.commerceUser ? '🛒 Sí' : '❌ No'}
*◦ DESCARGAS PERMITIDAS :* ${user.downloadSetting === 3 ? '✅ Sí' : '❌ No'}
*◦ PUEDE EXPANDIR PLAYLIST :* ${user.canExpPlaylist ? '✅ Sí' : '❌ No'}
*◦ MUESTRA PESTAÑA DE MÚSICA :* ${profileTab.showMusicTab ? '✅ Sí' : '❌ No'}
*◦ MUESTRA PESTAÑA DE PREGUNTAS :* ${profileTab.showQuestionTab ? '✅ Sí' : '❌ No'}
*◦ MUESTRA PESTAÑA DE PLAYLIST :* ${profileTab.showPlayListTab ? '✅ Sí' : '❌ No'}
*◦ ORGANIZACIÓN :* ${user.isOrganization ? '🏢 Sí' : '❌ No'}
*◦ LENGUAJE :* ${user.language || 'Desconocido'}`

    await conn.sendMessage(m.chat, { image: { url: user.avatarLarger }, caption: teks }, { quoted: m })

  } catch (err) {
    m.reply('❌ Error: No se encontró el usuario o la API falló. Intenta nuevamente.')
  }
}

handler.help = ['stalktiktok <usuario>']
handler.tags = ['stalk']
handler.command = /^(tiktokstalk|stalktiktok|ttstalk)$/i

export default handler