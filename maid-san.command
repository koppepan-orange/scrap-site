#!/bin/bash
# スクリプトがある親フォルダに移動
cd "$(dirname "$0")"

# 配下のすべてのフォルダを捜索して serve.js があれば実行する
find . -type f -name "serve.js" | while read -r file; do
  # serve.js がある子フォルダのパスを抽出
  dir=$(dirname "$file")
  echo "=== 実行中: $dir ==="
  
  # 子フォルダに移動して node serve.js を実行し、元に戻る
  (cd "$dir" && node serve.js)
  
  echo "--------------------------"
done

echo "すべての serve.js の処理が完了しました！"