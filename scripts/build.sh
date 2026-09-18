#!/usr/bin/env bash
# Rebuild tokens.css, dist/ and component previews from src/. Needs Node 18+ and `npm install`.
set -euo pipefail
cd "$(dirname "$0")/.."
python3 scripts/tokens-to-css.py
ESB="npx esbuild --bundle --format=iife --minify --jsx-factory=React.createElement --jsx-fragment=React.Fragment --target=es2018 --log-level=warning --alias:react=./src/components/react-global.js"
$ESB src/components/index.jsx --outfile=.tmp.js
hdr=$(node -e "const m=require('./src/previews/meta.json');console.log(JSON.stringify({format:4,namespace:'S21',components:Object.keys(m).map(name=>({name}))}))")
{ echo "/* @ds-bundle: $hdr */"; cat .tmp.js; } > dist/system21.js
cp src/components/bundle.css dist/system21.css
for n in $(node -e "console.log(Object.keys(require('./src/previews/meta.json')).join(' '))"); do
  $ESB "src/previews/$n.jsx" --outfile=.tmp.js
  N="$n" node -e '
    const fs=require("fs"), n=process.env.N; const [g,h,w]=require("./src/previews/meta.json")[n];
    const js=fs.readFileSync(".tmp.js","utf8");
    if(/<\/script|<!--/i.test(js)) throw new Error("unsafe preview "+n);
    fs.mkdirSync("components/"+n,{recursive:true});
    fs.writeFileSync("components/"+n+"/preview.html","<!-- @dsCard group=\""+g+"\" height="+h+(w?" width="+w:"")+" -->\n<div id=\"root\"></div>\n<script>"+js+"</script>\n");'
done
rm -f .tmp.js
echo "Build OK"
