/* Tip calculator */

/* DOM Elements */
// Buttons
const tipPercentSection = document.getElementById('tip-percent-section')
const customTipBtn = document.getElementById('custom-tip-btn');
const subtotalValEl = document.getElementById('subtotal-val');
const tipAmtEl = document.getElementById('tip-amt');
const totalAmtEl = document.getElementById('total-amt');

/* Variables */

/* Event listeners */
tipPercentSection.addEventListener('click', findTotal, false);

/* Functions */
function findTotal(e) {
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

function calculateTotal(tipPercent, subtotal) {
  const tipAmt = tipPercent * subtotal;
  const totalAmt = subtotal + tipAmt;

  return [tipAmt.toFixed(2), totalAmt.toFixed(2)];
}

function renderAmounts(tipAmt, totalAmt) {
  tipAmtEl.textContent = `$${tipAmt}`;
  totalAmtEl.textContent = `$${totalAmt}`;
}

