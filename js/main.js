gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const isMobile = window.innerWidth <= 767;
const scrollContainer = isMobile ? document.body : undefined;

const slides = gsap.utils.toArray('.Slide');
let currentIndex = 0;

function updateMenu(index) {
  const lastIndex = slides.length - 1;
  if (index === 0 || index === lastIndex) {
    $('.Main_menu_outer').removeClass('On_content');
  } else {
    $('.Main_menu_outer').addClass('On_content');
  }
}

function goToSlide(index) {
  if (index < 0 || index >= slides.length) return;
  currentIndex = index;
  updateMenu(index);
  slides[index].scrollIntoView({ behavior: 'smooth' });
}

if (window.innerWidth > 767) {
  ScrollTrigger.create({
    snap: {
      snapTo: 1 / (slides.length - 1),
      duration: { min: 0.3, max: 0.6 },
      delay: 0.1,
      ease: 'power1.inOut'
    },
    onUpdate: (self) => {
      const newIndex = Math.round(self.progress * (slides.length - 1));
      if (newIndex !== currentIndex) {
        currentIndex = newIndex;
        updateMenu(currentIndex);
      }
    }
  });
}


// 인트로 애니메이션
const tlIntro = gsap.timeline();
tlIntro
  .from('.Slide01 .Rule_line', { scaleX: 0, transformOrigin: 'center', duration: 0.9, ease: 'power3.out', stagger: 0.12 })
  .from('.Slide01_meta', { opacity: 0, y: 10, duration: 0.6, ease: 'power2.out' }, '-=0.4')
  .from('.Start_title', { opacity: 0, y: 30, duration: 0.9, ease: 'power2.out' }, '-=0.2')
  .from('.Slide01_bg_txt', { opacity: 0, x: 20, duration: 0.8, ease: 'power2.out' }, '-=0.5')
  .from('.Slide01_sub', { opacity: 0, y: 10, duration: 0.6, ease: 'power2.out' }, '-=0.3')


// slide06 애니메이션
const tlClosing = gsap.timeline({
  scrollTrigger: {
    trigger: '.Footer',
    start: 'top 80%',
    scroller: scrollContainer,
  }
});
tlClosing
  .from('.Footer > .Footer_inner > .Rule_block .Rule_line', { scaleX: 0, transformOrigin: 'center', duration: 0.9, ease: 'power3.out', stagger: 0.12 })
  .from('.Closing_issue', { opacity: 0, y: 10, duration: 0.5, ease: 'power2.out' }, '-=0.3')
  .from('.End_title', { opacity: 0, y: 30, duration: 0.8, ease: 'power2.out' }, '-=0.2')
  .from('.Closing_sub', { opacity: 0, y: 10, duration: 0.5, ease: 'power2.out' }, '-=0.3')
  .from('.Closing_right', { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' }, '-=0.4')
  .from('.Closing_footer .Rule_line', { scaleX: 0, transformOrigin: 'center', duration: 0.7, ease: 'power3.out', stagger: 0.1 }, '-=0.2')
  .from('.Closing_footer_text', { opacity: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2')


// 프로젝트 패널
const $panel = $('.Project_news');
const $rail = $('.Project_rail');
let railIndex = 0;

function openPanel(projectIndex) {
  railIndex = projectIndex;
  gsap.set($rail[0], { x: -(railIndex * 100) + '%' });
  gsap.set($panel[0], { y: '100%', display: 'block' });
  $panel[0].scrollTop = 0;
  $panel.addClass('Is-open');
  $('.Scroll_hint').addClass('Is-open');
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
  gsap.to($panel[0], { y: '0%', duration: 0.6, ease: 'power3.out' });
}

function closePanel() {
  gsap.to($panel[0], {
    y: '100%',
    duration: 0.5,
    ease: 'power3.in',
    onComplete: () => {
      $panel.css('display', 'none');
      $panel.removeClass('Is-open');
      $('.Scroll_hint').removeClass('Is-open');
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
  });
}

// 프로젝트 캐러셀
const carouselCards = document.querySelectorAll('.Carousel_card');
const carouselDots = document.querySelectorAll('.Carousel_dot');
let carouselCurrent = 0;

function updateCarousel() {
  const total = carouselCards.length;
  carouselCards.forEach(card => {
    const idx = parseInt(card.dataset.index);
    let diff = idx - carouselCurrent;
    if (diff > Math.floor(total / 2)) diff -= total;
    if (diff < -Math.floor(total / 2)) diff += total;
    card.dataset.pos = (diff >= -2 && diff <= 2) ? diff : 'hidden';
  });
  carouselDots.forEach((dot, i) => dot.classList.toggle('Active', i === carouselCurrent));
}

$('.Carousel_next').on('click', function() {
  carouselCurrent = (carouselCurrent + 1) % carouselCards.length;
  updateCarousel();
});
$('.Carousel_prev').on('click', function() {
  carouselCurrent = (carouselCurrent - 1 + carouselCards.length) % carouselCards.length;
  updateCarousel();
});
$('.Carousel_dot').on('click', function() {
  carouselCurrent = parseInt(this.dataset.dot);
  updateCarousel();
});

// 센터 카드 클릭 → 상세 패널, 사이드 카드 클릭 → 센터로 이동
$('.Carousel_card.Project').on('click', function () {
  const pos = this.dataset.pos;
  if (pos === '0') {
    openPanel(parseInt(this.dataset.index));
  } else {
    carouselCurrent = parseInt(this.dataset.index);
    updateCarousel();
  }
});

// 센터 카드 호버 시 nav 숨기기
const carouselNav = document.querySelector('.Carousel_nav');
carouselCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    if (card.dataset.pos === '0') carouselNav.classList.add('Hide');
  });
  card.addEventListener('mouseleave', () => {
    carouselNav.classList.remove('Hide');
  });
});

$('.Next_btn').on('click', function () {
  railIndex = (railIndex + 1) % $('.Site_detail').length;
  gsap.to($rail[0], { x: -(railIndex * 100) + '%', duration: 0.3, ease: 'power2.inOut' });
});

$('.Prev_btn').on('click', function () {
  const total = $('.Site_detail').length;
  railIndex = (railIndex - 1 + total) % total;
  gsap.to($rail[0], { x: -(railIndex * 100) + '%', duration: 0.3, ease: 'power2.inOut' });
});

$(document).on('click', '.Panel_close', function () {
  closePanel();
});

$(document).on('keydown', function (e) {
  if (!$panel.hasClass('Is-open')) return;
  const container = $panel[0];
  const detail = $panel.find('.Site_detail').eq(railIndex);
  const down = detail.find('.Project_down')[0];
  if (e.key === 'ArrowUp') {
    e.preventDefault();
    container.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (down) container.scrollTo({ top: down.offsetTop, behavior: 'smooth' });
  } else if (e.key === 'ArrowRight') {
    e.preventDefault();
    $('.Next_btn').trigger('click');
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault();
    $('.Prev_btn').trigger('click');
  }
});

$('.Code_review_btn').on('click', function() {
  const down = $(this).closest('.Site_detail').find('.Project_down');
  const container = document.querySelector('.Project_news');
  
  gsap.to(container, {
    scrollTop: down[0].offsetTop,
    duration: 1,
    ease: 'power2.inOut'
  });
});


// 갤러리 모달
function openModal(type) {
  const modalData = {
    banner: { category: 'Banner Works', title: '배너 <em>디자인</em>' },
    design: { category: 'Design Works', title: '그래픽 <em>디자인</em>' },
    ai:     { category: 'AI Works', title: 'AI <em>활용</em>' }
  };
  $('#modalCategory').text(modalData[type].category);
  $('#modalTitle').html(modalData[type].title);
  $('#bannerContent').toggle(type === 'banner');
  $('#designContent').toggle(type === 'design');
  $('#aiContent').toggle(type === 'ai');
  $('#galleryModal').addClass('Active');
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  $('#galleryModal').removeClass('Active');
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
}

$(document).on('keydown', function (e) {
  if (e.key === 'Escape') closeModal();
});

function filterAI(type, btn) {
  document.querySelectorAll('#galleryModal .Filter_tab').forEach(function(t) { t.classList.remove('Active'); });
  btn.classList.add('Active');
  document.querySelectorAll('#aiGrid .Ai_item').forEach(function(item) {
    if (type === 'all' || item.dataset.aiType === type) {
      item.classList.remove('Hidden');
    } else {
      item.classList.add('Hidden');
    }
  });
}

$(document).on('mousedown', '.Ba_slider', function(e) {
  var slider = this;
  slider.dataset.dragging = 'true';
  updateSlider(slider, e.clientX);
});
$(document).on('mousemove', function(e) {
  document.querySelectorAll('.Ba_slider[data-dragging="true"]').forEach(function(sl) {
    updateSlider(sl, e.clientX);
  });
});
$(document).on('mouseup', function() {
  document.querySelectorAll('.Ba_slider').forEach(function(sl) { sl.dataset.dragging = 'false'; });
});
$(document).on('touchstart', '.Ba_slider', function(e) {
  this.dataset.dragging = 'true';
  updateSlider(this, e.touches[0].clientX);
});
$(document).on('touchmove', '.Ba_slider', function(e) {
  if (this.dataset.dragging === 'true') updateSlider(this, e.touches[0].clientX);
});
$(document).on('touchend', '.Ba_slider', function() { this.dataset.dragging = 'false'; });

function updateSlider(sl, x) {
  var rect = sl.getBoundingClientRect();
  var pos = ((x - rect.left) / rect.width) * 100;
  pos = Math.max(2, Math.min(98, pos));
  sl.dataset.pos = pos;
  var before = sl.querySelector('.Ba_before');
  var handle = sl.querySelector('.Ba_handle');
  if (before) before.style.clipPath = 'inset(0 ' + (100 - pos) + '% 0 0)';
  if (handle) handle.style.left = pos + '%';
}


// 메뉴 클릭 → 슬라이드 이동
const menuLinks = [1, 3, 4, 5];
$('.Main_menu ul li').each(function (i) {
  $(this).on('click', function () {
    goToSlide(menuLinks[i]);
  });
});


// 아이콘 hover
$('.Skill_icon').on('mouseenter', function () {
  const $skill = $(this).closest('.Skill');
  const idx = $skill.find('.Skill_icon').index(this);
  let rowIdx = idx;
  if ($skill.hasClass('Design_skill')) rowIdx = idx <= 2 ? 0 : 1;
  $skill.find('.Skill_row').eq(rowIdx).find('.Skill_name, .Skill_desc').css('color', '#46A8E2');
}).on('mouseleave', function () {
  const $skill = $(this).closest('.Skill');
  const idx = $skill.find('.Skill_icon').index(this);
  let rowIdx = idx;
  if ($skill.hasClass('Design_skill')) rowIdx = idx <= 2 ? 0 : 1;
  $skill.find('.Skill_row').eq(rowIdx).find('.Skill_name, .Skill_desc').css('color', '');
});

// 모바일: 아이콘 클릭 → 스킬 설명 전환
if (window.innerWidth <= 767) {
  $('.Skill_txt').each(function () {
    $(this).find('.Skill_row').first().addClass('Active');
  });
  $('.Skill_img').each(function () {
    $(this).find('.Skill_icon').first().addClass('Active');
  });

  $('.Skill_icon').on('click', function () {
    const $skill = $(this).closest('.Skill');
    const idx = $skill.find('.Skill_icon').index(this);
    let rowIdx = idx;
    if ($skill.hasClass('Design_skill')) rowIdx = idx <= 2 ? 0 : 1;

    $skill.find('.Skill_icon').removeClass('Active');
    $(this).addClass('Active');
    if ($skill.hasClass('Design_skill') && idx <= 2) {
      $skill.find('.Skill_icon').slice(0, 3).addClass('Active');
    }

    $skill.find('.Skill_row').removeClass('Active');
    $skill.find('.Skill_row').eq(rowIdx).addClass('Active');
  });
}

// skill_row hover
$('.Skill_row').on('mouseenter', function () {
  const $skill = $(this).closest('.Skill');
  const idx = $skill.find('.Skill_row').index(this);
  if ($skill.hasClass('Design_skill') && idx === 0) {
    $skill.find('.Skill_icon').slice(0, 3).each(function (i) {
      gsap.fromTo(this, { y: 0 }, { y: -10, duration: 0.2, yoyo: true, repeat: 3, ease: 'power1.inOut', delay: i * 0.08 });
    });
  } else {
    const iconIdx = ($skill.hasClass('Design_skill') && idx === 1) ? 3 : idx;
    gsap.fromTo($skill.find('.Skill_icon').eq(iconIdx)[0], { y: 0 }, { y: -10, duration: 0.2, yoyo: true, repeat: 3, ease: 'power1.inOut' });
  }
});


// 프로필 fade in
gsap.set('.Right_slide02 > *', { opacity: 0, y: 20 });
gsap.to('.Right_slide02 > *', {
  opacity: 1,
  y: 0,
  duration: 0.6,
  stagger: 0.15,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.Slide02',
    start: 'top center',
    scroller: scrollContainer,
  }
});

gsap.set('.Profile_info > div', { opacity: 0, y: 20 });
gsap.to('.Profile_info > div', {
  opacity: 1,
  y: 0,
  duration: 0.6,
  stagger: 0.2,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.Slide02',
    start: 'top center',
    scroller: scrollContainer,
  }
});


// 프로젝트 코드 탭 전환
$(document).on('click', '.Code_index li', function () {
  const $this = $(this);
  const $projectDown = $this.closest('.Project_down');
  const idx = $this.index();
  
  $projectDown.find('.Code_index li').removeClass('Active');
  $this.addClass('Active');
  $projectDown.find('.Code_canvas > ul > li').removeClass('Active');
  $projectDown.find('.Code_canvas > ul > li').eq(idx).addClass('Active');
  $projectDown.find('.Tab_con').removeClass('Active');
  $projectDown.find('.Tab_con').eq(idx).addClass('Active');
});

$(document).on('click', '.Idx_prev', function() {
  const $list = $(this).siblings('.Code_index');
  const $prev = $list.find('li.Active').prev('li');
  if ($prev.length) {
    $prev.trigger('click');
    $list.animate({ scrollLeft: $prev[0].offsetLeft - $list[0].offsetLeft }, 300);
  }
});

$(document).on('click', '.Idx_next', function() {
  const $list = $(this).siblings('.Code_index');
  const $next = $list.find('li.Active').next('li');
  if ($next.length) {
    $next.trigger('click');
    $list.animate({ scrollLeft: $next[0].offsetLeft - $list[0].offsetLeft }, 300);
  }
});


// 이미지 에러 처리
document.querySelectorAll('.Thumb_box img').forEach(img => {
  img.addEventListener('error', function () {
    this.parentElement.style.background = '#c8d8e8';
    this.remove();
  });
});

document.querySelectorAll('.Masonry_item img').forEach(img => {
  img.addEventListener('error', function () {
    this.parentElement.style.height = '180px';
    this.remove();
  });
});


// 모바일: 스크롤 시 현재 슬라이드 감지 → GNB 업데이트
if (window.innerWidth <= 767) {
  let scrollTimer = null;
  window.addEventListener('scroll', () => {
    if (scrollTimer) return;
    scrollTimer = setTimeout(() => {
      const vh = window.innerHeight;
      let newIndex = 0;
      slides.forEach((slide, i) => {
        if (window.scrollY >= slide.offsetTop - vh / 2) {
          newIndex = i;
        }
      });
      if (newIndex !== currentIndex) {
        currentIndex = newIndex;
        updateMenu(currentIndex);
      }
      scrollTimer = null;
    }, 100);
  });
}

// 초기 메뉴 상태 (DOM ready 후 실행)
$(function () {
  updateMenu(0);
});