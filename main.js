
// Current Year Update
document.addEventListener('DOMContentLoaded', () => {
  const yearSpan = document.querySelector('.current-year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Simple Login Check
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

  // Hero Slider Logic - Enhanced
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length > 1) {
    let currentSlide = 0;
    
    function nextSlide() {
      // Current slide fade out
      slides[currentSlide].classList.remove('active');
      
      // Calculate next index
      currentSlide = (currentSlide + 1) % slides.length;
      
      // Next slide fade in
      slides[currentSlide].classList.add('active');
    }

    // Set interval for automatic slide
    setInterval(nextSlide, 5000); // 5 seconds
  }

  // Product Click Event -> Redirect to Detail Page
  document.querySelectorAll('.post-item, .post-list-item').forEach(item => {
    item.style.cursor = 'pointer';
    item.addEventListener('click', () => {
      const title = encodeURIComponent(item.querySelector('h4')?.textContent || item.querySelector('.post-title')?.textContent || item.querySelector('.post-list-title')?.textContent || "제품 정보");
      const price = encodeURIComponent(item.getAttribute('data-price') || "상담 문의");
      const discount = encodeURIComponent(item.getAttribute('data-discount') || "상담 문의");
      const video = encodeURIComponent(item.getAttribute('data-video') || "dQw4w9WgXcQ"); // YouTube ID
      const intro = encodeURIComponent(item.querySelector('.post-desc')?.textContent || item.getAttribute('data-intro') || "제품의 상세한 소개 정보가 준비 중입니다.");
      const usage = encodeURIComponent(item.getAttribute('data-usage') || "제품 사용법 및 매뉴얼은 아래 가이드를 참고해 주세요.");

      // 상세 페이지로 파라미터와 함께 이동
      window.location.href = `product-detail.html?title=${title}&price=${price}&discount=${discount}&video=${video}&intro=${intro}&usage=${usage}`;
    });
  });
});
