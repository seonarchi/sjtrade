/* ============================================================
   SJ ONE — 헤더 공통 스크립트
   1) 콘텐츠 로더: [data-sj-load="파일명"] 요소를 pages.dev에서 불러와 채움
   2) 라이트박스: 제품 이미지 클릭 시 크게 보기
   ============================================================ */

/* ---------- 1) 콘텐츠 로더 ---------- */
(function () {
  var BASE = 'https://sjtrade.pages.dev/';
  function load(el) {
    if (el.getAttribute('data-sj-loaded')) return;
    el.setAttribute('data-sj-loaded', '1');
    var name = el.getAttribute('data-sj-load');
    fetch(BASE + name)
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); })
      .then(function (h) { el.innerHTML = h; })
      .catch(function () { el.removeAttribute('data-sj-loaded'); }); // 실패 시 재시도 허용
  }
  function scan(root) {
    (root || document).querySelectorAll('[data-sj-load]').forEach(load);
  }
  function ready(fn) {
    if (document.readyState !== 'loading') { fn(); }
    else { document.addEventListener('DOMContentLoaded', fn); }
  }
  ready(function () {
    scan();
    // 아임웹 코드위젯이 늦게 렌더되는 경우 대비
    if (window.MutationObserver) {
      var mo = new MutationObserver(function (muts) {
        for (var i = 0; i < muts.length; i++) {
          if (muts[i].addedNodes && muts[i].addedNodes.length) { scan(); break; }
        }
      });
      mo.observe(document.body, { childList: true, subtree: true });
      setTimeout(function () { mo.disconnect(); }, 8000); // 과도한 관찰 방지
    }
    setTimeout(scan, 2000); // 보험용 1회 재스캔
  });
})();

/* ---------- 2) 라이트박스 (제품 이미지 클릭 확대) ---------- */
(function () {
  function ready(fn){ if(document.readyState!=='loading'){fn();} else {document.addEventListener('DOMContentLoaded',fn);} }
  ready(function () {
    var box = document.createElement('div');
    box.className = 'sj-lightbox';
    box.innerHTML = '<span class="sj-lb-close" aria-label="닫기">&times;</span><img alt="">';
    document.body.appendChild(box);
    var big = box.querySelector('img');
    function close(){ box.classList.remove('open'); }
    // 이벤트 위임: 코드위젯이 나중에 렌더돼도 동작
    document.addEventListener('click', function (e) {
      var t = e.target.closest('.sj-item-imgs img, .sj-model-img');
      if (!t) return;
      big.src = t.currentSrc || t.src;
      big.alt = t.alt || '';
      box.classList.add('open');
    });
    box.addEventListener('click', close);
    document.addEventListener('keydown', function (e){ if(e.key==='Escape') close(); });
  });
})();
