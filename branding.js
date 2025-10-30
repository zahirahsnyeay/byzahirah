document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("branding-gallery");
  if (!gallery) {
    console.error("Branding gallery container not found");
    return;
  }

  fetch("branding.json")
    .then(res => res.json())
    .then(data => {
      if (!data.brandings || data.brandings.length === 0) {
        gallery.innerHTML = "<p class='col-span-full text-gray-500'>No branding items available.</p>";
        return;
      }

      data.brandings.forEach(item => {
        const card = document.createElement("div");
        card.className = "bg-white shadow-md rounded-lg overflow-hidden cursor-pointer transform transition hover:scale-105";
        card.innerHTML = `
          <img src="${item.image}" alt="${item.title}" class="w-full aspect-[2/3] object-cover">
          <div class="p-2 text-center font-semibold">${item.title}</div>
        `;
        card.addEventListener("click", () => {
          window.location.href = `branding_detail.html?id=${item.id}`;
        });
        gallery.appendChild(card);
      });
    })
    .catch(err => {
      console.error(" Error loading branding.json:", err);
      gallery.innerHTML = "<p class='col-span-full text-red-500'>Failed to load branding data.</p>";
    });
});
