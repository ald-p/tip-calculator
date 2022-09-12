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

/* Variables */

/* Event listeners */
tipPercentSection.addEventListener('click', tipPercentButtonClicked, false);
calculateBtn.addEventListener('click', customTipCalculateClicked, false);
pctAmtBtns.addEventListener('click', pctAmtElClicked, false);

/* Functions */
function tipPercentButtonClicked(e) {
  if (e.target.classList.contains('btn')) {
    toggleButtonStyles(e.target, '.tip-btn', 'btn-clicked');

    if (e.target.id === 'custom-tip-btn') {
      showCustomTipSection();
      return;
    }

    // Used in the case where custom tip section is shown and other percent buttons are clicked. When clicking the other percent buttons, custom tip section must also dissappear
    if (customTipSection.classList.contains('section-show')) {
      showCustomTipSection();
    }

    // Find tip percent
    const btnPercent = e.target.textContent;
    const tipPercent = parseInt(btnPercent, 10) / 100;

    // Find subtotal value
    const subtotalVal = Number(subtotalValEl.value);

    // Calculate tip and total amounts
    const totals = calculateTotal(tipPercent, subtotalVal);

    // Render
    renderAmounts(totals[0], totals[1]);
  } 
}

function customTipCalculateClicked() {
  const currentBtnClicked = document.querySelectorAll('.pct-amt-btn-clicked')[0].textContent;
  const customTipAmt = Number(customTipSection.children[1].value);
  const subtotal = Number(subtotalValEl.value);
  let tipAmt = 0;
  let total = 0;

  customTipSection.children[1].value = '';

  if (currentBtnClicked === '%') {
    const tipPercent = parseInt(customTipAmt, 10) / 100;
    const totals = calculateTotal(tipPercent, subtotal);
    tipAmt = totals[0];
    total = totals[1];
  } else {
    tipAmt = customTipAmt;
    total = subtotal + customTipAmt;
  }

  renderAmounts(tipAmt, total);
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

  return [tipAmt.toFixed(2), totalAmt.toFixed(2)];
}

function renderAmounts(tipAmt, totalAmt) {
  tipAmtEl.textContent = `$${tipAmt}`;
  totalAmtEl.textContent = `$${totalAmt}`;
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
