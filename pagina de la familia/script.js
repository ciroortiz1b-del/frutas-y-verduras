
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.carousel').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const slides = [...track.children];
    const prev = carousel.querySelector('.carousel-control.prev');
    const next = carousel.querySelector('.carousel-control.next');
    const dots = carousel.querySelector('.carousel-indicators');
    let idx = 0;

    const render = i => {
      track.style.transform = `translateX(${-i * 100}%)`;
      slides.forEach((s, j) => s.setAttribute('aria-hidden', j !== i));
      if (dots) {
        dots.innerHTML = slides
          .map((_, j) =>
            `<button aria-label="Slide ${j + 1}" aria-pressed="${j === i}"></button>`
          )
          .join('');
        dots.querySelectorAll('button').forEach((b, j) =>
          b.addEventListener('click', () => {
            idx = j;
            render(idx);
          })
        );
      }
    };

    const advance = delta => {
      idx = (idx + delta + slides.length) % slides.length;
      render(idx);
    };

    prev?.addEventListener('click', () => advance(-1));
    next?.addEventListener('click', () => advance(1));
    carousel.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') next?.click();
      if (e.key === 'ArrowLeft') prev?.click();
    });

    carousel.tabIndex = 0;
    render(idx);
  });
});