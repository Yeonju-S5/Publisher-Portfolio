gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const slides = gsap.utils.toArray('.slide');
let currentIndex = 0;
let isAnimating = false;

function updateMenu(index) {
  const lastIndex = slides.length - 1;  // 마지막 슬라이드 인덱스 자동 계산
  if (index === 0 || index === lastIndex) {
    $('.main_menu_outer').removeClass('on_content');
  } else {
    $('.main_menu_outer').addClass('on_content');
  }
}

function goToSlide(index) {
  if (index < 0 || index >= slides.length) return;
  isAnimating = true;
  gsap.to(window, {
    duration: 0.6,
    scrollTo: { y: slides[index], offsetY: 0 },
    ease: 'power2.inOut',
    onComplete: () => {
      currentIndex = index;
      isAnimating = false;
      updateMenu(index);
    }
  });
}

const menuHeight = document.querySelector('.main_menu_outer').offsetHeight;

document.querySelectorAll('.slide02, .slide04, .slide05').forEach(el => {
  el.style.paddingTop = menuHeight + 'px';
  el.style.boxSizing = 'border-box';
  el.style.justifyContent = 'center';
});

document.querySelector('.slide03').style.paddingTop = menuHeight + 'px';

window.addEventListener('wheel', (e) => {
  if (isAnimating) return;

  if (currentIndex === 2 && e.deltaY > 0) {
    const slide03 = slides[2];
    const slideBottom = slide03.offsetTop + slide03.offsetHeight;
    const windowBottom = window.scrollY + window.innerHeight;
    if (windowBottom < slideBottom - 10) return;
  }

  if (document.querySelector('.project_news').classList.contains('is-open')) return;
  if (document.getElementById('galleryModal').classList.contains('active')) return;

  if (e.deltaY > 0) {
    goToSlide(currentIndex + 1);
  } else {
    goToSlide(currentIndex - 1);
  }
});

window.addEventListener('resize', () => {
  updateMenu(currentIndex);
});


// 인트로 애니메이션
const tlIntro = gsap.timeline();
tlIntro
  .from('.slide01_meta', { opacity: 0, y: 10, duration: 0.6, ease: 'power2.out' })
  .from('.slide01_headline', { opacity: 0, y: 30, duration: 0.9, ease: 'power2.out' }, '-=0.2')
  .from('.slide01_bg_txt', { opacity: 0, x: 20, duration: 0.8, ease: 'power2.out' }, '-=0.5')
  .from('.slide01_sub', { opacity: 0, y: 10, duration: 0.6, ease: 'power2.out' }, '-=0.3')


// 프로젝트 패널
const $panel = $('.project_news');
const $rail = $('.project_rail');
let railIndex = 0;

function openPanel(projectIndex) {
  railIndex = projectIndex;
  gsap.set($rail[0], { x: -(railIndex * 100) + '%' });
  gsap.set($panel[0], { y: '100%', display: 'block' });
  $panel[0].scrollTop = 0;
  $panel.addClass('is-open');
  $('.scroll_hint').addClass('is-open');
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
      $panel.removeClass('is-open');
      $('.scroll_hint').removeClass('is-open');
      document.body.style.overflow = '';
    }
  });
}

$('.project').on('click', function () {
  const index = $('.project').index(this);
  openPanel(index);
});

$('.next_btn').on('click', function () {
  railIndex = (railIndex + 1) % $('.site_detail').length;
  gsap.to($rail[0], { x: -(railIndex * 100) + '%', duration: 0.3, ease: 'power2.inOut' });
});

$('.prev_btn').on('click', function () {
  const total = $('.site_detail').length;
  railIndex = (railIndex - 1 + total) % total;
  gsap.to($rail[0], { x: -(railIndex * 100) + '%', duration: 0.3, ease: 'power2.inOut' });
});

$(document).on('click', '.panel_close', function () {
  closePanel();
});

$('.code_review_btn').on('click', function() {
  const down = $(this).closest('.site_detail').find('.project_down');
  const container = document.querySelector('.project_news');
  
  gsap.to(container, {
    scrollTop: down[0].offsetTop,
    duration: 1,
    ease: 'power2.inOut'
  });
});


// 갤러리 모달
function openModal(type) {
  const modalData = {
    banner: { category: 'Banner Works', title: '배너 <em>제작</em>' },
    design: { category: 'Design Works', title: '디자인 <em>작업</em>' }
  };
  $('#modalCategory').text(modalData[type].category);
  $('#modalTitle').html(modalData[type].title);
  $('#bannerContent').toggle(type === 'banner');
  $('#designContent').toggle(type === 'design');
  $('#galleryModal').addClass('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  $('#galleryModal').removeClass('active');
  document.body.style.overflow = '';
}

$(document).on('keydown', function (e) {
  if (e.key === 'Escape') closeModal();
});


// 메뉴 클릭 → 슬라이드 이동
const menuLinks = [1, 3, 4, 5];
$('.main_menu ul li').each(function (i) {
  $(this).on('click', function () {
    goToSlide(menuLinks[i]);
  });
});


// 아이콘 hover
$('.skill_icon').on('mouseenter', function () {
  const $skill = $(this).closest('.skill');
  const idx = $skill.find('.skill_icon').index(this);
  let rowIdx = idx;
  if ($skill.hasClass('Design_skill')) rowIdx = idx <= 2 ? 0 : 1;
  $skill.find('.skill_row').eq(rowIdx).find('.skill_name, .skill_desc').css('color', '#46A8E2');
}).on('mouseleave', function () {
  const $skill = $(this).closest('.skill');
  const idx = $skill.find('.skill_icon').index(this);
  let rowIdx = idx;
  if ($skill.hasClass('Design_skill')) rowIdx = idx <= 2 ? 0 : 1;
  $skill.find('.skill_row').eq(rowIdx).find('.skill_name, .skill_desc').css('color', '');
});

// skill_row hover
$('.skill_row').on('mouseenter', function () {
  const $skill = $(this).closest('.skill');
  const idx = $skill.find('.skill_row').index(this);
  if ($skill.hasClass('Design_skill') && idx === 0) {
    $skill.find('.skill_icon').slice(0, 3).each(function (i) {
      gsap.fromTo(this, { y: 0 }, { y: -10, duration: 0.2, yoyo: true, repeat: 3, ease: 'power1.inOut', delay: i * 0.08 });
    });
  } else {
    const iconIdx = ($skill.hasClass('Design_skill') && idx === 1) ? 3 : idx;
    gsap.fromTo($skill.find('.skill_icon').eq(iconIdx)[0], { y: 0 }, { y: -10, duration: 0.2, yoyo: true, repeat: 3, ease: 'power1.inOut' });
  }
});


// 프로필 fade in
gsap.set('.right_slide02 > *', { opacity: 0, y: 20 });
gsap.to('.right_slide02 > *', {
  opacity: 1,
  y: 0,
  duration: 0.6,
  stagger: 0.15,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.slide02',
    start: 'top center',
  }
});

gsap.set('.profile_info > div', { opacity: 0, y: 20 });
gsap.to('.profile_info > div', {
  opacity: 1,
  y: 0,
  duration: 0.6,
  stagger: 0.2,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.slide02',
    start: 'top center',
  }
});


// 프로젝트 코드 탭 전환
$(document).on('click', '.code_index li', function () {
  const $this = $(this);
  const $projectDown = $this.closest('.project_down');
  const idx = $this.index();
  
  $projectDown.find('.code_index li').removeClass('active');
  $this.addClass('active');
  $projectDown.find('.code_canvas > ul > li').removeClass('active');
  $projectDown.find('.code_canvas > ul > li').eq(idx).addClass('active');
  $projectDown.find('.tab_con').removeClass('active');
  $projectDown.find('.tab_con').eq(idx).addClass('active');
});

$(document).on('click', '.idx_prev', function() {
  const $list = $(this).siblings('.code_index');
  const $prev = $list.find('li.active').prev('li');
  if ($prev.length) {
    $prev.trigger('click');
    $list.animate({ scrollLeft: $prev[0].offsetLeft - $list[0].offsetLeft }, 300);
  }
});

$(document).on('click', '.idx_next', function() {
  const $list = $(this).siblings('.code_index');
  const $next = $list.find('li.active').next('li');
  if ($next.length) {
    $next.trigger('click');
    $list.animate({ scrollLeft: $next[0].offsetLeft - $list[0].offsetLeft }, 300);
  }
});


// 이미지 에러 처리
document.querySelectorAll('.thumb_box img').forEach(img => {
  img.addEventListener('error', function () {
    this.parentElement.style.background = '#c8d8e8';
    this.remove();
  });
});

document.querySelectorAll('.masonry_item img').forEach(img => {
  img.addEventListener('error', function () {
    this.parentElement.style.height = '180px';
    this.remove();
  });
});


// 초기 메뉴 상태 (DOM ready 후 실행)
$(function () {
  updateMenu(0);
});