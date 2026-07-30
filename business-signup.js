const form = document.getElementById('partnerApplication');
const saveButton = document.getElementById('saveDraft');
const downloadButton = document.getElementById('downloadApplication');
const status = document.getElementById('formStatus');
const progress = document.querySelector('.form-progress span');
const storageKey = 'escoPridePartnerDraftV2';
const applicationEmail = 'will@outatinc.com';

const formDataObject = () => {
  const output = {};
  for (const [key, value] of new FormData(form).entries()) {
    output[key] = output[key] ? [].concat(output[key], value) : value;
  }
  return output;
};

const setStatus = (message, type = '') => {
  status.textContent = message;
  status.className = `form-status ${type}`.trim();
};

const saveDraft = (showMessage = false) => {
  localStorage.setItem(storageKey, JSON.stringify(formDataObject()));
  if (showMessage) setStatus('Draft saved on this device.', 'success');
};

const restoreDraft = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || 'null');
    if (!saved) return;
    Object.entries(saved).forEach(([name, value]) => {
      const values = Array.isArray(value) ? value : [value];
      form.querySelectorAll(`[name="${name}"]`).forEach(field => {
        if (field.type === 'checkbox' || field.type === 'radio') field.checked = values.includes(field.value);
        else field.value = value;
      });
    });
    setStatus('Your saved draft has been restored.', 'success');
  } catch {
    setStatus('The saved draft could not be restored.', 'error');
  }
};

const updateCounters = () => {
  document.querySelectorAll('[data-counter-for]').forEach(counter => {
    const field = form.elements[counter.dataset.counterFor];
    counter.textContent = `${field.value.length} / ${field.maxLength}`;
  });
};

const updateProgress = () => {
  const required = [...form.querySelectorAll('[required]')];
  const groups = new Map();
  required.forEach(field => {
    const key = field.type === 'checkbox' ? field.name : `${field.name}-${field.value}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(field);
  });
  const total = groups.size + 1;
  let complete = 0;
  groups.forEach(fields => {
    if (fields[0].type === 'checkbox') {
      if (fields.every(field => field.checked)) complete += 1;
    } else if (fields[0].value.trim()) complete += 1;
  });
  if (form.querySelectorAll('[name="partnerType"]:checked').length) complete += 1;
  progress.style.width = `${Math.min(100, Math.round((complete / total) * 100))}%`;
};

const validateForm = () => {
  form.querySelectorAll('.invalid').forEach(field => field.classList.remove('invalid'));
  const invalidFields = [...form.querySelectorAll('[required]')].filter(field => !field.checkValidity());
  const partnerTypes = form.querySelectorAll('[name="partnerType"]:checked');

  invalidFields.forEach(field => field.classList.add('invalid'));
  if (!partnerTypes.length) {
    form.querySelectorAll('[name="partnerType"]').forEach(field => field.closest('.choice')?.classList.add('invalid-choice'));
  } else {
    form.querySelectorAll('.invalid-choice').forEach(choice => choice.classList.remove('invalid-choice'));
  }

  if (invalidFields.length || !partnerTypes.length) {
    const first = invalidFields[0] || form.querySelector('[name="partnerType"]');
    first?.focus({ preventScroll: true });
    first?.closest('fieldset')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setStatus('Please complete the required fields and choose at least one partner type.', 'error');
    return false;
  }
  return true;
};

const formatApplication = data => {
  const list = value => Array.isArray(value) ? value.join(', ') : (value || 'Not provided');
  return [
    'ESCO PRIDE PARTNER APPLICATION',
    '================================',
    '',
    `Business/Organization: ${data.businessName || ''}`,
    `Business Category: ${data.businessCategory || ''}`,
    `Primary Contact: ${data.contactName || ''}`,
    `Email: ${data.email || ''}`,
    `Phone: ${data.phone || 'Not provided'}`,
    `Website: ${data.website || 'Not provided'}`,
    `Address: ${data.address || 'Not provided'}`,
    `Age Restrictions: ${data.ageRestriction || 'Not provided'}`,
    '',
    `Partner Type(s): ${list(data.partnerType)}`,
    '',
    'BUSINESS & COMMUNITY SUPPORT',
    data.supportDescription || 'Not provided',
    '',
    'PROPOSED PRIDE OFFER / EVENT / BENEFIT',
    data.prideOffer || 'Not provided',
    '',
    `Pride Passport Interest: ${data.passportInterest || 'Not provided'}`,
    `Meetup Interest: ${data.meetupInterest || 'Not provided'}`,
    '',
    'ACCESSIBILITY & OTHER DETAILS',
    data.accessibility || 'Not provided',
    '',
    `Agreements accepted: ${list(data.agreement)}`,
    '',
    `Prepared: ${new Date().toLocaleString()}`
  ].join('\n');
};

const downloadApplication = () => {
  const application = formatApplication(formDataObject());
  const blob = new Blob([application], { type: 'text/plain;charset=utf-8' });
  const link = document.createElement('a');
  const safeName = (form.elements.businessName.value || 'business').trim().replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();
  link.href = URL.createObjectURL(blob);
  link.download = `esco-pride-application-${safeName || 'business'}.txt`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(link.href);
  setStatus('A copy of the application has been downloaded.', 'success');
};

saveButton.addEventListener('click', () => saveDraft(true));
downloadButton.addEventListener('click', downloadApplication);

form.addEventListener('input', event => {
  event.target.classList.remove('invalid');
  event.target.closest('.choice')?.classList.remove('invalid-choice');
  updateCounters();
  updateProgress();
  saveDraft(false);
});

form.addEventListener('change', () => {
  updateProgress();
  saveDraft(false);
});

form.addEventListener('submit', event => {
  event.preventDefault();
  if (!validateForm()) return;

  const data = formDataObject();
  const application = formatApplication(data);
  const subject = `Esco Pride Partner Application — ${data.businessName}`;
  const mailto = `mailto:${applicationEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(application)}`;

  saveDraft(false);
  setStatus('Your email app should open with the completed application. Review it, then press Send.', 'success');
  window.location.href = mailto;
});

restoreDraft();
updateCounters();
updateProgress();
