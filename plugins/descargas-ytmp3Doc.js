import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!text) throw conn.reply(m.chat, '*Ingrese el nombre de la APK que quiera buscar.*', m);

  try {
    const apiUrl = `https://dark-core-api.vercel.app/api/download/getapk?key=user1&url=${encodeURIComponent(text)}`;
    const res = await fetch(apiUrl);
    const json = await res.json();

    if (!json.success) throw '*[❗] Error, no se encontraron resultados para su búsqueda.*';

    const { title, version, category, downloadLink } = json.data;
    const caption = `🍟 *Descargador de APK* 🍟\n\n• *Nombre:* ${title}\n• *Versión:* ${version}\n• *Categoría:* ${category}`;

    await conn.sendMessage(m.chat, {
      document: { url: downloadLink },
      mimetype: 'application/vnd.android.package-archive',
      fileName: `${title}.apk`,
      caption
    }, { quoted: m });

  } catch (e) {
    throw '*[❗] Error al procesar la solicitud.*';
  }
};

handler.help = ['apkdroid *<url>*'];
handler.tags = ['dl'];
handler.command = /^(apkdroid)$/i;

export default handler;