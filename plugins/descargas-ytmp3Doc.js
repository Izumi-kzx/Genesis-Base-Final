import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!text) throw conn.reply(m.chat, '*\`Ingrese el nombre de la APK que quiera buscar. 🤍\`*', m);

  try {
    const apiUrl = `https://dark-core-api.vercel.app/api/download/getapk?key=user1&url=${encodeURIComponent(text)}`;
    const res = await fetch(apiUrl);
    const json = await res.json();

    if (!json.success) throw '*[❗] Error, no se encontraron resultados para su búsqueda.*';

    const { title, version, category, downloadLink } = json.data;
    const fileExtension = downloadLink.endsWith('.zip') ? 'zip' : 'apk';
    const mimetype = fileExtension === 'zip' ? 'application/zip' : 'application/vnd.android.package-archive';

    const caption = `🍟 *Descargador de APK/ZIP* 🍟\n\n• *Nombre:* ${title}\n• *Versión:* ${version}\n• *Categoría:* ${category}`;

    await conn.sendMessage(m.chat, {
      document: { url: downloadLink },
      mimetype,
      fileName: `${title}.${fileExtension}`,
      caption
    }, { quoted: m });

  } catch (e) {
    throw '*[❗] Error al procesar la solicitud.*';
  }
};

handler.help = ['apk *<nombre>*'];
handler.tags = ['dl'];
handler.command = /^(apk2)$/i;

export default handler;