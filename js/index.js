/* Tip calculator */

/* DOM Elements */
// Buttons
const tipPercentSection = document.getElementById('tip-percent-section')
const customTipBtn = document.getElementById('custom-tip-btn');
const subtotalValEl = document.getElementById('subtotal-val');

/* Variables */

/* Event listeners */
tipPercentSection.addEventListener('click', findTotal, false);

/* Functions */
function findTotal(e) {

  // Find tip percent
  console.log(e.target.textContent);
  const btnPercent = e.target.textContent;
  const tipPercent = parseInt(btnPercent, 10) / 100;

  // Find subtotal value
  const subtotalVal = Number(subtotalValEl.value);
  console.log(typeof subtotalVal);

  const totals = calculateTotal(tipPercent, subtotalVal);
}

function calculateTotal(tipPercent, subtotal) {
  const tipAmt = tipPercent * subtotal;
  const totalAmt = subtotal + tipAmt;

  return [tipAmt.toFixed(2), totalAmt.toFixed(2)];
}

