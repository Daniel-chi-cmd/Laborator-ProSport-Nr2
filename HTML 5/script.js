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


document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactFormAjax');
    const responseDiv = document.getElementById('statusMesaj');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            e.stopPropagation();

            const btn = contactForm.querySelector('.btn-trimite');
            btn.disabled = true;
            btn.textContent = 'Se trimite...';

            const formData = new FormData(contactForm);

            fetch('cgi-bin/procesare.py', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    return response.text();
                }
                throw new Error('Eroare la server (status ' + response.status + ')');
            })
            .then(data => {
                responseDiv.style.display = 'block';
                responseDiv.style.color = 'green';
                responseDiv.style.background = '#f0fff0';
                responseDiv.style.border = '1px solid #c3e6cb';
                responseDiv.innerHTML = '✔ Mesajul a fost trimis cu succes!';
                contactForm.reset();
                btn.disabled = false;
                btn.textContent = 'Trimite Mesaj';
            })
            .catch(error => {
                responseDiv.style.display = 'block';
                responseDiv.style.color = 'red';
                responseDiv.style.background = '#fff0f0';
                responseDiv.style.border = '1px solid #f5c6cb';
                responseDiv.innerHTML = '✖ Eroare: ' + error.message;
                btn.disabled = false;
                btn.textContent = 'Trimite Mesaj';
            });
        });
    }
});


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
