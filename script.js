
/* =========================
   VÉRITÉ — Interactions
========================= */

// 商品データ
const products = [
  {
    name: "NO. 01 / ARCHIVE",
    category: "CLASSIC / BLACK",
    price: "¥38,500",
    tag: "BEST SELLER",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=85",
    alt: "クラシックな眼鏡"
  },
  {
    name: "NO. 02 / LINE",
    category: "MODERN / METAL",
    price: "¥42,900",
    tag: "NEW",
    image:
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=85",
    alt: "モダンな眼鏡"
  },
  {
    name: "NO. 03 / FORM",
    category: "CLASSIC / TORTOISE",
    price: "¥39,600",
    tag: "",
    image:
      "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=800&q=85",
    alt: "べっ甲風フレームの眼鏡"
  },
  {
    name: "NO. 04 / EDGE",
    category: "MODERN / SILVER",
    price: "¥44,000",
    tag: "",
    image:
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=85",
    alt: "洗練されたアイウェア"
  }
];

// 商品一覧を生成
const productGrid = document.querySelector("#product-grid");

if (productGrid) {
  productGrid.innerHTML = products.map((product) => `
    <article class="product-card reveal">
      <a href="#collection" aria-label="${product.name} の詳細を見る">
        <div class="product-image">
          <img
            src="${product.image}"
            alt="${product.alt}"
            loading="lazy">
          ${product.tag
            ? `<span class="product-tag">${product.tag}</span>`
            : ""}
        </div>
        <div class="product-info">
          <p class="product-category">${product.category}</p>
          <h3 class="product-name">${product.name}</h3>
          <p class="product-price">${product.price}</p>
        </div>
      </a>
    </article>
  `).join("");
}

// モバイルメニュー
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation");

function closeMenu() {
  if (!menuToggle || !navigation) return;

  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "メニューを開く");
  navigation.classList.remove("is-open");
}

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const isOpen =
      menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "メニューを開く" : "メニューを閉じる"
    );

    navigation.classList.toggle("is-open", !isOpen);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 600) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
}

// スクロール時のフェードイン
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -35px 0px"
    }
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("is-visible");
  });
}
