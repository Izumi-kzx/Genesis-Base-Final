import axios from 'axios'
import cheerio from 'cheerio'
import FormData from 'form-data'

async function ffStalk(id) {
    let formdata = new FormData()
    formdata.append('uid', id)
    let { data } = await axios.post('https://tools.freefireinfo.in/profileinfo.php?success=1', formdata, {
        headers: {
            "content-type": "application/x-www-form-urlencoded",
            "origin": "https://tools.freefireinfo.in",
            "referer": "https://tools.freefireinfo.in/profileinfo.php?success=1",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
            "cookie": "_ga=GA1.1.1069461514.1740728304; __gads=ID=fa4de8c6be61d818:T=1740728303:RT=1740728303:S=ALNI_MYhU5TQnoVCO8ZG1O95QdJQc1-u1Q; __gpi=UID=0000104decca5eb5:T=1740728303:RT=1740728303:S=ALNI_MaVhADwQqMyGY78ZADfPLLbbw8zfQ; __eoi=ID=f87957be98f6348b:T=1740728303:RT=1740728303:S=AA-Afjb5ISbOLmlxgjjGBUWT3RO3; PHPSESSID=d9vet6ol1uj3frjs359to1i56v; _ga_JLWHS31Q03=GS1.1.1740728303.1.1.1740728474.0.0.0; _ga_71MLQQ24RE=GS1.1.1740728303.1.1.1740728474.57.0.1524185982; FCNEC=%5B%5B%22AKsRol9jtdxZ87hML5ighFLFnz7cP30Fki_Fu8JOnfi-SOz3P6QL33-sNGahy6Hq5X9moA6OdNMIcgFtvZZJnrPzHecI_XbfIDiQo9Nq-I1Y_PRXKDUufD0nNWLvDRQBJcdvu_bOqn2X06Njaz3k4Ml-NvsRVw21ew%3D%3D%22%5D%5D"
        }
    })
    const $ = cheerio.load(data)
    let tr = $('div.result').html().split('<br>')
    let name = tr[0].split('Name: ')[1]
    let bio = tr[14].split(': ')[1]
    let like = tr[2].split(': ')[1]
    let level = tr[3].split(': ')[1]
    let exp = tr[4].split(': ')[1]
    let region = tr[5].split(': ')[1]
    let honorScore = tr[6].split(': ')[1]
    let brRank = tr[7].split(': ')[1]
    let brRankPoint = tr[8].split(': ')[1]
    let csRankPoint = tr[9].split(': ')[1]
    let accountCreated = tr[10].split(': ')[1]
    let lastLogin = tr[11].split(': ')[1]
    let preferMode = tr[12].split(': ')[1]
    let language = tr[13].split(': ')[1]
    let booyahPassPremium = tr[16].split(': ')[1]
    let booyahPassLevel = tr[17].split(': ')[1]
    let petName = tr[20].split(': ')[1] || 'doesnt have pet.'
    let petLevel = tr[21].split(': ')[1] || 'doesnt have pet.'
    let petExp = tr[22].split(': ')[1] || 'doesnt have pet.'
    let starMarked = tr[23].split(': ')[1] || 'doesnt have pet.'
    let selected = tr[24].split(': ')[1] || 'doesnt have pet.'
    // Extract guild info - need to check if it exists in the result
    let guild = 'Tidak memiliki guild'
    if (tr.length > 26 && tr[26]) {
        if (tr[26].includes('Guild:')) {
            guild = tr[26].split('Guild: ')[1]
        }
    }
    let equippedItems = []
    $('.equipped-items').find('.equipped-item').each((i, e) => {
        let name = $(e).find('p').text().trim()
        let img = $(e).find('img').attr('src')
        equippedItems.push({
            name,
            img
        })
    })
    return {
        name,
        bio,
        like,
        level,
        exp,
        region,
        honorScore,
        brRank,
        brRankPoint,
        csRankPoint,
        accountCreated,
        lastLogin,
        preferMode,
        language,
        booyahPassPremium,
        booyahPassLevel,
        petInformation: {
            name: petName,
            level: petLevel,
            exp: petExp,
            starMarked,
            selected
        },
        guild,
        equippedItems
    }
}

let handler = async (m, { conn, text }) => {
    if (!text) return m.reply('Masukkan ID Free Fire!')
    
    m.reply('Searching...')
    
    try {
        const result = await ffStalk(text)
        
        let equippedItemsText = ''
        if (result.equippedItems && result.equippedItems.length > 0) {
            equippedItemsText = result.equippedItems.map(item => `• ${item.name}`).join('\n')
        } else {
            equippedItemsText = 'Tidak ada item'
        }
        
        let caption = `
*「 FREE FIRE STALK 」*

*👤 Profile Info*
• Name: ${result.name}
• Bio: ${result.bio}
• Like: ${result.like}
• Level: ${result.level}
• EXP: ${result.exp}
• Region: (${result.region}
• Honor Score: ${result.honorScore}
• BR Rank: ${result.brRank}
• BR Rank Point: ${result.brRankPoint}
• CS Rank Point: ${result.csRankPoint}
• Account Created: ${result.accountCreated}
• Last Login: ${result.lastLogin}
• Prefer Mode: ${result.preferMode}
• Language: ${result.language}

*🎖️ Booyah Pass*
• Premium: ${result.booyahPassPremium}
• Level: ${result.booyahPassLevel}

*🐾 Pet Information*
• Name: ${result.petInformation.name}
• Level: ${result.petInformation.level}
• EXP: ${result.petInformation.exp}
• Star Marked: ${result.petInformation.starMarked}
• Selected: ${result.petInformation.selected}

*🎮 Equipped Items*
${equippedItemsText}
`.trim()
        
        await conn.sendMessage(m.chat, { text: caption }, { quoted: m })
    } catch (error) {
        console.error(error)
        m.reply('Terjadi kesalahan saat mencari ID tersebut. Pastikan ID yang dimasukkan benar.')
    }
}

handler.help = ['ffstalk']
handler.tags = ['stalk']
handler.command = /^(ffstalk|freestalk)$/i

export default handler