(() => {
  const STORAGE_KEY = 'ft_state_v1_encrypted';
  const THEME_KEY = 'ft_theme';
  const SALT_KEY = 'ft_salt';
  
  let userPassword = null;
  let isUnlocked = false;

  const defaultCategories = [
    { id: 'cat_gaji', name: 'Gaji', color: '#10b981', budget: 0 },
    { id: 'cat_makanan', name: 'Makanan', color: '#ef4444', budget: 5000000 },
    { id: 'cat_transportasi', name: 'Transportasi', color: '#f59e0b', budget: 1500000 },
    { id: 'cat_fashion', name: 'Fashion', color: '#ec4899', budget: 1000000 },
    { id: 'cat_investasi', name: 'Investasi', color: '#8b5cf6', budget: 0 },
    { id: 'cat_hiburan', name: 'Hiburan', color: '#06b6d4', budget: 1000000 },
    { id: 'cat_belanja', name: 'Belanja', color: '#f97316', budget: 2000000 },
    { id: 'cat_sosial', name: 'Sosial', color: '#14b8a6', budget: 500000 },
    { id: 'cat_tagihan', name: 'Tagihan', color: '#6366f1', budget: 1500000 },
    { id: 'cat_top_up', name: 'Top Up', color: '#a855f7', budget: 500000 },
    { id: 'cat_keluarga', name: 'Keluarga', color: '#f43f5e', budget: 3500000 },
    { id: 'cat_lainnya', name: 'Lainnya', color: '#64748b', budget: 500000 },
  ];

  const defaultTransactions = [
    // Income
    { id: id(), type: 'income', amount: 211747, date: '2025-09-01', categoryId: 'cat_gaji', note: 'Saldo Awal' },
    { id: id(), type: 'income', amount: 2719600, date: '2025-09-01', categoryId: 'cat_gaji', note: 'Gaji' },
    { id: id(), type: 'income', amount: 7620000, date: '2025-09-01', categoryId: 'cat_gaji', note: 'Tukin' },
    { id: id(), type: 'income', amount: 2940000, date: '2025-09-02', categoryId: 'cat_gaji', note: 'Rapel Grading' },
    { id: id(), type: 'income', amount: 116000, date: '2025-09-02', categoryId: 'cat_gaji', note: 'Rapel Grading' },
    { id: id(), type: 'income', amount: 116000, date: '2025-09-02', categoryId: 'cat_gaji', note: 'Rapel Grading' },
    { id: id(), type: 'income', amount: 1651220, date: '2025-09-04', categoryId: 'cat_gaji', note: 'SPD DL' },
    { id: id(), type: 'income', amount: 222500, date: '2025-09-06', categoryId: 'cat_gaji', note: 'Hutang DL Mas Dani' },
    { id: id(), type: 'income', amount: 490000, date: '2025-09-10', categoryId: 'cat_gaji', note: 'Uang Makan' },
    { id: id(), type: 'income', amount: 1729000, date: '2025-09-15', categoryId: 'cat_gaji', note: 'Lembur' },
    { id: id(), type: 'income', amount: 393250, date: '2025-09-15', categoryId: 'cat_gaji', note: 'Hutang mas yacob m topan' },
    
    // Expenses
    { id: id(), type: 'expense', amount: 200000, date: '2025-09-01', categoryId: 'cat_sosial', note: 'Iuran Koperasi dan Dansos' },
    { id: id(), type: 'expense', amount: 300000, date: '2025-09-01', categoryId: 'cat_keluarga', note: 'Listrik wifi' },
    { id: id(), type: 'expense', amount: 103400, date: '2025-09-01', categoryId: 'cat_makanan', note: 'Waroeng SS with Karin' },
    { id: id(), type: 'expense', amount: 74000, date: '2025-09-01', categoryId: 'cat_makanan', note: 'Kopi café with Karin' },
    { id: id(), type: 'expense', amount: 30000, date: '2025-09-01', categoryId: 'cat_makanan', note: 'Nasgor PJMI' },
    { id: id(), type: 'expense', amount: 30000, date: '2025-09-01', categoryId: 'cat_makanan', note: 'Solaria Bekasi with Adi' },
    { id: id(), type: 'expense', amount: 13000, date: '2025-09-01', categoryId: 'cat_makanan', note: 'Mako Roti' },
    { id: id(), type: 'expense', amount: 291500, date: '2025-09-02', categoryId: 'cat_fashion', note: 'Hush Puppies' },
    { id: id(), type: 'expense', amount: 80000, date: '2025-09-02', categoryId: 'cat_top_up', note: 'OVO' },
    { id: id(), type: 'expense', amount: 3000000, date: '2025-09-02', categoryId: 'cat_keluarga', note: 'Bulanan' },
    { id: id(), type: 'expense', amount: 1060000, date: '2025-09-03', categoryId: 'cat_investasi', note: 'Allianz' },
    { id: id(), type: 'expense', amount: 2500, date: '2025-09-03', categoryId: 'cat_lainnya', note: 'Ke Mandiri' },
    { id: id(), type: 'expense', amount: 199000, date: '2025-09-04', categoryId: 'cat_belanja', note: 'Listrik Pipin Buntok' },
    { id: id(), type: 'expense', amount: 80000, date: '2025-09-04', categoryId: 'cat_top_up', note: 'OVO' },
    { id: id(), type: 'expense', amount: 78000, date: '2025-09-04', categoryId: 'cat_makanan', note: 'Yakiniku Like' },
    { id: id(), type: 'expense', amount: 43000, date: '2025-09-04', categoryId: 'cat_makanan', note: 'Gong Cha with Tyas' },
    { id: id(), type: 'expense', amount: 77000, date: '2025-09-04', categoryId: 'cat_fashion', note: 'Lipstik Luxcrime' },
    { id: id(), type: 'expense', amount: 186000, date: '2025-09-04', categoryId: 'cat_hiburan', note: 'Netflix 4 bulan' },
    { id: id(), type: 'expense', amount: 76000, date: '2025-09-04', categoryId: 'cat_makanan', note: 'Jajan di CP' },
    { id: id(), type: 'expense', amount: 98000, date: '2025-09-05', categoryId: 'cat_hiburan', note: 'Nonton bioskop Conjuring' },
    { id: id(), type: 'expense', amount: 55000, date: '2025-09-05', categoryId: 'cat_makanan', note: 'Jajan XXI' },
    { id: id(), type: 'expense', amount: 359000, date: '2025-09-05', categoryId: 'cat_fashion', note: 'Tas Ransel' },
    { id: id(), type: 'expense', amount: 87000, date: '2025-09-06', categoryId: 'cat_makanan', note: 'IKEA with karin' },
    { id: id(), type: 'expense', amount: 116000, date: '2025-09-06', categoryId: 'cat_fashion', note: 'Handuk IKEA dan jajan' },
    { id: id(), type: 'expense', amount: 49000, date: '2025-09-06', categoryId: 'cat_makanan', note: 'Shihlin with karin' },
    { id: id(), type: 'expense', amount: 81500, date: '2025-09-06', categoryId: 'cat_makanan', note: 'Hero Supermarket' },
    { id: id(), type: 'expense', amount: 214700, date: '2025-09-06', categoryId: 'cat_fashion', note: 'Oh Some tas karin n hair oil' },
    { id: id(), type: 'expense', amount: 1300000, date: '2025-09-06', categoryId: 'cat_transportasi', note: 'Bayar Kos' },
    { id: id(), type: 'expense', amount: 80000, date: '2025-09-07', categoryId: 'cat_hiburan', note: 'Beli Kuota' },
    { id: id(), type: 'expense', amount: 30000, date: '2025-09-07', categoryId: 'cat_hiburan', note: 'Langganan Yutub' },
    { id: id(), type: 'expense', amount: 128000, date: '2025-09-07', categoryId: 'cat_hiburan', note: 'Nonton bioskop Demon wit' },
    { id: id(), type: 'expense', amount: 29900, date: '2025-09-09', categoryId: 'cat_hiburan', note: 'Langganan Spotify' },
    { id: id(), type: 'expense', amount: 44799, date: '2025-09-07', categoryId: 'cat_makanan', note: 'Foodhall Senayan jajan' },
    { id: id(), type: 'expense', amount: 70000, date: '2025-09-07', categoryId: 'cat_makanan', note: 'Sate Taichan with Karin' },
    { id: id(), type: 'expense', amount: 17000, date: '2025-09-08', categoryId: 'cat_makanan', note: 'Kantin Maksi' },
    { id: id(), type: 'expense', amount: 22000, date: '2025-09-08', categoryId: 'cat_makanan', note: 'Kopi Reman' },
    { id: id(), type: 'expense', amount: 60000, date: '2025-09-08', categoryId: 'cat_sosial', note: 'Roti bu Eva' },
    { id: id(), type: 'expense', amount: 66000, date: '2025-09-09', categoryId: 'cat_makanan', note: 'Chatime with Tyas' },
    { id: id(), type: 'expense', amount: 88000, date: '2025-09-09', categoryId: 'cat_makanan', note: 'AW' },
    { id: id(), type: 'expense', amount: 4077860, date: '2025-09-10', categoryId: 'cat_tagihan', note: 'CC' },
    { id: id(), type: 'expense', amount: 166499, date: '2025-09-10', categoryId: 'cat_makanan', note: 'Belanja Sayurbox' },
    { id: id(), type: 'expense', amount: 12000, date: '2025-09-11', categoryId: 'cat_makanan', note: 'Cimol bojot AA' },
    { id: id(), type: 'expense', amount: 100000, date: '2025-09-12', categoryId: 'cat_top_up', note: 'OVO' },
    { id: id(), type: 'expense', amount: 23000, date: '2025-09-12', categoryId: 'cat_makanan', note: 'Cimol bojot AA' },
    { id: id(), type: 'expense', amount: 100000, date: '2025-09-13', categoryId: 'cat_top_up', note: 'OVO (taxi bandara karin)' },
    { id: id(), type: 'expense', amount: 600000, date: '2025-09-13', categoryId: 'cat_fashion', note: 'Softlens' },
    { id: id(), type: 'expense', amount: 50000, date: '2025-09-13', categoryId: 'cat_fashion', note: 'Lipstik Wardah' },
    { id: id(), type: 'expense', amount: 51770, date: '2025-09-13', categoryId: 'cat_makanan', note: 'Kempedang dan Tomat' },
    { id: id(), type: 'expense', amount: 37000, date: '2025-09-13', categoryId: 'cat_makanan', note: 'Ga Ga Grand Indonesia' },
    { id: id(), type: 'expense', amount: 1500000, date: '2025-09-15', categoryId: 'cat_tagihan', note: 'BLU' },
    { id: id(), type: 'expense', amount: 9000, date: '2025-09-16', categoryId: 'cat_lainnya', note: 'Fee ATM' },
    { id: id(), type: 'expense', amount: 27000, date: '2025-09-17', categoryId: 'cat_fashion', note: 'kaos kaki' },
    { id: id(), type: 'expense', amount: 23000, date: '2025-09-17', categoryId: 'cat_makanan', note: 'Matcha' },
    { id: id(), type: 'expense', amount: 80700, date: '2025-09-17', categoryId: 'cat_makanan', note: 'Rokok Ana' },
    { id: id(), type: 'expense', amount: 12000, date: '2025-09-18', categoryId: 'cat_makanan', note: 'Jus' },
    { id: id(), type: 'expense', amount: 22000, date: '2025-09-18', categoryId: 'cat_makanan', note: 'Steak' },
    { id: id(), type: 'expense', amount: 86400, date: '2025-09-18', categoryId: 'cat_hiburan', note: 'Nemenin Ana' },
    { id: id(), type: 'expense', amount: 20000, date: '2025-09-18', categoryId: 'cat_makanan', note: 'Angkringan' },
    { id: id(), type: 'expense', amount: 33000, date: '2025-09-19', categoryId: 'cat_makanan', note: 'Nasduk Ana' },
    { id: id(), type: 'expense', amount: 22000, date: '2025-09-19', categoryId: 'cat_makanan', note: 'Rokok' },
    { id: id(), type: 'expense', amount: 16600, date: '2025-09-19', categoryId: 'cat_makanan', note: 'Makan di Kereta' },
    { id: id(), type: 'expense', amount: 23000, date: '2025-09-19', categoryId: 'cat_makanan', note: 'Matcha' },
    { id: id(), type: 'expense', amount: 300000, date: '2025-09-20', categoryId: 'cat_keluarga', note: 'Bensin' },
    { id: id(), type: 'expense', amount: 175000, date: '2025-09-20', categoryId: 'cat_keluarga', note: 'Dromma Café' },
    { id: id(), type: 'expense', amount: 96000, date: '2025-09-20', categoryId: 'cat_keluarga', note: 'Soto' },
    { id: id(), type: 'expense', amount: 85500, date: '2025-09-20', categoryId: 'cat_keluarga', note: 'Toko Roti Tegal' },
    { id: id(), type: 'expense', amount: 294200, date: '2025-09-20', categoryId: 'cat_keluarga', note: 'Aeon+supermarket' },
    { id: id(), type: 'expense', amount: 283500, date: '2025-09-20', categoryId: 'cat_keluarga', note: 'Kado Papah' },
    { id: id(), type: 'expense', amount: 184000, date: '2025-09-20', categoryId: 'cat_keluarga', note: 'Sate Sapi Senuh' },
    { id: id(), type: 'expense', amount: 101000, date: '2025-09-21', categoryId: 'cat_hiburan', note: 'Kuota 70 GB' },
    { id: id(), type: 'expense', amount: 21000, date: '2025-09-22', categoryId: 'cat_top_up', note: 'Gopay' },
    { id: id(), type: 'expense', amount: 17000, date: '2025-09-22', categoryId: 'cat_makanan', note: 'Maksi Kantin' },
    { id: id(), type: 'expense', amount: 15000, date: '2025-09-22', categoryId: 'cat_makanan', note: 'Kopi Reman' },
    { id: id(), type: 'expense', amount: 28500, date: '2025-09-22', categoryId: 'cat_makanan', note: 'Makan di Kereta' },
    { id: id(), type: 'expense', amount: 100000, date: '2025-09-16', categoryId: 'cat_sosial', note: 'Kebersihan bu Eva' },
    { id: id(), type: 'expense', amount: 15000, date: '2025-09-23', categoryId: 'cat_makanan', note: 'Kantin Maksi' },
    { id: id(), type: 'expense', amount: 15000, date: '2025-09-23', categoryId: 'cat_makanan', note: 'Reman coklat' },
    { id: id(), type: 'expense', amount: 21000, date: '2025-09-25', categoryId: 'cat_makanan', note: 'Angkringan' },
    { id: id(), type: 'expense', amount: 83200, date: '2025-09-22', categoryId: 'cat_makanan', note: 'Bakmi Sedjuk' },
    { id: id(), type: 'expense', amount: 85288, date: '2025-09-23', categoryId: 'cat_transportasi', note: 'Kartu e-money' },
    { id: id(), type: 'expense', amount: 30000, date: '2025-09-24', categoryId: 'cat_top_up', note: 'e-money' },
    { id: id(), type: 'expense', amount: 71000, date: '2025-09-24', categoryId: 'cat_makanan', note: 'AW' },
    { id: id(), type: 'expense', amount: 234460, date: '2025-09-24', categoryId: 'cat_hiburan', note: 'Karaoke' },
    { id: id(), type: 'expense', amount: 70000, date: '2025-09-25', categoryId: 'cat_top_up', note: 'Ovo' },
    { id: id(), type: 'expense', amount: 25000, date: '2025-09-26', categoryId: 'cat_makanan', note: 'Kopi Reman' },
    { id: id(), type: 'expense', amount: 300000, date: '2025-09-26', categoryId: 'cat_belanja', note: 'ATM' },
    { id: id(), type: 'expense', amount: 141000, date: '2025-09-26', categoryId: 'cat_top_up', note: 'Gopay' },
    { id: id(), type: 'expense', amount: 20000, date: '2025-09-26', categoryId: 'cat_top_up', note: 'Ovo' },
    { id: id(), type: 'expense', amount: 50000, date: '2025-09-27', categoryId: 'cat_top_up', note: 'Ovo' },
    { id: id(), type: 'expense', amount: 157800, date: '2025-09-27', categoryId: 'cat_makanan', note: 'Arah Coffee with Ana' },
    { id: id(), type: 'expense', amount: 100000, date: '2025-09-27', categoryId: 'cat_top_up', note: 'Ovo' },
    { id: id(), type: 'expense', amount: 123000, date: '2025-09-27', categoryId: 'cat_makanan', note: 'Yoshinoya with Septi' },
    { id: id(), type: 'expense', amount: 90000, date: '2025-09-28', categoryId: 'cat_makanan', note: 'Bakmi with geng bagas gres' },
    { id: id(), type: 'expense', amount: 137000, date: '2025-09-28', categoryId: 'cat_makanan', note: 'Djauw coffe' },
  ];

  let state = {
    categories: structuredClone(defaultCategories),
    transactions: [], // {id, type:'income'|'expense', amount, date: 'YYYY-MM-DD', categoryId, note}
  };

  // Elements
  const els = {};
  
  // Dashboard date filter state
  let dashboardDateFilter = {
    period: 'month',
    startDate: null,
    endDate: null
  };
  
  // Table sort state
  let tableSortState = {
    column: 'date',
    direction: 'desc' // 'asc' or 'desc'
  };
  
  document.addEventListener('DOMContentLoaded', () => {
    cacheEls();
    initTheme();
    showPasswordPrompt();
  });

  function cacheEls() {
    els.kpiBalance = $('#kpiBalance');
    els.kpiIncome = $('#kpiIncome');
    els.kpiExpense = $('#kpiExpense');
    els.kpiSavings = $('#kpiSavings');
    els.kpiSavingsSub = $('#kpiSavingsSub');
    els.kpiTotalBudget = $('#kpiTotalBudget');
    els.kpiTotalBudgetSub = $('#kpiTotalBudgetSub');
    els.kpiNetMonth = $('#kpiNetMonth');
    els.kpiIncomeMonth = $('#kpiIncomeMonth');
    els.kpiExpenseMonth = $('#kpiExpenseMonth');

    els.filterType = $('#filterType');
    els.filterCategory = $('#filterCategory');
    els.filterMonth = $('#filterMonth');
    els.filterSearch = $('#filterSearch');
    els.clearFilters = $('#clearFilters');

    els.txTableBody = $('#txTable tbody');
    els.addTxBtn = $('#addTxBtn');

    els.txModal = $('#txModal');
    els.txForm = $('#txForm');
    els.txModalTitle = $('#txModalTitle');
    els.deleteTxBtn = $('#deleteTxBtn');
    els.txCategory = $('#txCategory');

    els.catModal = $('#catModal');
    els.catForm = $('#catForm');
    els.manageCategoriesBtn = $('#manageCategoriesBtn');
    els.categoryList = $('#categoryList');
    els.newCatName = $('#newCatName');
    els.newCatColor = $('#newCatColor');
    els.newCatBudget = $('#newCatBudget');
    els.addCategoryBtn = $('#addCategoryBtn');
    els.resetDefaultsBtn = $('#resetDefaultsBtn');

    els.darkToggle = $('#darkToggle');
    els.exportBtn = $('#exportBtn');
    els.importBtn = $('#importBtn');
    els.lockBtn = $('#lockBtn');

    els.categoryChart = $('#categoryChart');
    els.trendChart = $('#trendChart');
    els.budgetBoxes = $('#budgetBoxes');
    els.addBudgetBtn = $('#addBudgetBtn');
    els.addCategoryExpenseBtn = $('#addCategoryExpenseBtn');
    
    els.dashboardStartDate = $('#dashboardStartDate');
    els.dashboardEndDate = $('#dashboardEndDate');
    els.dashboardPeriod = $('#dashboardPeriod');
    els.applyDashboardFilter = $('#applyDashboardFilter');
    els.dateRangeInputs = $('.date-range-inputs');
    
    els.passwordModal = $('#passwordModal');
    els.passwordForm = $('#passwordForm');
    els.passwordInput = $('#passwordInput');
    els.passwordSubmit = $('#passwordSubmit');
    els.passwordError = $('#passwordError');
    els.passwordHint = $('#passwordHint');
    els.resetDataBtn = $('#resetDataBtn');
  }

  function wireEvents() {
    // Filters
    [els.filterType, els.filterCategory, els.filterMonth].forEach(el => el.addEventListener('change', () => renderAll()));
    els.filterSearch.addEventListener('input', debounce(renderAll, 200));
    els.clearFilters.addEventListener('click', () => {
      els.filterType.value = 'all';
      els.filterCategory.value = 'all';
      els.filterMonth.value = '';
      els.filterSearch.value = '';
      renderAll();
    });
    
    // Table sorting
    document.querySelectorAll('.table th.sortable').forEach(th => {
      th.addEventListener('click', () => handleSort(th.dataset.sort));
    });

    // Add transaction
    els.addTxBtn.addEventListener('click', () => openTxModal());

    // Tx form
    els.txModal.addEventListener('close', () => {
      els.deleteTxBtn.classList.add('hidden');
      els.txForm.reset();
    });

    els.txForm.addEventListener('submit', (e) => {
      e.preventDefault();
      saveTxFromForm();
    });

    // Close button handlers
    els.txForm.querySelectorAll('[value="cancel"]').forEach(btn => {
      btn.addEventListener('click', () => els.txModal.close());
    });
    
    // Close on backdrop click
    els.txModal.addEventListener('click', (e) => {
      if (e.target === els.txModal) els.txModal.close();
    });
    els.catModal.addEventListener('click', (e) => {
      if (e.target === els.catModal) els.catModal.close();
    });

    els.deleteTxBtn.addEventListener('click', () => {
      const idVal = els.txForm.elements['id'].value;
      if (idVal) {
        state.transactions = state.transactions.filter(t => t.id !== idVal);
        saveState();
        renderAll();
        els.txModal.close();
      }
    });

    // Categories modal
    els.manageCategoriesBtn.addEventListener('click', () => openCategoriesModal());
    els.catForm.querySelectorAll('[value="cancel"]').forEach(btn => {
      btn.addEventListener('click', () => els.catModal.close());
    });
    els.addCategoryBtn.addEventListener('click', () => {
      const name = els.newCatName.value.trim();
      if (!name) return;
      const color = els.newCatColor.value || '#6366f1';
      const budget = parseFloat(els.newCatBudget.value || '0') || 0;
      state.categories.push({ id: id(), name, color, budget });
      saveState();
      els.newCatName.value = '';
      renderCategoriesPanel();
      renderAll();
    });
    els.resetDefaultsBtn.addEventListener('click', () => {
      if (confirm('Reset kategori dan anggaran ke default?')) {
        state.categories = structuredClone(defaultCategories);
        saveState();
        renderCategoriesPanel();
        renderAll();
      }
    });

    // Theme
    els.darkToggle.addEventListener('click', toggleTheme);

    // Import/Export
    els.exportBtn.addEventListener('click', exportData);
    els.importBtn.addEventListener('click', importData);
    
    // Lock
    els.lockBtn.addEventListener('click', lockApp);
    
    // Dashboard date filter
    els.dashboardPeriod.addEventListener('change', handleDashboardPeriodChange);
    els.applyDashboardFilter.addEventListener('click', applyDashboardDateFilter);
    els.dashboardStartDate.addEventListener('change', () => {
      if (els.dashboardPeriod.value === 'custom') {
        applyDashboardDateFilter();
      }
    });
    els.dashboardEndDate.addEventListener('change', () => {
      if (els.dashboardPeriod.value === 'custom') {
        applyDashboardDateFilter();
      }
    });
    
    // Budget buttons
    els.addBudgetBtn.addEventListener('click', addBudgetToCategory);
    els.addCategoryExpenseBtn.addEventListener('click', addNewExpenseCategory);
  }

  function openTxModal(tx) {
    // Populate categories
    syncCategorySelects();

    if (tx) {
      els.txModalTitle.textContent = 'Edit Transaksi';
      setFormValues(els.txForm, tx);
      els.deleteTxBtn.classList.remove('hidden');
    } else {
      els.txModalTitle.textContent = 'Tambah Transaksi';
      setFormValues(els.txForm, { type: 'expense', date: today() });
      els.deleteTxBtn.classList.add('hidden');
    }
    els.txModal.showModal();
  }

  function saveTxFromForm() {
    const form = els.txForm;
    const data = Object.fromEntries(new FormData(form).entries());
    const tx = {
      id: data.id || id(),
      type: data.type,
      amount: Math.abs(parseFloat(data.amount)) || 0,
      date: data.date,
      categoryId: data.category,
      note: data.note?.trim() || '',
    };
    if (!tx.date || !tx.type || !tx.categoryId || !tx.amount) return;

    const existingIdx = state.transactions.findIndex(t => t.id === data.id);
    if (existingIdx >= 0) state.transactions[existingIdx] = tx; else state.transactions.push(tx);

    // Sort by date desc
    state.transactions.sort((a,b) => b.date.localeCompare(a.date));

    saveState();
    renderAll();
    els.txModal.close();
  }

  function openCategoriesModal() {
    renderCategoriesPanel();
    els.catModal.showModal();
  }

  function renderCategoriesPanel() {
    const wrap = els.categoryList;
    wrap.innerHTML = '';
    state.categories.forEach(cat => {
      const div = document.createElement('div');
      div.className = 'category-item';
      div.innerHTML = `
        <input value="${escapeHtml(cat.name)}" data-id="${cat.id}" class="cat-name"/>
        <input type="color" value="${cat.color}" data-id="${cat.id}" class="cat-color"/>
        <input type="number" step="0.01" min="0" value="${cat.budget || 0}" data-id="${cat.id}" class="cat-budget"/>
        <button class="btn danger ghost cat-delete" data-id="${cat.id}">Hapus</button>
      `;
      wrap.appendChild(div);
    });

    wrap.querySelectorAll('.cat-name').forEach(inp => inp.addEventListener('input', (e) => {
      const c = state.categories.find(c => c.id === e.target.dataset.id);
      if (c) { c.name = e.target.value; saveState(); syncCategorySelects(); renderAll(); }
    }));
    wrap.querySelectorAll('.cat-color').forEach(inp => inp.addEventListener('change', (e) => {
      const c = state.categories.find(c => c.id === e.target.dataset.id);
      if (c) { c.color = e.target.value; saveState(); renderAll(); }
    }));
    wrap.querySelectorAll('.cat-budget').forEach(inp => inp.addEventListener('change', (e) => {
      const c = state.categories.find(c => c.id === e.target.dataset.id);
      if (c) { c.budget = parseFloat(e.target.value || '0') || 0; saveState(); renderAll(); }
    }));
    wrap.querySelectorAll('.cat-delete').forEach(btn => btn.addEventListener('click', (e) => {
      const id = e.target.dataset.id;
      if (!confirm('Hapus kategori ini? Transaksi akan tetap ada, tetapi kategori mungkin menjadi yatim piatu.')) return;
      state.categories = state.categories.filter(c => c.id !== id);
      saveState();
      renderCategoriesPanel();
      renderAll();
    }));
  }

  async function loadState() {
    try {
      const encrypted = localStorage.getItem(STORAGE_KEY);
      if (!encrypted) return;
      
      const decrypted = await decryptData(encrypted, userPassword);
      if (!decrypted) throw new Error('Decryption failed');
      
      const parsed = JSON.parse(decrypted);
      if (parsed?.categories && Array.isArray(parsed.categories)) state.categories = parsed.categories;
      if (parsed?.transactions && Array.isArray(parsed.transactions)) state.transactions = parsed.transactions;
    } catch (e) {
      console.error('Failed to load state', e);
      throw e;
    }
  }

  async function saveState() {
    try {
      const json = JSON.stringify(state);
      const encrypted = await encryptData(json, userPassword);
      localStorage.setItem(STORAGE_KEY, encrypted);
    } catch (e) {
      console.error('Failed to save state', e);
    }
  }

  function renderAll() {
    syncCategorySelects();
    renderKPIs();
    renderBudgetBoxes();
    renderTable();
    renderCharts();
  }

  function syncCategorySelects() {
    // For filter
    setSelectOptions(els.filterCategory, [{ value: 'all', label: 'Semua kategori' }, ...state.categories.map(c => ({ value: c.id, label: c.name }))]);
    // For transaction form
    setSelectOptions(els.txCategory, state.categories.map(c => ({ value: c.id, label: c.name })));
  }

  function setSelectOptions(select, opts) {
    const current = select.value;
    select.innerHTML = '';
    opts.forEach(o => {
      const opt = document.createElement('option');
      opt.value = o.value; opt.textContent = o.label; select.appendChild(opt);
    });
    const has = [...select.options].some(o => o.value === current);
    if (has) select.value = current;
  }

  function filteredTransactions() {
    const type = els.filterType.value;
    const cat = els.filterCategory.value;
    const month = els.filterMonth.value; // YYYY-MM
    const q = els.filterSearch.value.trim().toLowerCase();

    let filtered = state.transactions.filter(t => {
      if (type !== 'all' && t.type !== type) return false;
      if (cat !== 'all' && t.categoryId !== cat) return false;
      if (month && t.date.slice(0,7) !== month) return false;
      if (q && !(t.note?.toLowerCase() || '').includes(q)) return false;
      return true;
    });
    
    // Apply sorting
    return sortTransactions(filtered);
  }

  function renderTable() {
    const tbody = els.txTableBody;
    tbody.innerHTML = '';

    const list = filteredTransactions();
    list.forEach(tx => {
      const tr = document.createElement('tr');
      const cat = state.categories.find(c => c.id === tx.categoryId);
      
      let typeLabel = 'Pengeluaran';
      let typeColor = 'var(--neg)';
      if (tx.type === 'income') {
        typeLabel = 'Pemasukan';
        typeColor = 'var(--pos)';
      } else if (tx.type === 'savings') {
        typeLabel = 'Tabungan';
        typeColor = '#8b5cf6';
      }
      
      tr.innerHTML = `
        <td>${tx.date}</td>
        <td><span class="badge"><span class="dot" style="background:${typeColor}"></span>${typeLabel}</span></td>
        <td>${cat ? `<span class="badge"><span class="dot" style="background:${cat.color}"></span>${escapeHtml(cat.name)}</span>` : '<em>—</em>'}</td>
        <td class="num" style="color:${typeColor}">${formatCurrency(tx.amount)}</td>
        <td>${escapeHtml(tx.note || '')}</td>
        <td>
          <div class="actions">
            <button class="btn ghost edit" data-id="${tx.id}">Edit</button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });

    tbody.querySelectorAll('.edit').forEach(btn => btn.addEventListener('click', (e) => {
      const tx = state.transactions.find(t => t.id === e.target.dataset.id);
      if (tx) openTxModal(tx);
    }));
  }

  function renderKPIs() {
    const sum = (arr) => arr.reduce((a,b) => a + b, 0);
    
    // Real-time all-time totals (main KPI values)
    const allIncome = sum(state.transactions.filter(t => t.type === 'income').map(t => t.amount));
    const allExpense = sum(state.transactions.filter(t => t.type === 'expense').map(t => t.amount));
    const allSavings = sum(state.transactions.filter(t => t.type === 'savings').map(t => t.amount));
    const allBalance = allIncome - allExpense - allSavings;
    
    // Get filtered transactions based on dashboard date filter for subtotals
    const filteredTxs = getFilteredDashboardTransactions();
    const periodIncome = sum(filteredTxs.filter(t => t.type === 'income').map(t => t.amount));
    const periodExpense = sum(filteredTxs.filter(t => t.type === 'expense').map(t => t.amount));
    const periodSavings = sum(filteredTxs.filter(t => t.type === 'savings').map(t => t.amount));
    const periodNet = periodIncome - periodExpense - periodSavings;

    // Display real-time all-time totals
    els.kpiBalance.textContent = formatCurrency(allBalance);
    els.kpiIncome.textContent = formatCurrency(allIncome);
    els.kpiExpense.textContent = formatCurrency(allExpense);
    
    // Display savings
    els.kpiSavings.textContent = formatCurrency(allSavings);
    const periodLabel2 = getPeriodLabel();
    els.kpiSavingsSub.textContent = `${periodLabel2}: ${formatCurrency(periodSavings)}`;
    
    // Calculate total budget
    const totalBudget = state.categories.reduce((sum, cat) => sum + (cat.budget || 0), 0);
    els.kpiTotalBudget.textContent = formatCurrency(totalBudget);
    const budgetUsed = periodExpense;
    const budgetPercentage = totalBudget > 0 ? ((budgetUsed / totalBudget) * 100).toFixed(1) : 0;
    els.kpiTotalBudgetSub.textContent = `Terpakai: ${formatCurrency(budgetUsed)} (${budgetPercentage}%)`;
    
    // Display period-specific subtotals
    const periodLabel = getPeriodLabel();
    els.kpiNetMonth.textContent = `${periodLabel}: ${formatCurrency(periodNet)}`;
    els.kpiIncomeMonth.textContent = `${periodLabel}: ${formatCurrency(periodIncome)}`;
    els.kpiExpenseMonth.textContent = `${periodLabel}: ${formatCurrency(periodExpense)}`;

  }
  
  function renderBudgetBoxes() {
    const filteredTxs = getFilteredDashboardTransactions();
    const expensesByCategory = groupBy(filteredTxs.filter(t => t.type === 'expense'), t => t.categoryId);
    
    els.budgetBoxes.innerHTML = '';
    
    state.categories.forEach(cat => {
      if (cat.budget && cat.budget > 0) {
        const spent = expensesByCategory[cat.id]?.reduce((sum, tx) => sum + tx.amount, 0) || 0;
        const percentage = (spent / cat.budget) * 100;
        const percentageDisplay = Math.min(percentage, 100);
        
        let status = 'ok';
        if (percentage > 100) status = 'over';
        else if (percentage > 80) status = 'warning';
        
        const box = document.createElement('div');
        box.className = `budget-box ${status}`;
        box.innerHTML = `
          <div class="budget-box-header">
            <div class="budget-box-dot" style="background: ${cat.color}"></div>
            <div class="budget-box-name">${escapeHtml(cat.name)}</div>
            <button class="budget-edit-btn" data-cat-id="${cat.id}" title="Edit budget">✏️</button>
          </div>
          <div class="budget-box-spent">${formatCurrency(spent)}</div>
          <div class="budget-box-budget">Budget: ${formatCurrency(cat.budget)}</div>
          <div class="budget-progress">
            <div class="budget-progress-bar" style="width: ${percentageDisplay}%"></div>
          </div>
        `;
        els.budgetBoxes.appendChild(box);
      }
    });
    
    // Add event listeners to edit buttons
    els.budgetBoxes.querySelectorAll('.budget-edit-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const catId = e.target.dataset.catId;
        const category = state.categories.find(c => c.id === catId);
        if (category) {
          const newBudget = prompt(`Edit budget untuk ${category.name}:`, category.budget);
          if (newBudget !== null) {
            const budgetValue = parseFloat(newBudget) || 0;
            category.budget = budgetValue;
            saveState();
            renderAll();
          }
        }
      });
    });
  }
  
  function addBudgetToCategory() {
    // Show list of categories without budget
    const categoriesWithoutBudget = state.categories.filter(c => !c.budget || c.budget === 0);
    
    if (categoriesWithoutBudget.length === 0) {
      alert('Semua kategori sudah memiliki budget!');
      return;
    }
    
    const categoryNames = categoriesWithoutBudget.map((c, i) => `${i + 1}. ${c.name}`).join('\n');
    const choice = prompt(`Pilih kategori untuk menambahkan budget:\n${categoryNames}\n\nMasukkan nomor kategori:`);
    
    if (choice) {
      const index = parseInt(choice) - 1;
      if (index >= 0 && index < categoriesWithoutBudget.length) {
        const category = categoriesWithoutBudget[index];
        const budget = prompt(`Masukkan budget untuk ${category.name}:`);
        if (budget !== null) {
          const budgetValue = parseFloat(budget) || 0;
          category.budget = budgetValue;
          saveState();
          renderAll();
        }
      } else {
        alert('Nomor tidak valid!');
      }
    }
  }
  
  function addNewExpenseCategory() {
    const name = prompt('Nama kategori pengeluaran baru:');
    if (!name || !name.trim()) return;
    
    const color = prompt('Warna (hex code, contoh: #ff5733):', '#6366f1');
    const budget = prompt('Budget bulanan (opsional):', '0');
    
    const newCategory = {
      id: id(),
      name: name.trim(),
      color: color || '#6366f1',
      budget: parseFloat(budget) || 0
    };
    
    state.categories.push(newCategory);
    saveState();
    renderAll();
    alert(`Kategori "${newCategory.name}" berhasil ditambahkan!`);
  }

  let catChart, trChart;
  function renderCharts() {
    // Category chart: sum expenses by category for selected month (or all if none)
    const month = els.filterMonth.value;
    const expenses = state.transactions.filter(t => t.type==='expense' && (!month || t.date.slice(0,7)===month));
    const catMap = new Map();
    expenses.forEach(t => {
      const cat = state.categories.find(c => c.id === t.categoryId);
      const key = cat ? cat.name : 'Tanpa Kategori';
      const color = cat ? cat.color : '#94a3b8';
      const prev = catMap.get(key) || { total: 0, color };
      prev.total += t.amount;
      catMap.set(key, prev);
    });
    const catLabels = [...catMap.keys()];
    const catData = [...catMap.values()].map(v => v.total);
    const catColors = [...catMap.values()].map(v => v.color);

    if (catChart) catChart.destroy();
    catChart = new Chart(els.categoryChart, {
      type: 'doughnut',
      data: { labels: catLabels, datasets: [{ data: catData, backgroundColor: catColors }] },
      options: { plugins: { legend: { position: 'bottom', labels: { color: getCss('--text') } } } }
    });

    // Trend chart: monthly income vs expense over last 12 months
    const months = getLastMonths(12).reverse(); // oldest -> newest
    const incomeSeries = months.map(m => sumAmount(state.transactions, 'income', m));
    const expenseSeries = months.map(m => sumAmount(state.transactions, 'expense', m));

    if (trChart) trChart.destroy();
    trChart = new Chart(els.trendChart, {
      type: 'line',
      data: {
        labels: months,
        datasets: [
          { label: 'Pemasukan', data: incomeSeries, borderColor: getCss('--pos'), backgroundColor: 'transparent', tension: .3 },
          { label: 'Pengeluaran', data: expenseSeries, borderColor: getCss('--neg'), backgroundColor: 'transparent', tension: .3 }
        ]
      },
      options: {
        plugins: { legend: { labels: { color: getCss('--text') } } },
        scales: {
          x: { ticks: { color: getCss('--muted') }, grid: { color: getCss('--border') } },
          y: { ticks: { color: getCss('--muted') }, grid: { color: getCss('--border') } }
        }
      }
    });
  }

  function sumAmount(list, type, month) {
    return list.filter(t => t.type===type && t.date.slice(0,7)===month).reduce((a,b)=>a+b.amount,0);
  }

  // Import/Export
  function exportData() {
    const data = JSON.stringify(state, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `finance-tracker-${Date.now()}.json`;
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  }

  function importData() {
    const inp = document.createElement('input');
    inp.type = 'file'; inp.accept = 'application/json';
    inp.addEventListener('change', () => {
      const file = inp.files?.[0]; if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const obj = JSON.parse(reader.result);
          if (obj?.categories && obj?.transactions) {
            state = obj;
            saveState();
            renderAll();
          } else {
            alert('File tidak valid');
          }
        } catch (e) { alert('Gagal mengimpor'); }
      };
      reader.readAsText(file);
    });
    inp.click();
  }

  // Theme
  function initTheme() {
    const theme = localStorage.getItem(THEME_KEY) || 'dark';
    setTheme(theme);
  }
  function toggleTheme() {
    const isLight = document.documentElement.classList.toggle('light');
    const theme = isLight ? 'light' : 'dark';
    localStorage.setItem(THEME_KEY, theme);
    // refresh charts for color
    renderCharts();
  }
  function setTheme(theme) {
    document.documentElement.classList.toggle('light', theme === 'light');
  }

  // Utils
  function $(sel) { return document.querySelector(sel); }
  function id() { return Math.random().toString(36).slice(2, 10); }
  function today() { return new Date().toISOString().slice(0,10); }
  function capitalize(s) { return s ? s[0].toUpperCase() + s.slice(1) : s; }
  function setFormValues(form, values) { Object.entries(values).forEach(([k,v]) => { if (k in form.elements) form.elements[k].value = v; }); }
  function groupBy(arr, keyFn) { return arr.reduce((acc, item) => { const k = keyFn(item); (acc[k] ||= []).push(item); return acc; }, {}); }
  function formatCurrency(n) {
    try { return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n); }
    catch { return `Rp${n.toLocaleString('id-ID')}`; }
  }
  function guessCurrency() {
    return 'IDR';
  }
  function escapeHtml(s) { return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c])); }
  function debounce(fn, ms) { let t; return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); }; }
  function getLastMonths(n) {
    const arr = []; const d = new Date();
    for (let i=0;i<n;i++) { const y = d.getFullYear(); const m = String(d.getMonth()+1).padStart(2,'0'); arr.push(`${y}-${m}`); d.setMonth(d.getMonth()-1); }
    return arr;
  }
  function getCss(varName) { return getComputedStyle(document.documentElement).getPropertyValue(varName).trim(); }
  
  // Table sorting functions
  function handleSort(column) {
    if (tableSortState.column === column) {
      // Toggle direction if same column
      tableSortState.direction = tableSortState.direction === 'asc' ? 'desc' : 'asc';
    } else {
      // New column, default to ascending
      tableSortState.column = column;
      tableSortState.direction = 'asc';
    }
    
    updateSortIcons();
    renderTable();
  }
  
  function updateSortIcons() {
    // Remove all sort classes
    document.querySelectorAll('.table th.sortable').forEach(th => {
      th.classList.remove('asc', 'desc');
    });
    
    // Add class to active sort column
    const activeTh = document.querySelector(`.table th.sortable[data-sort="${tableSortState.column}"]`);
    if (activeTh) {
      activeTh.classList.add(tableSortState.direction);
    }
  }
  
  function sortTransactions(transactions) {
    const sorted = [...transactions];
    const { column, direction } = tableSortState;
    const multiplier = direction === 'asc' ? 1 : -1;
    
    sorted.sort((a, b) => {
      let aVal, bVal;
      
      switch(column) {
        case 'date':
          aVal = a.date;
          bVal = b.date;
          return aVal.localeCompare(bVal) * multiplier;
          
        case 'type':
          const typeOrder = { income: 1, expense: 2, savings: 3 };
          aVal = typeOrder[a.type] || 99;
          bVal = typeOrder[b.type] || 99;
          return (aVal - bVal) * multiplier;
          
        case 'category':
          const catA = state.categories.find(c => c.id === a.categoryId);
          const catB = state.categories.find(c => c.id === b.categoryId);
          aVal = catA?.name || '';
          bVal = catB?.name || '';
          return aVal.localeCompare(bVal) * multiplier;
          
        case 'amount':
          aVal = a.amount;
          bVal = b.amount;
          return (aVal - bVal) * multiplier;
          
        case 'note':
          aVal = (a.note || '').toLowerCase();
          bVal = (b.note || '').toLowerCase();
          return aVal.localeCompare(bVal) * multiplier;
          
        default:
          return 0;
      }
    });
    
    return sorted;
  }
  
  // Dashboard date filter functions
  function initDashboardFilter() {
    // Initialize with "month" as default
    applyDashboardDateFilter();
    updateDateInputsVisibility();
  }
  
  function handleDashboardPeriodChange() {
    const period = els.dashboardPeriod.value;
    dashboardDateFilter.period = period;
    updateDateInputsVisibility();
    
    if (period !== 'custom') {
      applyDashboardDateFilter();
    }
  }
  
  function updateDateInputsVisibility() {
    const period = els.dashboardPeriod.value;
    if (period === 'custom') {
      els.dateRangeInputs.classList.add('visible');
      // Set current filter dates if available
      if (dashboardDateFilter.startDate) {
        els.dashboardStartDate.value = dashboardDateFilter.startDate;
      }
      if (dashboardDateFilter.endDate) {
        els.dashboardEndDate.value = dashboardDateFilter.endDate;
      }
    } else {
      els.dateRangeInputs.classList.remove('visible');
    }
  }
  
  function applyDashboardDateFilter() {
    const period = els.dashboardPeriod.value;
    const now = new Date();
    
    switch(period) {
      case 'all':
        dashboardDateFilter.startDate = null;
        dashboardDateFilter.endDate = null;
        break;
      case 'today':
        dashboardDateFilter.startDate = today();
        dashboardDateFilter.endDate = today();
        break;
      case 'week':
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - now.getDay());
        dashboardDateFilter.startDate = weekStart.toISOString().slice(0,10);
        dashboardDateFilter.endDate = today();
        break;
      case 'month':
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        dashboardDateFilter.startDate = monthStart.toISOString().slice(0,10);
        dashboardDateFilter.endDate = today();
        break;
      case 'lastmonth':
        const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
        dashboardDateFilter.startDate = lastMonthStart.toISOString().slice(0,10);
        dashboardDateFilter.endDate = lastMonthEnd.toISOString().slice(0,10);
        break;
      case 'year':
        const yearStart = new Date(now.getFullYear(), 0, 1);
        dashboardDateFilter.startDate = yearStart.toISOString().slice(0,10);
        dashboardDateFilter.endDate = today();
        break;
      case 'custom':
        dashboardDateFilter.startDate = els.dashboardStartDate.value || null;
        dashboardDateFilter.endDate = els.dashboardEndDate.value || null;
        break;
    }
    
    renderAll();
  }
  
  function getFilteredDashboardTransactions() {
    if (!dashboardDateFilter.startDate && !dashboardDateFilter.endDate) {
      return state.transactions;
    }
    
    return state.transactions.filter(t => {
      if (dashboardDateFilter.startDate && t.date < dashboardDateFilter.startDate) return false;
      if (dashboardDateFilter.endDate && t.date > dashboardDateFilter.endDate) return false;
      return true;
    });
  }
  
  function getPeriodLabel() {
    const period = dashboardDateFilter.period;
    switch(period) {
      case 'all': return 'Semua waktu';
      case 'today': return 'Hari ini';
      case 'week': return 'Minggu ini';
      case 'month': return 'Bulan ini';
      case 'lastmonth': return 'Bulan lalu';
      case 'year': return 'Tahun ini';
      case 'custom': return 'Periode dipilih';
      default: return 'Bulan ini';
    }
  }
  
  // Password & Encryption
  function showPasswordPrompt() {
    const hasData = !!localStorage.getItem(STORAGE_KEY);
    if (hasData) {
      els.passwordHint.classList.add('hidden');
    } else {
      els.passwordHint.classList.remove('hidden');
    }
    els.passwordError.classList.add('hidden');
    els.passwordInput.value = '';
    els.passwordModal.showModal();
    
    els.passwordForm.onsubmit = async (e) => {
      e.preventDefault();
      const password = els.passwordInput.value;
      if (!password) return;
      
      try {
        if (hasData) {
          // Try to decrypt existing data
          await loadStateWithPassword(password);
        } else {
          // First time: set password and load default income transactions
          userPassword = password;
          state.transactions = structuredClone(defaultTransactions);
          await saveState();
        }
        
        isUnlocked = true;
        els.passwordModal.close();
        wireEvents();
        initDashboardFilter();
        updateSortIcons();
        renderAll();
      } catch (e) {
        els.passwordError.classList.remove('hidden');
        els.passwordInput.value = '';
        els.passwordInput.focus();
      }
    };
    
    // Reset data button
    els.resetDataBtn.addEventListener('click', () => {
      if (confirm('Hapus semua data dan mulai dari awal? Tindakan ini tidak dapat dibatalkan!')) {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(SALT_KEY);
        location.reload();
      }
    });
  }
  
  async function loadStateWithPassword(password) {
    userPassword = password;
    await loadState();
  }
  
  function lockApp() {
    if (!confirm('Kunci aplikasi? Anda harus memasukkan kata sandi lagi.')) return;
    userPassword = null;
    isUnlocked = false;
    state = {
      categories: structuredClone(defaultCategories),
      transactions: [],
    };
    renderAll();
    showPasswordPrompt();
  }
  
  // Encryption using Web Crypto API (AES-GCM)
  async function encryptData(text, password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const salt = getSalt();
    const key = await deriveKey(password, salt);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      data
    );
    
    // Combine iv + encrypted data
    const combined = new Uint8Array(iv.length + encrypted.byteLength);
    combined.set(iv, 0);
    combined.set(new Uint8Array(encrypted), iv.length);
    
    return arrayBufferToBase64(combined);
  }
  
  async function decryptData(base64, password) {
    const combined = base64ToArrayBuffer(base64);
    const iv = combined.slice(0, 12);
    const data = combined.slice(12);
    const salt = getSalt();
    const key = await deriveKey(password, salt);
    
    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      data
    );
    
    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
  }
  
  async function deriveKey(password, salt) {
    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      encoder.encode(password),
      'PBKDF2',
      false,
      ['deriveKey']
    );
    
    return crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt,
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
  }
  
  function getSalt() {
    let salt = localStorage.getItem(SALT_KEY);
    if (!salt) {
      const saltArray = crypto.getRandomValues(new Uint8Array(16));
      salt = arrayBufferToBase64(saltArray);
      localStorage.setItem(SALT_KEY, salt);
    }
    return base64ToArrayBuffer(salt);
  }
  
  function arrayBufferToBase64(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }
  
  function base64ToArrayBuffer(base64) {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  }
})();
