/* Tip calculator */

/* DOM Elements */
// Buttons
const tipPercentSection = document.getElementById('tip-btns')
const subtotalValEl = document.getElementById('subtotal-val');
const tipAmtEl = document.getElementById('tip-amt');
const totalAmtEl = document.getElementById('total-amt');
const customTipSection = document.getElementById('custom-tip-section');
const customTipBtn = document.getElementById('custom-tip-btn');
const calculateBtn = document.getElementById('calculate-btn');
const pctAmtBtns = document.getElementById('pct-amt-tip-btns'); 
const subtotalSection = document.getElementById('subtotal');

// Currency formatter - will output in US currency format
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

/* Event listeners */
tipPercentSection.addEventListener('click', tipPercentButtonClicked, false);
calculateBtn.addEventListener('click', customTipCalculateClicked, false);
pctAmtBtns.addEventListener('click', pctAmtElClicked, false);

/* Functions */
function tipPercentButtonClicked(e) {
  if (e.target.classList.contains('btn')) {
    
    

    if (e.target.id === 'custom-tip-btn') {
      showCustomTipSection();
      return;
    }

    // Used in the case where custom tip section is shown and other percent buttons are clicked. When clicking the other percent buttons, custom tip section must also dissappear
    if (customTipSection.classList.contains('section-show')) {
      showCustomTipSection();
    }

    const subtotalInput = subtotalValEl.value;
    if (!validate(subtotalInput)) {return};
    
    toggleButtonStyles(e.target, '.tip-btn', 'btn-clicked');

    const subtotal = Number(subtotalInput);

    const btnPercent = e.target.textContent;
    const tipPercent = parseInt(btnPercent, 10) / 100;

    const totals = calculateTotal(tipPercent, subtotal);

    renderAmounts(totals[0], totals[1]);
  } 
}

function customTipCalculateClicked() {
  const customTipInput = customTipSection.children[1].value;
  if (!validate(customTipInput)) {return}
  
  showCustomTipSection();

  const currentBtnClicked = document.querySelectorAll('.pct-amt-btn-clicked')[0].textContent;
  const customTipAmt = Number(customTipInput);
  const subtotal = Number(subtotalValEl.value);
  let tipAmt = 0;
  let total = 0;

  // Reset the text field to allow for another entry
  customTipSection.children[1].value = '';

  if (currentBtnClicked === '%') {
    const tipPercent = parseInt(customTipAmt, 10) / 100;
    const totals = calculateTotal(tipPercent, subtotal);
    tipAmt = totals[0];
    total = totals[1];
    console.log(tipPercent)
    renderAmounts(tipAmt, total, customTipAmt);
  } else {
    tipAmt = customTipAmt;
    total = subtotal + customTipAmt;
    renderAmounts(tipAmt, total);
  }
}

function pctAmtElClicked(e) {
  toggleButtonStyles(e.target, '.pct-amt-btn', 'pct-amt-btn-clicked');

  if (e.target.id === 'pct-btn') {
    customTipSection.children[1].placeholder = 'Enter tip percent...';
  } else {
    customTipSection.children[1].placeholder = 'Enter tip amount...';
  }
}

function calculateTotal(tipPercent, subtotal) {
  const tipAmt = tipPercent * subtotal;
  const totalAmt = subtotal + tipAmt;

  return [tipAmt, totalAmt];
}

function renderAmounts(...args) {
  if (args.length === 3) {
    tipAmtEl.textContent = formatter.format(args[0]) + ` (${args[2]}%)`;
  } else {
    tipAmtEl.textContent = formatter.format(args[0]);
  }
  
  totalAmtEl.textContent = formatter.format(args[1]);
}

function showCustomTipSection() {
  if (customTipSection.classList.contains('section-show')) {
    customTipSection.classList.remove('section-show');
    customTipSection.classList.add('section-no-show');
    customTipBtn.classList.remove('btn-clicked');
  } else {
    customTipSection.classList.remove('section-no-show');
    customTipSection.classList.add('section-show');
    customTipBtn.classList.add('btn-clicked');
  }
}

function toggleButtonStyles(targetEl, className, clickClassName) {
  const buttons = document.querySelectorAll(className);
  buttons.forEach( btn => btn.classList.remove(clickClassName));
  targetEl.classList.add(clickClassName);
}

function validate(targetEl) {
  if (targetEl == '' || isNaN(targetEl)) {
    if (subtotalSection.children[1].classList.contains('validate')) {
      return false;
    }
    const validateEl = document.createElement('div');
    validateEl.className = 'validate';
    validateEl.textContent = 'Please enter a valid amount!';
    subtotalSection.insertBefore(validateEl, subtotalValEl);
    setTimeout( () => validateEl.remove(), 5000);
    return false;
  } else {
    return true;
  }
}