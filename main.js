
// Current Year Update
document.addEventListener('DOMContentLoaded', () => {
  const yearSpan = document.querySelector('.current-year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Simple Login Check (Using localStorage for demo)
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const loginBtn = document.querySelector('.login-btn');
  
  if (isLoggedIn && loginBtn) {
    loginBtn.innerHTML = '<i class="fa-solid fa-right-from-bracket"></i> 로그아웃';
    loginBtn.href = '#';
    loginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('isLoggedIn');
      location.reload();
    });
  }

  // Create Modal Structure
  const modalHtml = `
    <div id="productModal" class="modal" style="display:none; position:fixed; z-index:1000; left:0; top:0; width:100%; height:100%; background:rgba(0,0,0,0.7); align-items:center; justify-content:center;">
      <div class="modal-content" style="background:white; padding:30px; border-radius:12px; max-width:500px; width:90%; position:relative; box-shadow:0 10px 25px rgba(0,0,0,0.2);">
        <span class="close-modal" style="position:absolute; right:20px; top:15px; font-size:28px; cursor:pointer;">&times;</span>
        <h2 id="modalTitle" style="margin-bottom:15px; color:var(--text-dark);">제품 상세 정보</h2>
        <div id="modalBody" style="line-height:1.6; color:var(--text-normal);">
          <div id="priceSection" style="margin-bottom:20px; padding:15px; background:#f8f9fa; border-radius:8px;">
            <p id="priceText" style="font-weight:700; font-size:18px; margin-bottom:5px;"></p>
            <p id="discountInfo" style="font-size:14px; color:var(--primary);"></p>
          </div>
          <div id="manualSection" style="margin-bottom:10px;">
            <h4 style="margin-bottom:10px;"><i class="fa-solid fa-video"></i> 설치 방법 매뉴얼</h4>
            <a id="manualLink" href="#" target="_blank" style="color:var(--primary); text-decoration:underline;">설치 동영상 보기 (YouTube)</a>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHtml);

  const modal = document.getElementById('productModal');
  const closeModal = document.querySelector('.close-modal');

  // Product Click Event
  document.querySelectorAll('.post-item').forEach(item => {
    item.style.cursor = 'pointer';
    item.addEventListener('click', () => {
      const title = item.querySelector('h4')?.textContent || item.querySelector('.post-title')?.textContent;
      const price = item.getAttribute('data-price') || "상담 문의";
      const discountPrice = item.getAttribute('data-discount') || "상담 문의";
      const manualUrl = item.getAttribute('data-manual') || "https://www.youtube.com/results?search_query=삼성시스텍+설치";

      document.getElementById('modalTitle').textContent = title;
      const priceText = document.getElementById('priceText');
      const discountInfo = document.getElementById('discountInfo');

      if (isLoggedIn) {
        priceText.innerHTML = `정상가: <span style="text-decoration:line-through; color:#999; font-size:15px;">${price}원</span><br>회원 할인가: <span style="color:var(--primary);">${discountPrice}원</span>`;
        discountInfo.textContent = "✨ 회원님께만 적용되는 특별 할인 가격입니다.";
      } else {
        priceText.textContent = `가격: ${price}원`;
        discountInfo.innerHTML = '<a href="login.html" style="color:var(--primary); text-decoration:underline;">로그인</a>하시면 할인된 가격을 확인하실 수 있습니다.';
      }

      document.getElementById('manualLink').href = manualUrl;
      modal.style.display = 'flex';
    });
  });

  closeModal.onclick = () => modal.style.display = 'none';
  window.onclick = (event) => { if (event.target == modal) modal.style.display = 'none'; };
});
