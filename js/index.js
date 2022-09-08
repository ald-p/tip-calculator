/* Tip calculator */

/* DOM Elements */
// Buttons
const tipPercentSection = document.getElementById('tip-btns')
const subtotalValEl = document.getElementById('subtotal-val');
const tipAmtEl = document.getElementById('tip-amt');
const totalAmtEl = document.getElementById('total-amt');
const customTipSection = document.getElementById('custom-tip-section');
const customTipBtn = document.getElementById('custom-tip-btn')

/* Variables */

/* Event listeners */
tipPercentSection.addEventListener('click', tipPercentButtonClicked, false);

/* Functions */
function tipPercentButtonClicked(e) {
  if (e.target.classList.contains('btn')) {
    toggleButtonStyles(e.target);

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

function toggleButtonStyles(targetEl) {
  const buttons = document.querySelectorAll('.tip-btn');
  buttons.forEach( btn => btn.classList.remove('btn-clicked'));
  targetEl.classList.add('btn-clicked');
}
