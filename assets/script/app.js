document.addEventListener('DOMContentLoaded', () => {
  const modalEL = document.querySelector('.modal');
  const modalBtnEL = document.querySelector('.modalBtn');

  const modal = () => modalEL.classList.remove('hidden');
  setTimeout(modal, 2000);
  modalBtnEL.onclick = () => modalEL.classList.add('hidden');
});
