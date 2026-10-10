const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'assets/txts');
// const outputFile = path.join(__dirname, 'output.txt'); //←これにすると、絶対に同階層になるらしい？んまあ保険だね

// フォルダ内のファイルを読み込む
fs.readdir(targetDir, (err, files) => {
    if(err){
        console.error('エラー:', err);
        return;
    }

    // .txtファイルだけを抽出して配列にする
    const txtFiles = files.filter(file => file.endsWith('.txt'));

    // data.js の中身の文字列を作る
    const fileData = txtFiles.map(file => {
        const content = fs.readFileSync(path.join(targetDir, file), 'utf-8');
        return {
            name: file,
            body: content
        };
    });

    const outputCode = `const cards = ${JSON.stringify(fileData, null, 2)};`;

    // data.js に書き出す
    fs.appendFileSync("output.txt", outputCode, 'utf-8');
    console.log('output.txt に追記しました！');
});