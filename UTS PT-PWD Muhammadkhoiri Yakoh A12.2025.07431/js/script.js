
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const toast = document.getElementById("toast");
const planSelect = document.getElementById("member-plan");

let toastTimeout;

function showToast(message) {
    if (!toast) {
        return;
    }

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimeout);

    toastTimeout = setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("active");
        menuToggle.textContent = isOpen ? "✕" : "☰";
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            menuToggle.textContent = "☰";
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });

    menuToggle.setAttribute("aria-expanded", "false");
}

document.querySelectorAll(".choose-plan").forEach((button) => {
    button.addEventListener("click", () => {
        const plan = button.dataset.plan;
        const card = button.closest(".price-card");
        const registerSection = document.getElementById("daftar");

        if (!plan || !planSelect || !card || !registerSection) {
            showToast("Paket tidak dapat dipilih. Silakan muat ulang halaman.");
            return;
        }

        planSelect.value = plan;
        document.querySelectorAll(".price-card").forEach((priceCard) => {
            const isSelected = priceCard === card;
            priceCard.classList.toggle("selected", isSelected);
            const planButton = priceCard.querySelector(".choose-plan");
            if (planButton) {
                planButton.setAttribute("aria-pressed", String(isSelected));
            }
        });

        registerSection.scrollIntoView({
            behavior: "smooth"
        });
        showToast(`Paket ${plan} dipilih. Lengkapi formulir pendaftaran.`);
    });
});

/* ===== REGISTRATION FORM ===== */

const registerForm = document.getElementById("register-form");

if (registerForm) {
    registerForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("member-name").value.trim();
        const email = document.getElementById("member-email").value.trim();
        const phone = document.getElementById("member-phone").value.trim();
        const plan = document.getElementById("member-plan").value;

        if (!name || !email || !phone || !plan) {
            showToast("Mohon lengkapi semua data terlebih dahulu.");
            return;
        }

        const message =
            `Halo FITVISION! Saya ingin mendaftar membership.\n\n` +
            `Nama: ${name}\n` +
            `Email: ${email}\n` +
            `WhatsApp: ${phone}\n` +
            `Paket: ${plan}`;

        // Ganti dengan nomor WhatsApp admin yang sebenarnya.
        const adminNumber = "6295393908016";

        const whatsappURL =
            `https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`;

        window.open(whatsappURL, "_blank", "noopener,noreferrer");

        showToast("Formulir siap dikirim melalui WhatsApp.");
    });
}
