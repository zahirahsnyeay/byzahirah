const modal = document.getElementById('book-modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const closeModal = document.getElementById('close-modal');

fetch('books.json')
  .then(res => res.json())
  .then(data => {
    const writtenGallery = document.getElementById('written-gallery');
    const illustratedGallery = document.getElementById('illustrated-gallery');

    function createBookCard(item) {
      const card = document.createElement('div');
      card.className = "fade-in group bg-white p-2 rounded-xl overflow-hidden hover:shadow-lg transition cursor-pointer";
      card.innerHTML = `
        <img loading="lazy" src="${item.image}" alt="${item.title}" class="book-img w-full">
        <div class="p-2"><h3 class="text-lg font-semibold text-center">${item.title}</h3></div>
      `;
      card.addEventListener('click', () => {
        window.location.href = 'book.html?id=' + item.id;
      });
      return card;
    }

    data.written.forEach(item => writtenGallery.appendChild(createBookCard(item)));
    data.illustrated.forEach(item => illustratedGallery.appendChild(createBookCard(item)));

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add('show'); });
    }, { threshold: 0.2 });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
  });


// Close modal
closeModal.addEventListener('click', () => {
  modal.classList.add('hidden');
  modal.classList.remove('flex');
});

modal.addEventListener('click', e => {
  if (e.target === modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
});
