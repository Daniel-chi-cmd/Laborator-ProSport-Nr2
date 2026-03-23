const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('nav a').forEach(link => {
  if (link.getAttribute('href') === currentPage) {
    link.style.backgroundColor = '#e41e26';
    link.style.color = '#fff';
  }
});


window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 50) {
    nav.style.padding = '5px 0';
  } else {
    nav.style.padding = '10px 0';
  }
});


const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nume  = form.querySelector('input[type="text"]').value.trim();
    const email = form.querySelector('input[type="email"]').value.trim();
    const mesaj = form.querySelector('textarea').value.trim();

    if (!nume) {
      alert('Te rugăm să introduci numele complet!');
      return;
    }

    if (!email || !email.includes('@')) {
      alert('Te rugăm să introduci o adresă de email validă!');
      return;
    }

    if (!mesaj || mesaj.length < 10) {
      alert('Mesajul trebuie să aibă cel puțin 10 caractere!');
      return;
    }

    alert('Mesajul a fost trimis cu succes! Îți mulțumim, ' + nume + '!');
    form.reset();
  });
}

const elemente = document.querySelectorAll('aside, article');
elemente.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

elemente.forEach(el => observer.observe(el));

const table = document.querySelector('.clasament-table');
if (table) {
  table.querySelectorAll('th').forEach((th, colIndex) => {
    th.style.cursor = 'pointer';
    th.title = 'Click pentru sortare';

    th.addEventListener('click', () => {
      const tbody = table.querySelector('tbody');
      const rows = Array.from(tbody.querySelectorAll('tr'));
      const asc = th.dataset.asc !== 'true';

      rows.sort((a, b) => {
        const valA = a.cells[colIndex].textContent.trim();
        const valB = b.cells[colIndex].textContent.trim();
        const numA = parseFloat(valA.replace('.', '').replace(',', '.'));
        const numB = parseFloat(valB.replace('.', '').replace(',', '.'));

        if (!isNaN(numA) && !isNaN(numB)) return asc ? numA - numB : numB - numA;
        return asc ? valA.localeCompare(valB, 'ro') : valB.localeCompare(valA, 'ro');
      });

      rows.forEach(row => tbody.appendChild(row));
      table.querySelectorAll('th').forEach(h => {
        h.dataset.asc = '';
        h.textContent = h.textContent.replace(/ [▲▼]$/, '');
      });
      th.dataset.asc = asc ? 'true' : 'false';
      th.textContent += asc ? ' ▲' : ' ▼';
    });
  });
}


document.querySelectorAll('footer p').forEach(p => {
  p.innerHTML = p.innerHTML.replace(/\d{4}/, new Date().getFullYear());
});