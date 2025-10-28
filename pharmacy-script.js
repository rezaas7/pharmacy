// pharmacy-script.js
document.addEventListener('DOMContentLoaded', () => {
  const products = [
    { name: "صابون زیر وباکتر ضد جوش TCC", pharmacyPrice: 1148000, consumerPrice: 1320000 },
    { name: "صابون زیرو باکتر گیاهی ضد جوش تی تری / لیمو", pharmacyPrice: 1106000, consumerPrice: 1272000 },
    { name: "صابون ضد قارچ گوگرد ۹.۵ درصد", pharmacyPrice: 918000, consumerPrice: 1056000 },
    { name: "صابون لایه بردار سالیسیلیک اسید / جلبک دریایی", pharmacyPrice: 1127000, consumerPrice: 1296000 },
    { name: "صابون هیبریدی ضد قارچ / ضد جوش / لایه بردار", pharmacyPrice: 1325000, consumerPrice: 1524000 },
    { name: "فوم تخصصی پوستهای چرب و جوشدار / درمان جوش", pharmacyPrice: 2760000, consumerPrice: 1380000 },
    { name: "فوم گریپ فروت و ویتامین C فاقد سولفات / ملایم نرمال تا چرب", pharmacyPrice: 2400000, consumerPrice: 2770000 },
    { name: "فوم تی تری لیمو زیر وباکتر فاقد سولفات / آنتی شاین", pharmacyPrice: 2460000, consumerPrice: 2830000 },
    { name: "فوم زردچوبه کوجیک اسید / روشن کننده پوست های چرب", pharmacyPrice: 2565000, consumerPrice: 2950000 },
    { name: "میسلارواتر گریپ فروت و ویتامین C", pharmacyPrice: 2610000, consumerPrice: 3000000 },
    { name: "BB کرم مناسب پوست های چرب و جوشدار / بژ روشن / اکتی آکنه", pharmacyPrice: 4210000, consumerPrice: 4850000 },
    { name: "BB کرم مناسب پوست های چرب و جوشدار / بژ طبیعی / اکتی آکنه", pharmacyPrice: 4210000, consumerPrice: 4850000 },
    { name: "ژل کرم آبرسان مناسب پوستهای چرب / هیدر آکنه", pharmacyPrice: 2870000, consumerPrice: 3300000 },
    { name: "ژل ضد جوش اورژانسی / Acne sos", pharmacyPrice: 2600000, consumerPrice: 3000000 },
    { name: "اسپری ضد جوش بدن / Acne Spray", pharmacyPrice: 3390000, consumerPrice: 3900000 },
    { name: "کرم ضد جوش آکنه اتک / Acne Attack", pharmacyPrice: 3300000, consumerPrice: 3800000 },
    { name: "ژل اسکراب نوآکنه / Acne Scrub", pharmacyPrice: 3260000, consumerPrice: 3750000 },
    { name: "فوم براش دار تی تری / لیمو زیرو باکتر فاقد سولفات / آنتی شاین", pharmacyPrice: 3110000, consumerPrice: 3580000 },
    { name: "فوم براش دار گریپ فروت و ویتامین C فاقد سولفات / ملایم نرمال تا چرب", pharmacyPrice: 3060000, consumerPrice: 3520000 },
    { name: "فوم براش دار زردچوبه کوجیک اسید / روشن کننده پوستهای چرب", pharmacyPrice: 3210000, consumerPrice: 3700000 },
    { name: "سرم نیاسینامید ۱۰ / Niaciserum", pharmacyPrice: 5650000, consumerPrice: 6500000 },
    { name: "سرم سالسیلیک اسید / Salitwo", pharmacyPrice: 5040000, consumerPrice: 5800000 },
    { name: "نوکس پاور آیس هات ژل", pharmacyPrice: 1720000, consumerPrice: 1980000 },
    { name: "نوکس فریزر ژل آیس", pharmacyPrice: 1600000, consumerPrice: 1850000 },
    { name: "نکسو کرم ضد کبودی، ضد التهاب، ضد درد", pharmacyPrice: 3040000, consumerPrice: 3500000 },
    { name: "کرم موبر بدن پوست نرمال", pharmacyPrice: 2300000, consumerPrice: 2650000 },
    { name: "کرم موبر بدن پوست خشک و حساس", pharmacyPrice: 2350000, consumerPrice: 2700000 },
    { name: "کرم موبر صورت", pharmacyPrice: 1740000, consumerPrice: 2000000 }
  ];

  const quantities = new Array(products.length).fill(0);
  const productBody = document.getElementById('productBody');
  const grandTotalEl = document.getElementById('grandTotal');
  const searchBox = document.getElementById('searchBox');
  const pharmacyInput = document.getElementById('pharmacyName');
  const pharmacyPrintArea = document.getElementById('pharmacyPrintArea');
  const searchBtn = document.getElementById('searchBtn');
  const resetBtn = document.getElementById('resetBtn');
  const printBtn = document.getElementById('printBtn');
  const fixedSaveBtn = document.getElementById('fixedSaveBtn');
  const tableWrap = document.querySelector('.table-wrap');

  function formatNumber(n){
    return n.toLocaleString('fa-IR');
  }

  function escapeHtml(str){
    return String(str).replace(/[&<>"'`=\/]/g, function(s){
      return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','/':'&#x2F;','`':'&#x60;','=':'&#x3D;'})[s];
    });
  }

  function createRowElement(product, index){
    const tr = document.createElement('tr');
    tr.dataset.index = index;

    // name
    const nameTd = document.createElement('td');
    nameTd.innerHTML = `<span class="label">شرح محصول</span><span class="value">${escapeHtml(product.name)}</span>`;

    // pharmacy price
    const pharmTd = document.createElement('td');
    pharmTd.innerHTML = `<span class="label">قیمت داروخانه</span><span class="value">${formatNumber(product.pharmacyPrice)}</span>`;

    // consumer price
    const consTd = document.createElement('td');
    consTd.innerHTML = `<span class="label">قیمت مصرف‌کننده</span><span class="value">${formatNumber(product.consumerPrice)}</span>`;

    // qty: interactive controls + print-only span
    const qtyTd = document.createElement('td');
    const qtyLabel = document.createElement('span'); qtyLabel.className = 'label'; qtyLabel.textContent = 'تعداد';
    const qtyWrap = document.createElement('span'); qtyWrap.className = 'qty-wrap'; qtyWrap.style.display='inline-flex';
    qtyWrap.style.gap='8px'; qtyWrap.style.alignItems='center';

    const plusBtn = document.createElement('button'); plusBtn.className='qty btn-inline'; plusBtn.type='button'; plusBtn.textContent='+';
    const input = document.createElement('input'); input.className='qty-input'; input.type='number'; input.min='0'; input.id = `qty-${index}`; input.value = quantities[index]; input.style.width='66px';
    const minusBtn = document.createElement('button'); minusBtn.className='qty btn-inline'; minusBtn.type='button'; minusBtn.textContent='−';

    const qtyPrintSpan = document.createElement('span'); qtyPrintSpan.className='qty-print-value value'; qtyPrintSpan.style.display = 'none'; qtyPrintSpan.textContent = quantities[index];
    const qtyValue = document.createElement('span'); qtyValue.className = 'value qty-live-value'; qtyValue.style.marginLeft='8px'; qtyValue.textContent = quantities[index];

    qtyWrap.appendChild(plusBtn);
    qtyWrap.appendChild(input);
    qtyWrap.appendChild(minusBtn);

    qtyTd.appendChild(qtyLabel);
    qtyTd.appendChild(qtyWrap);
    qtyTd.appendChild(qtyPrintSpan);
    qtyTd.appendChild(qtyValue);

    // total
    const totalTd = document.createElement('td'); totalTd.id = `total-${index}`;
    const totalVal = (quantities[index]||0) * product.pharmacyPrice;
    totalTd.innerHTML = `<span class="label">جمع کل</span><span class="value">${formatNumber(totalVal)}</span>`;

    // events
    plusBtn.addEventListener('click', () => {
      quantities[index] = (quantities[index]||0) + 1;
      input.value = quantities[index];
      qtyValue.textContent = quantities[index];
      qtyPrintSpan.textContent = quantities[index];
      setRowTotal(index);
      setGrandTotal();
      updateRowZeroClass(index);
    });

    minusBtn.addEventListener('click', () => {
      quantities[index] = Math.max(0, (quantities[index]||0) - 1);
      input.value = quantities[index];
      qtyValue.textContent = quantities[index];
      qtyPrintSpan.textContent = quantities[index];
      setRowTotal(index);
      setGrandTotal();
      updateRowZeroClass(index);
    });

    input.addEventListener('input', () => {
      let v = parseInt(input.value, 10);
      if (Number.isNaN(v) || v < 0) v = 0;
      quantities[index] = v;
      input.value = quantities[index];
      qtyValue.textContent = quantities[index];
      qtyPrintSpan.textContent = quantities[index];
      setRowTotal(index);
      setGrandTotal();
      updateRowZeroClass(index);
    });

    tr.appendChild(nameTd);
    tr.appendChild(pharmTd);
    tr.appendChild(consTd);
    tr.appendChild(qtyTd);
    tr.appendChild(totalTd);

    if (!quantities[index]) tr.classList.add('zero');
    return tr;
  }

  function setRowTotal(index){
    const el = document.getElementById(`total-${index}`);
    if (!el) return;
    const total = (quantities[index]||0) * products[index].pharmacyPrice;
    const val = el.querySelector('.value');
    if (val) val.textContent = formatNumber(total);
  }

  function updateRowZeroClass(index){
    const row = productBody.querySelector(`tr[data-index="${index}"]`);
    if (!row) return;
    if (!quantities[index] || quantities[index] === 0) row.classList.add('zero'); else row.classList.remove('zero');
  }

  function setGrandTotal(){
    let sum = 0;
    for (let i = 0; i < products.length; i++) sum += (quantities[i]||0) * products[i].pharmacyPrice;
    grandTotalEl.textContent = formatNumber(sum);
  }

  function renderTable(filter){
    productBody.innerHTML = '';
    const q = (filter || '').trim().toLowerCase();
    for (let i = 0; i < products.length; i++){
      const nameLower = products[i].name.toLowerCase();
      if (!q || nameLower.indexOf(q) !== -1) {
        productBody.appendChild(createRowElement(products[i], i));
      }
    }
    for (let i = 0; i < products.length; i++) setRowTotal(i);
    setGrandTotal();
  }

  function updatePharmacyPrint(){
    const v = pharmacyInput && pharmacyInput.value ? pharmacyInput.value.trim() : '';
    pharmacyPrintArea.textContent = v ? `نام داروخانه: ${v}` : '';
  }

  function refreshZeroClasses(){
    for (let i = 0; i < products.length; i++) updateRowZeroClass(i);
  }

  // --- Print-mode toggle functions ---
  function switchToPrintMode(){
    document.body.classList.add('printing-mode');
    // hide qty controls and show print-only qty spans
    document.querySelectorAll('.qty-wrap').forEach(w => {
      const row = w.closest('tr');
      const printSpan = row.querySelector('.qty-print-value');
      if (printSpan) printSpan.style.display = 'inline';
      // hide buttons and inputs
      w.querySelectorAll('.qty, .qty-input').forEach(el => el.style.display = 'none');
      // hide live value
      const live = row.querySelector('.qty-live-value');
      if (live) live.style.display = 'none';
    });
  }

  function restoreInteractiveMode(){
    document.body.classList.remove('printing-mode');
    document.querySelectorAll('.qty-wrap').forEach(w => {
      const row = w.closest('tr');
      const printSpan = row.querySelector('.qty-print-value');
      if (printSpan) printSpan.style.display = 'none';
      // restore buttons and inputs
      w.querySelectorAll('.qty').forEach(el => el.style.display = '');
      w.querySelectorAll('.qty-input').forEach(el => el.style.display = '');
      const live = row.querySelector('.qty-live-value');
      if (live) live.style.display = '';
    });
  }

  // hide/show consumer-price column by index (0-based: 0=name,1=pharm,2=consumer,3=qty,4=total)
  function hideConsumerColumn(){
    if (!tableWrap) return;
    const table = tableWrap.querySelector('table');
    if (!table) return;
    // hide header th
    table.querySelectorAll('thead th:nth-child(3)').forEach(th => th.style.display = 'none');
    // hide each tbody td (3rd column)
    table.querySelectorAll('tbody tr').forEach(tr => {
      const td = tr.querySelector('td:nth-child(3)');
      if (td) td.style.display = 'none';
    });
    // adjust footer colspan if present (we expect footer first td spans columns)
    table.querySelectorAll('tfoot tr').forEach(tr => {
      const first = tr.querySelector('td');
      if (first && first.colSpan) {
        first.colSpan = Math.max(1, first.colSpan - 1);
      }
    });
  }

  function showConsumerColumn(){
    if (!tableWrap) return;
    const table = tableWrap.querySelector('table');
    if (!table) return;
    table.querySelectorAll('thead th:nth-child(3)').forEach(th => th.style.display = '');
    table.querySelectorAll('tbody tr').forEach(tr => {
      const td = tr.querySelector('td:nth-child(3)');
      if (td) td.style.display = '';
    });
    table.querySelectorAll('tfoot tr').forEach(tr => {
      const first = tr.querySelector('td');
      if (first && first.colSpan !== undefined) {
        // set back to 4 for the original layout (name,pharm,consumer,qty)
        first.colSpan = 4;
      }
    });
  }

  function handlePrint(){
    updatePharmacyPrint();
    refreshZeroClasses();

    // hide consumer column and switch qty to print-only
    hideConsumerColumn();
    switchToPrintMode();

    const restore = () => {
      showConsumerColumn();
      restoreInteractiveMode();
      if ('onafterprint' in window) window.onafterprint = null;
    };

    if ('onafterprint' in window) {
      window.onafterprint = restore;
      window.print();
    } else {
      window.print();
      // fallback restore shortly after (most browsers block until print dialog closes)
      setTimeout(restore, 800);
    }
  }

  // events
  if (searchBtn) searchBtn.addEventListener('click', () => renderTable(searchBox.value));
  if (resetBtn) resetBtn.addEventListener('click', () => { if (searchBox) searchBox.value=''; renderTable(); });
  if (printBtn) printBtn.addEventListener('click', handlePrint);
  if (fixedSaveBtn) fixedSaveBtn.addEventListener('click', handlePrint);
  if (pharmacyInput) { pharmacyInput.addEventListener('input', updatePharmacyPrint); updatePharmacyPrint(); }
  if (searchBox) searchBox.addEventListener('keydown', (e) => { if (e.key === 'Enter') renderTable(searchBox.value); });

  // initial render
  renderTable();
});
