(() => {
  'use strict';

  const CONTACT_API_URL = 'https://script.google.com/macros/s/AKfycbyM6Xq_fq0axcmTvMTG3Xx0Dwy9h7wSbUDqsO7EvULeGLm0SAVWO0OrkmEEtKh_QBbE/exec';
  const SUPPORT_EMAIL = 'support@govjobupdates.com';
  const form = document.getElementById('contributorProposalForm');
  const status = document.getElementById('proposalFormStatus');
  if (!form || !status) return;

  const submitButton = form.querySelector('button[type="submit"]');
  const clean = (data, key) => String(data.get(key) || '').trim();

  function setStatus(message, isError = false) {
    status.textContent = message;
    status.classList.toggle('is-error', isError);
  }

  function buildDescription(data) {
    return [
      'ARTICLE PROPOSAL',
      '',
      `Name: ${clean(data, 'name')}`,
      `Email: ${clean(data, 'email')}`,
      `Proposed Title: ${clean(data, 'title')}`,
      `Category: ${clean(data, 'category')}`,
      `Intended Reader: ${clean(data, 'audience')}`,
      '',
      'ARTICLE IDEA / PROPOSAL',
      clean(data, 'proposal'),
      '',
      'SHORT OUTLINE / KEY POINTS',
      clean(data, 'outline'),
      '',
      'AUTHOR BIO',
      clean(data, 'bio'),
      '',
      `Previous Writing Link: ${clean(data, 'writingUrl') || 'Not provided'}`,
      `Website / Professional Profile: ${clean(data, 'profileUrl') || 'Not provided'}`,
      '',
      'COMMERCIAL INTEREST / DISCLOSURE',
      clean(data, 'disclosure') || 'None declared',
      '',
      'The contributor confirmed that the proposal is original and that the contributor guidelines were read.'
    ].join('\n');
  }

  function buildPayload(data) {
    const title = clean(data, 'title');
    return {
      action: 'sendContactRequest',
      name: clean(data, 'name'),
      contact: clean(data, 'email'),
      subject: `Guest Post Proposal: ${title}`,
      description: buildDescription(data),
      page: 'Write for GovJobUpdates',
      pageUrl: window.location.href,
      userAgent: navigator.userAgent || '',
      submittedAt: new Date().toISOString()
    };
  }

  function buildFallbackMailto(payload) {
    const subject = encodeURIComponent(`GovJobUpdates Contact: ${payload.subject}`);
    const body = encodeURIComponent([
      payload.description,
      '',
      `Page: ${payload.page}`,
      `Page URL: ${payload.pageUrl}`,
      `Submitted At: ${payload.submittedAt}`
    ].join('\n'));
    return `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
  }

  async function sendProposal(payload) {
    const response = await fetch(CONTACT_API_URL, {
      method: 'POST',
      redirect: 'follow',
      cache: 'no-store',
      credentials: 'omit',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const text = await response.text();
    let result;
    try {
      result = JSON.parse(text);
    } catch (error) {
      throw new Error('Invalid backend response');
    }

    if (!result || result.ok !== true) {
      throw new Error(result?.error || result?.message || 'Submission failed');
    }

    return result;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    setStatus('');

    if (!form.reportValidity()) {
      setStatus('Please complete the required fields.', true);
      return;
    }

    const data = new FormData(form);
    const payload = buildPayload(data);
    const originalButtonHtml = submitButton ? submitButton.innerHTML : '';

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Submitting...';
    }
    setStatus('Submitting your proposal securely...');

    try {
      await sendProposal(payload);
      form.reset();
      setStatus('Proposal submitted successfully. Our editorial team will review it soon.');
    } catch (error) {
      console.error('Contributor proposal submission failed:', error);
      setStatus(`Automatic submission failed. You can email the prepared proposal to ${SUPPORT_EMAIL}.`, true);

      const fallback = document.createElement('a');
      fallback.href = buildFallbackMailto(payload);
      fallback.textContent = ' Open prepared email';
      fallback.style.fontWeight = '800';
      fallback.style.marginLeft = '4px';
      status.appendChild(fallback);
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonHtml;
      }
    }
  });
})();
