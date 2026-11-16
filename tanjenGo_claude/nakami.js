(() => {
  const $ = id => document.getElementById(id);
  const show = (id, on) => $(id).classList.toggle("hidden", !on);
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  let count = 5, qs = [], idx = 0, score = 0, wrong = [];

  // 範囲セレクト
  const sel = $("chSel");
  [["all", "全範囲"], ...Chapters.map((c, i) => [String(i), c])].forEach(([v, t]) => {
    const o = document.createElement("option"); o.value = v; o.textContent = t; sel.appendChild(o);
  });

  // タブ
  function setTab(t) {
    $("tabQuiz").classList.toggle("on", t === "quiz");
    $("tabGram").classList.toggle("on", t === "gram");
    show("start", t === "quiz"); show("gram", t === "gram");
    show("quiz", false); show("result", false);
    if (t === "gram") renderGram();
  }
  $("tabQuiz").onclick = () => setTab("quiz");
  $("tabGram").onclick = () => setTab("gram");

  // 問題数
  $("counts").onclick = e => {
    const b = e.target.closest(".cnt"); if (!b) return;
    count = +b.dataset.n;
    document.querySelectorAll(".cnt").forEach(x => x.classList.toggle("on", x === b));
  };

  // 出題
  function makeQuestion(item) {
    const used = new Set([item.m]);
    const dis = [];
    for (const o of shuffle(Words)) {
      if (o.w === item.w || used.has(o.m)) continue;
      used.add(o.m); dis.push(o.m);
      if (dis.length === 3) break;
    }
    return { word: item.w, answer: item.m, choices: shuffle([item.m, ...dis]) };
  }

  function start() {
    const v = sel.value;
    const pool = v === "all" ? Words : Words.filter(w => w.ch === +v);
    if (pool.length < 1) return;
    qs = shuffle(pool).slice(0, count).map(makeQuestion);
    idx = 0; score = 0; wrong = [];
    show("start", false); show("result", false); show("quiz", true);
    render();
  }

  function render() {
    const q = qs[idx];
    $("prog").textContent = `${idx + 1} / ${qs.length}`;
    $("qText").textContent = q.word;
    const box = $("choices"); box.textContent = "";
    q.choices.forEach(c => {
      const b = document.createElement("button");
      b.className = "choice"; b.textContent = c;
      b.onclick = () => answer(b, c);
      box.appendChild(b);
    });
    show("nextBtn", false);
  }

  function answer(btn, c) {
    const q = qs[idx];
    document.querySelectorAll(".choice").forEach(b => {
      b.disabled = true;
      if (b.textContent === q.answer) b.classList.add("ok");
    });
    if (c === q.answer) score++;
    else { btn.classList.add("ng"); wrong.push(q); }
    $("nextBtn").textContent = idx === qs.length - 1 ? "結果を見る" : "次へ";
    show("nextBtn", true);
  }

  $("nextBtn").onclick = () => {
    if (++idx >= qs.length) return finish();
    render();
  };

  function finish() {
    show("quiz", false); show("result", true);
    $("score").textContent = `${score} / ${qs.length}`;
    const box = $("wrongBox"); box.textContent = "";
    if (wrong.length) {
      const h = document.createElement("div"); h.className = "note"; h.textContent = "間違えた問題";
      const ul = document.createElement("ul"); ul.className = "list";
      wrong.forEach(q => {
        const li = document.createElement("li");
        const k = document.createElement("span"); k.className = "k"; k.textContent = q.word;
        li.append(k, "：" + q.answer); ul.appendChild(li);
      });
      box.append(h, ul);
    }
  }

  $("goBtn").onclick = start;
  $("retryBtn").onclick = () => { show("result", false); show("start", true); };

  // 文法一覧（保存データの閲覧のみ）
  function renderGram() {
    const root = $("gram"); root.textContent = "";
    Chapters.forEach((name, ci) => {
      const items = Grams.filter(g => g.ch === ci);
      if (!items.length) return;
      const h = document.createElement("div"); h.className = "ch"; h.textContent = name;
      const ul = document.createElement("ul"); ul.className = "list";
      items.forEach(g => {
        const li = document.createElement("li");
        const k = document.createElement("div"); k.className = "k"; k.textContent = g.p;
        const m = document.createElement("div"); m.textContent = g.m;
        li.append(k, m);
        if (g.note) { const n = document.createElement("div"); n.className = "note"; n.textContent = g.note; li.appendChild(n); }
        ul.appendChild(li);
      });
      root.append(h, ul);
    });
  }
})();
