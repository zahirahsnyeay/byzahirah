const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get('id'));

fetch('books.json')
  .then(res => res.json())
  .then(data => {
    const allBooks = [...data.written, ...data.illustrated];
    const book = allBooks.find(b => b.id === id);
    const detail = document.getElementById('book-detail');
    const btsGallery = document.getElementById('bts-gallery');

    if (book) {
      // Book main content
      detail.innerHTML = `
        <h1 class="text-4xl font-bold mb-6">${book.title}</h1>
        <div class="flex justify-center mb-6">
          <img src="${book.image}" class="max-w-sm w-full rounded-xl shadow-lg" alt="${book.title}">
        </div>
        <p class="text-gray-700 text-lg leading-relaxed">${book.description}</p>
      `;

      // Behind the Scenes Section
      if (book.bts && book.bts.length > 0) {
        btsGallery.innerHTML = book.bts
          .map(img => `
            <div class="flex justify-center">
              <img src="${img}" class="rounded-lg shadow-md max-w-full sm:max-w-xs object-cover mx-auto mb-4">
            </div>
          `)
          .join('');
      } else {
        btsGallery.innerHTML = `<p class="text-gray-500 text-lg">No behind-the-scenes images available for this book.</p>`;
      }
    } else {
      detail.innerHTML = "<p class='text-center text-gray-600'>Book not found.</p>";
      btsGallery.innerHTML = "";
    }
  });
