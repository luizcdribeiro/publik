function outsideClick(element, events, callback) {
  const html = document.documentElement;
  const outside = 'data-outside';
  function handleOutsideClick(event) {
    if (!element.contains(event.target)) {
      element.removeAttribute(outside);
      events.forEach((userEvent) => {
        html.removeEventListener(userEvent, handleOutsideClick);
      });
      callback();
    }
  }

  if (!element.hasAttribute(outside)) {
    events.forEach((userEvent) => {
      setTimeout(() => {
        html.addEventListener(userEvent, handleOutsideClick);
      });
    });
    element.setAttribute(outside, '');
  }
}

function menuMobile() {
  const menuButton =  document.querySelector('[data-menu="button"]');
  const menuList = document.querySelector('[data-menu="lista"]');
  const eventos = ['click', 'touchstart'];

  function openMenu(event) {
    event.preventDefault();
    menuList.classList.add('active');
    menuButton.classList.add('active');
    outsideClick(menuList, eventos, () => {
      menuList.classList.remove('active');
      menuButton.classList.remove('active');
    })

  }
  if(menuButton && menuList) {
    eventos.forEach(evento => menuButton.addEventListener(evento, openMenu))
  }
}

menuMobile();


