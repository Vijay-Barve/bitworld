(function () {
  'use strict';

  var nav = document.querySelector('.nav');
  var navToggle = document.querySelector('.nav-toggle');
  var form = document.getElementById('contact-form');

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', nav.classList.contains('is-open'));
    });

    document.querySelectorAll('.nav a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.querySelector('#name').value.trim();
      var email = form.querySelector('#email').value.trim();
      var message = form.querySelector('#message').value.trim();
      if (name && email && message) {
        alert('Thank you! We will get back to you soon.');
        form.reset();
      }
    });
  }

  /* Ebook modal: collect name, email, phone then show download */
  var ebookBtn = document.getElementById('hero-ebook-btn');
  var ebookModal = document.getElementById('ebook-modal');
  var ebookBackdrop = document.getElementById('ebook-modal-backdrop');
  var ebookClose = document.getElementById('ebook-modal-close');
  var ebookForm = document.getElementById('ebook-form');
  var ebookSuccess = document.getElementById('ebook-success');

  function openEbookModal() {
    if (ebookModal) {
      ebookModal.classList.add('is-open');
      ebookModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (ebookForm) {
        ebookForm.hidden = false;
        ebookForm.reset();
      }
      if (ebookSuccess) ebookSuccess.hidden = true;
    }
  }

  function closeEbookModal() {
    if (ebookModal) {
      ebookModal.classList.remove('is-open');
      ebookModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (ebookBtn) {
    ebookBtn.addEventListener('click', openEbookModal);
  }
  if (ebookBackdrop) {
    ebookBackdrop.addEventListener('click', closeEbookModal);
  }
  if (ebookClose) {
    ebookClose.addEventListener('click', closeEbookModal);
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && ebookModal && ebookModal.classList.contains('is-open')) {
      closeEbookModal();
    }
  });

  if (ebookForm) {
    ebookForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = ebookForm.querySelector('#ebook-name').value.trim();
      var email = ebookForm.querySelector('#ebook-email').value.trim();
      var phone = ebookForm.querySelector('#ebook-phone').value.trim();
      if (!name || !email || !phone) return;

      var submitBtn = document.getElementById('ebook-submit-btn');
      var formAction = ebookForm.getAttribute('action') || '';

      if (formAction.indexOf('YOUR_FORM_ID') !== -1) {
        ebookForm.hidden = true;
        if (ebookSuccess) ebookSuccess.hidden = false;
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending…';
      }

      fetch(formAction, {
        method: 'POST',
        body: new FormData(ebookForm),
        headers: { 'Accept': 'application/json' }
      })
        .then(function (response) {
          if (response.ok) {
            ebookForm.hidden = true;
            if (ebookSuccess) ebookSuccess.hidden = false;
          } else {
            throw new Error('Send failed');
          }
        })
        .catch(function () {
          ebookForm.hidden = true;
          if (ebookSuccess) ebookSuccess.hidden = false;
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Get download link';
          }
        });
    });
  }
})();
