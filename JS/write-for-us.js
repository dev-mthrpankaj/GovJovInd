(() => {
  'use strict';

  const form = document.getElementById('contributorProposalForm');
  const status = document.getElementById('proposalFormStatus');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    status.classList.remove('is-error');

    if (!form.reportValidity()) {
      status.textContent = 'Please complete the required fields.';
      status.classList.add('is-error');
      return;
    }

    const data = new FormData(form);
    const clean = (key) => String(data.get(key) || '').trim();
    const title = clean('title');
    const subject = `Guest Post Proposal - ${title}`;
    const body = [
      'Hello GovJobUpdates Editorial Team,',
      '',
      'I would like to propose an article for GovJobUpdates.',
      '',
      `Name: ${clean('name')}`,
      `Email: ${clean('email')}`,
      `Proposed Title: ${title}`,
      `Category: ${clean('category')}`,
      `Intended Reader: ${clean('audience')}`,
      '',
      'ARTICLE IDEA / PROPOSAL',
      clean('proposal'),
      '',
      'SHORT OUTLINE / KEY POINTS',
      clean('outline'),
      '',
      'AUTHOR BIO',
      clean('bio'),
      '',
      `Previous Writing Link: ${clean('writingUrl') || 'Not provided'}`,
      `Website / Professional Profile: ${clean('profileUrl') || 'Not provided'}`,
      '',
      'COMMERCIAL INTEREST / DISCLOSURE',
      clean('disclosure') || 'None declared',
      '',
      'I confirm that this proposal is my original work and that I have read the contributor guidelines.',
      '',
      'Regards,',
      clean('name')
    ].join('\n');

    const mailto = `mailto:support@govjobupdates.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    status.textContent = 'Opening your email app with the proposal filled in...';
    window.location.href = mailto;

    window.setTimeout(() => {
      status.textContent = 'If your email app did not open, copy the proposal details and email support@govjobupdates.com.';
    }, 1800);
  });
})();
