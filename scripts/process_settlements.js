const fs = require('fs');
const readline = require('readline');

function transliterate(text) {
    const map = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ж': 'zh', 'з': 'z',
        'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p',
        'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch',
        'ш': 'sh', 'щ': 'sht', 'ъ': 'a', 'ь': 'y', 'ю': 'yu', 'я': 'ya'
    };
    let res = text.toLowerCase().split('').map(char => map[char] || char).join('');
    // Normalize common variations for better search match
    res = res.replace(/iy(?=[aeiou]|$)/g, 'i'); // e.g., Sofiya -> Sofia
    return res;
}

async function processCSV() {
    const fileStream = fs.createReadStream('settlements.csv');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    const settlements = [];
    let isFirst = true;

    for await (const line of rl) {
        if (isFirst) {
            isFirst = false;
            continue;
        }

        const parts = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);

        if (parts && parts.length >= 8) {
            const isVillage = parts[0].replace(/"/g, '') === "1";
            const name = parts[1].replace(/"/g, '');
            const province = parts[3].replace(/"/g, '');
            const geo = parts[7].replace(/"/g, ''); // format "lng,lat" e.g. "23.075925,43.687317"

            const [lng, lat] = geo.split(',').map(Number);

            settlements.push({
                n: name,
                t: transliterate(name),
                p: province,
                v: isVillage ? 1 : 0,
                lat,
                lng
            });
        }
    }

    settlements.sort((a, b) => {
        if (a.v !== b.v) return a.v - b.v;
        return a.n.localeCompare(b.n, 'bg');
    });

    const outDir = 'public/data';
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    fs.writeFileSync('public/data/settlements.json', JSON.stringify(settlements));
    console.log(`Processed ${settlements.length} settlements with coordinates and improved transliteration.`);
}

processCSV();
