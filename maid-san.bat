@echo off
chcp 65001 >nul
REM スクリプトがある親フォルダに移動
cd /d "%~dp0"

REM 配下のフォルダをすべてチェックして serve.js があれば実行
for /d %%i in (*) do (
    if exist "%%i\serve.js" (
        echo === 実行中: %%i ===
        cd "%%i"
        node serve.js
        cd ..
        echo --------------------------
    )
)

echo すべての serve.js の処理が完了しました！
pause