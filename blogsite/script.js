let posts = JSON.parse(localStorage.getItem("posts")) || [];
const postsContainer = document.getElementById("posts-container");
const form = document.getElementById("add-post-form");
const themeToggle = document.getElementById("theme-toggle");
const searchInput = document.getElementById("search-posts");

// Gönderi ekleme
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("post-title").value.trim();
  const content = document.getElementById("post-content").value.trim();

  if (title && content) {
    const newPost = {
      id: Date.now(),
      title,
      content,
      date: new Date(),
    };

    posts.push(newPost);
    localStorage.setItem("posts", JSON.stringify(posts));
    displayPosts();
    form.reset();
  } else {
    alert("Başlık ve içerik boş olamaz!");
  }
});

// Gönderileri görüntüleme
function displayPosts(filteredPosts = posts) {
  postsContainer.innerHTML = filteredPosts
    .map(
      (post) => `
      <div class="post">
        <h3>${post.title}</h3>
        <p>${post.content}</p>
        <small>${new Date(post.date).toLocaleString()}</small>
        <button onclick="deletePost(${post.id})">Sil</button>
      </div>`
    )
    .join("");
}

// Gönderiyi silme
function deletePost(id) {
  posts = posts.filter((post) => post.id !== id);
  localStorage.setItem("posts", JSON.stringify(posts));
  displayPosts();
}

// Tema değiştir
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
  updateThemeIcon();
});

function updateThemeIcon() {
  themeToggle.innerHTML = document.body.classList.contains("dark-mode")
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
}

// Arama özelliği
searchInput.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(query) || post.content.toLowerCase().includes(query)
  );
  displayPosts(filteredPosts);
});

// Tema durumunu yükleme
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }
  updateThemeIcon();
  displayPosts();
});
