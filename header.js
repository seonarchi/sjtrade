/* SJ ONE — 제품 이미지 클릭 시 크게 보기 (라이트박스) */
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
