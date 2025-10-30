document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("illustration-gallery");
  const modal = document.getElementById("illustration-modal");
  const modalImg = document.getElementById("illustration-img");
  const modalTitle = document.getElementById("illustration-title");
  const modalDesc = document.getElementById("illustration-desc");
  const closeModal = document.getElementById("illustration-close");

  if (!gallery || !modal || !modalImg || !modalTitle || !modalDesc || !closeModal) {
    console.error("Illustration modal elements missing in HTML");
    return;
  }

  // Load illustration.json
  fetch("illustration.json")
    .then(res => res.json())
    .then(data => {
      if (!data.illustrations) throw new Error("illustration.json is missing 'illustrations' array");

      data.illustrations.forEach(item => {
        const card = document.createElement("div");
        card.className = "bg-white shadow-md rounded-lg overflow-hidden cursor-pointer transform transition hover:scale-105";
        card.innerHTML = `
          <img src="${item.image}" alt="${item.title}" class="w-full h-64 object-cover">
          <div class="p-2 text-center font-semibold">${item.title}</div>
        `;
        card.addEventListener("click", () => {
          modalImg.src = item.image;
          modalTitle.textContent = item.title;
          modalDesc.textContent = item.description;
          modal.classList.remove("hidden");
          modal.classList.add("flex");
        });
        gallery.appendChild(card);
      });
    })
    .catch(err => console.error(" Failed to load illustrations:", err));

  // Close Modal
  closeModal.addEventListener("click", () => modal.classList.add("hidden"));

  // Close when clicking outside modal content
  modal.addEventListener("click", e => {
    if (e.target === modal) modal.classList.add("hidden");
  });
});
