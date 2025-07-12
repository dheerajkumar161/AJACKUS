// Employee data (demo)
const departmentList = [
  'Design', 'Engineering', 'Finance', 'HR', 'IT', 'Marketing', 'Sales'
];
const roleList = [
  'Accountant',
  'Content Specialist',
  'DevOps Engineer',
  'Financial Analyst',
  'Graphic Designer',
  'HR Specialist',
  'Junior Developer',
  'Marketing Manager',
  'Recruiter',
  'Sales Manager'
];

// LocalStorage persistence helpers
function saveEmployeesToStorage() {
  localStorage.setItem('employees', JSON.stringify(employees));
}
function loadEmployeesFromStorage() {
  const data = localStorage.getItem('employees');
  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  }
  return null;
}

// Initialize employees from storage or demo
let employees = loadEmployeesFromStorage();
if (!employees) {
  employees = [
    { name: 'Rahul Patel', email: 'rahul.patel@company.com', department: 'Sales', role: 'Sales Manager' },
    { name: 'Abhinav Kumar', email: 'abhinav.kumar@company.com', department: 'Design', role: 'Graphic Designer' },
    { name: 'Rohit Sharma', email: 'rohit.sharma@company.com', department: 'Finance', role: 'Financial Analyst' },
    { name: 'Vinay Kumar', email: 'vinay.kumar@company.com', department: 'Engineering', role: 'Team Lead' },
    { name: 'Harshuth Singh', email: 'harshuth.singh@company.com', department: 'Design', role: 'UX Designer' },
    { name: 'Vishnu Vardhan', email: 'vishnu.vardhan@company.com', department: 'Marketing', role: 'Marketing Manager' },
    { name: 'Sita Mahalaxmi', email: 'sita.mahalaxmi@company.com', department: 'Engineering', role: 'DevOps Engineer' },
    { name: 'Ajay Singh', email: 'ajay.singh@company.com', department: 'Engineering', role: 'Senior Developer' },
    { name: 'Ketan Patel', email: 'ketan.patel@company.com', department: 'IT', role: 'System Administrator' },
    { name: 'Priyansh Arya', email: 'priyansh.arya@company.com', department: 'Marketing', role: 'Content Specialist' },
    { name: 'Shiva Kumar', email: 'shiva.kumar@company.com', department: 'Sales', role: 'Account Executive' },
    { name: 'Prasidh Krishna', email: 'prasidh.krishna@company.com', department: 'Finance', role: 'Accountant' },
    { name: 'Arjun Reddy', email: 'arjun.reddy@company.com', department: 'Design', role: 'Product Designer' },
    { name: 'Ramana Gadu', email: 'ramana.gadu@company.com', department: 'IT', role: 'Network Engineer' },
    { name: 'Rishi Kumar', email: 'rishi.kumar@company.com', department: 'Engineering', role: 'Frontend Developer' },
    { name: 'Bharath', email: 'bharath@company.com', department: 'Engineering', role: 'Junior Developer' },
  ];
  saveEmployeesToStorage();
}
let filteredEmployees = [...employees];
let currentPage = 1;
let perPage = 10;
let sortBy = 'az';
let nameFilter = 'first';
let departmentFilter = '';
let roleFilter = '';
let searchQuery = '';
let editIndex = null; // Track if editing

const departmentColors = {
  'Sales': 'sales',
  'Design': 'design',
  'Finance': 'finance',
  'Engineering': 'engineering',
  'Marketing': 'marketing',
  'IT': 'it',
};

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2);
}

function renderStats() {
  document.getElementById('total-employees').textContent = employees.length;
  const departments = new Set(employees.map(e => e.department));
  document.getElementById('departments').textContent = departments.size;
  const roles = new Set(employees.map(e => e.role));
  document.getElementById('active-roles').textContent = roles.size;
}

function renderFilters() {
  const depSel = document.getElementById('department-filter');
  const roleSel = document.getElementById('role-filter');
  depSel.innerHTML = '<option value="">All Departments</option>' + departmentList.map(d => `<option value="${d}">${d}</option>`).join('');
  roleSel.innerHTML = '<option value="">All Roles</option>' + roleList.map(r => `<option value="${r}">${r}</option>`).join('');
}

function filterEmployees() {
  filteredEmployees = employees.filter(e => {
    const matchesDepartment = !departmentFilter || e.department === departmentFilter;
    const matchesRole = !roleFilter || e.role === roleFilter;
    const matchesSearch = !searchQuery || (
      e.name.toLowerCase().includes(searchQuery) ||
      e.email.toLowerCase().includes(searchQuery)
    );
    return matchesDepartment && matchesRole && matchesSearch;
  });
  sortEmployees();
}

function sortEmployees() {
  filteredEmployees.sort((a, b) => {
    let aName = nameFilter === 'first' ? a.name.split(' ')[0] : a.name.split(' ').slice(-1)[0];
    let bName = nameFilter === 'first' ? b.name.split(' ')[0] : b.name.split(' ').slice(-1)[0];
    if (sortBy === 'az') return aName.localeCompare(bName);
    else return bName.localeCompare(aName);
  });
}

function showError(message) {
  let err = document.getElementById('modal-error');
  if (!err) {
    err = document.createElement('div');
    err.id = 'modal-error';
    err.style.color = '#ef4444';
    err.style.marginBottom = '10px';
    err.style.fontWeight = '500';
    addEmployeeForm.insertBefore(err, addEmployeeForm.firstChild);
  }
  err.textContent = message;
}
function clearError() {
  const err = document.getElementById('modal-error');
  if (err) err.textContent = '';
}

// Custom dropdown icons
const departmentIcons = {
  'Design': 'fa-palette',
  'Engineering': 'fa-gears',
  'Finance': 'fa-coins',
  'HR': 'fa-user-tie',
  'IT': 'fa-network-wired',
  'Marketing': 'fa-bullhorn',
  'Sales': 'fa-chart-line'
};
const roleIcons = {
  'Accountant': 'fa-calculator',
  'Content Specialist': 'fa-file-lines',
  'DevOps Engineer': 'fa-server',
  'Financial Analyst': 'fa-chart-pie',
  'Graphic Designer': 'fa-pen-nib',
  'HR Specialist': 'fa-users',
  'Junior Developer': 'fa-code',
  'Marketing Manager': 'fa-bullhorn',
  'Recruiter': 'fa-user-plus',
  'Sales Manager': 'fa-handshake'
};

function renderCustomDropdown(containerId, options, icons, placeholder, onSelect, selectedValue) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  const dropdown = document.createElement('div');
  dropdown.className = 'custom-dropdown';
  // Selected
  const selected = document.createElement('div');
  selected.className = 'custom-dropdown-selected';
  selected.tabIndex = 0;
  selected.setAttribute('role', 'button');
  selected.setAttribute('aria-haspopup', 'listbox');
  selected.setAttribute('aria-expanded', 'false');
  selected.innerHTML = `<span class="selected-label">${selectedValue ? `<i class='fa-solid ${icons[selectedValue] || ''} option-icon'></i> ${selectedValue}` : placeholder}</span><span class="custom-dropdown-arrow"><i class="fa-solid fa-chevron-down"></i></span>`;
  dropdown.appendChild(selected);
  // List
  const list = document.createElement('div');
  list.className = 'custom-dropdown-list';
  list.style.display = 'none';
  list.setAttribute('role', 'listbox');
  options.forEach(opt => {
    const optDiv = document.createElement('div');
    optDiv.className = 'custom-dropdown-option' + (opt === selectedValue ? ' selected' : '');
    optDiv.setAttribute('role', 'option');
    optDiv.innerHTML = `<i class='fa-solid ${icons[opt] || ''} option-icon'></i> ${opt}`;
    optDiv.onclick = () => {
      onSelect(opt);
      list.style.display = 'none';
      selected.setAttribute('aria-expanded', 'false');
    };
    list.appendChild(optDiv);
  });
  dropdown.appendChild(list);
  // Open/close logic
  selected.onclick = () => {
    const isOpen = list.style.display === 'block';
    document.querySelectorAll('.custom-dropdown-list').forEach(l => l.style.display = 'none');
    if (!isOpen) {
      list.style.display = 'block';
      selected.setAttribute('aria-expanded', 'true');
    } else {
      list.style.display = 'none';
      selected.setAttribute('aria-expanded', 'false');
    }
  };
  selected.onkeydown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      selected.click();
      e.preventDefault();
    }
    if (e.key === 'ArrowDown') {
      const first = list.querySelector('.custom-dropdown-option');
      if (first) first.focus();
      e.preventDefault();
    }
  };
  // Keyboard navigation for options
  list.querySelectorAll('.custom-dropdown-option').forEach((optDiv, idx, arr) => {
    optDiv.tabIndex = 0;
    optDiv.onkeydown = (e) => {
      if (e.key === 'ArrowDown') {
        if (arr[idx+1]) arr[idx+1].focus();
        e.preventDefault();
      } else if (e.key === 'ArrowUp') {
        if (arr[idx-1]) arr[idx-1].focus();
        e.preventDefault();
      } else if (e.key === 'Enter' || e.key === ' ') {
        optDiv.click();
        e.preventDefault();
      }
    };
  });
  // Close on outside click
  document.addEventListener('mousedown', function handler(e) {
    if (!dropdown.contains(e.target)) {
      list.style.display = 'none';
      selected.setAttribute('aria-expanded', 'false');
      document.removeEventListener('mousedown', handler);
    }
  });
  container.appendChild(dropdown);
}

// Modal state for custom dropdowns
let modalDepartmentValue = '';
let modalRoleValue = '';

function openModal(editEmp = null, idx = null) {
  clearError();
  editIndex = idx;
  modalDepartmentValue = editEmp ? editEmp.department : '';
  modalRoleValue = editEmp ? editEmp.role : '';
  function rerenderDepartment() {
    renderCustomDropdown('custom-department-dropdown', departmentList, departmentIcons, 'Select a department', (val) => { modalDepartmentValue = val; rerenderDepartment(); }, modalDepartmentValue);
  }
  function rerenderRole() {
    renderCustomDropdown('custom-role-dropdown', roleList, roleIcons, 'Select a role', (val) => { modalRoleValue = val; rerenderRole(); }, modalRoleValue);
  }
  rerenderDepartment();
  rerenderRole();
  if (editEmp) {
    document.getElementById('first-name').value = editEmp.name.split(' ')[0] || '';
    document.getElementById('last-name').value = editEmp.name.split(' ').slice(1).join(' ') || '';
    document.getElementById('email').value = editEmp.email;
    addEmployeeForm.querySelector('.modal-add-btn').innerHTML = '<i class="fa-solid fa-user-pen"></i> Save Changes';
  } else {
    addEmployeeForm.reset();
    addEmployeeForm.querySelector('.modal-add-btn').innerHTML = '<i class="fa-solid fa-user-plus"></i> Add Employee';
  }
  modalOverlay.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  modalOverlay.style.display = 'none';
  document.body.style.overflow = '';
  addEmployeeForm.reset();
}

function renderEmployees() {
  const list = document.getElementById('employee-list');
  list.innerHTML = '';
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const pageEmployees = filteredEmployees.slice(start, end);
  if (pageEmployees.length === 0) {
    list.innerHTML = '<div style="text-align:center;color:var(--subtitle-color);padding:32px;">No employees found.</div>';
    return;
  }
  for (const [idx, e] of pageEmployees.entries()) {
    const tags = [
      `<span class="tag ${departmentColors[e.department] || 'default'}">${e.department}</span>`,
      `<span class="tag">${e.role}</span>`
    ].join(' ');
    list.innerHTML += `
      <div class="employee-card" data-index="${start + idx}">
        <div class="employee-avatar ${departmentColors[e.department] || ''}">${getInitials(e.name)}</div>
        <div class="employee-name">${e.name}</div>
        <div class="employee-email">${e.email}</div>
        <div class="employee-tags">${tags}</div>
        <div class="employee-actions">
          <button class="edit-btn"><i class="fa-regular fa-pen-to-square"></i> Edit</button>
          <button class="delete-btn"><i class="fa-solid fa-trash"></i> Delete</button>
        </div>
      </div>
    `;
  }
  attachEditListeners();
  attachDeleteListeners();
}

function renderPagination() {
  const total = filteredEmployees.length;
  const totalPages = Math.ceil(total / perPage) || 1;
  document.getElementById('page-info').textContent = `${currentPage}`;
  document.getElementById('prev-page').disabled = currentPage === 1;
  document.getElementById('next-page').disabled = currentPage === totalPages;
}

function updateAll() {
  renderStats();
  renderFilters();
  filterEmployees();
  renderEmployees();
  renderPagination();
}

// Modal logic
const modalOverlay = document.getElementById('modal-overlay');
const addEmployeeBtn = document.getElementById('add-employee');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalCancelBtn = document.getElementById('modal-cancel-btn');
const addEmployeeForm = document.getElementById('add-employee-form');
const modalDepartment = document.getElementById('modal-department');
const modalRole = document.getElementById('modal-role');

addEmployeeBtn.addEventListener('click', () => openModal());
modalCloseBtn.addEventListener('click', closeModal);
modalCancelBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

addEmployeeForm.addEventListener('submit', function(e) {
  e.preventDefault();
  clearError();
  const firstName = document.getElementById('first-name').value.trim();
  const lastName = document.getElementById('last-name').value.trim();
  const email = document.getElementById('email').value.trim();
  const department = modalDepartmentValue;
  const role = modalRoleValue;
  // Validation
  if (!firstName || !lastName || !email || !department || !role) {
    showError('All fields are required.');
    return;
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    showError('Please enter a valid email address.');
    return;
  }
  if (editIndex !== null) {
    if (!confirm('Are you sure you want to save these changes?')) {
      return;
    }
    employees[editIndex] = {
      name: firstName + ' ' + lastName,
      email,
      department,
      role
    };
    saveEmployeesToStorage();
    closeModal();
    updateAll();
    editIndex = null;
    alert('Employee details updated successfully!');
    return;
  }
  if (employees.some(e => e.email === email)) {
    showError('An employee with this email already exists.');
    return;
  }
  employees.push({
    name: firstName + ' ' + lastName,
    email,
    department,
    role
  });
  saveEmployeesToStorage();
  closeModal();
  updateAll();
  editIndex = null;
});

// Event listeners

document.getElementById('search').addEventListener('input', e => {
  searchQuery = e.target.value.trim().toLowerCase();
  currentPage = 1;
  filterEmployees();
  renderEmployees();
  renderPagination();
});
document.getElementById('department-filter').addEventListener('change', e => {
  departmentFilter = e.target.value;
  currentPage = 1;
  filterEmployees();
  renderEmployees();
  renderPagination();
});
document.getElementById('role-filter').addEventListener('change', e => {
  roleFilter = e.target.value;
  currentPage = 1;
  filterEmployees();
  renderEmployees();
  renderPagination();
});
document.getElementById('name-filter').addEventListener('change', e => {
  nameFilter = e.target.value;
  currentPage = 1;
  sortEmployees();
  renderEmployees();
  renderPagination();
});
document.getElementById('sort-filter').addEventListener('change', e => {
  sortBy = e.target.value;
  currentPage = 1;
  sortEmployees();
  renderEmployees();
  renderPagination();
});
document.getElementById('reset-filters').addEventListener('click', () => {
  departmentFilter = '';
  roleFilter = '';
  nameFilter = 'first';
  sortBy = 'az';
  searchQuery = '';
  document.getElementById('search').value = '';
  document.getElementById('department-filter').value = '';
  document.getElementById('role-filter').value = '';
  document.getElementById('name-filter').value = 'first';
  document.getElementById('sort-filter').value = 'az';
  currentPage = 1;
  updateAll();
});
document.getElementById('per-page').addEventListener('change', e => {
  perPage = parseInt(e.target.value, 10);
  currentPage = 1;
  renderEmployees();
  renderPagination();
});
document.getElementById('prev-page').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    renderEmployees();
    renderPagination();
  }
});
document.getElementById('next-page').addEventListener('click', () => {
  const totalPages = Math.ceil(filteredEmployees.length / perPage) || 1;
  if (currentPage < totalPages) {
    currentPage++;
    renderEmployees();
    renderPagination();
  }
});
document.getElementById('add-employee').removeEventListener('click', () => {}); // Remove any previous alert handler

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
function setTheme(theme) {
  if (theme === 'light') {
    document.body.classList.add('light');
    localStorage.setItem('theme', 'light');
    themeToggle.textContent = 'Switch to Dark Theme';
  } else {
    document.body.classList.remove('light');
    localStorage.setItem('theme', 'dark');
    themeToggle.textContent = 'Switch to Light Theme';
  }
}
themeToggle.addEventListener('click', () => {
  const isLight = document.body.classList.contains('light');
  setTheme(isLight ? 'dark' : 'light');
});
(function initTheme() {
  const saved = localStorage.getItem('theme');
  setTheme(saved === 'light' ? 'light' : 'dark');
})();

// Initial render
updateAll();

// Edit button logic
function attachEditListeners() {
  document.querySelectorAll('.employee-card .edit-btn').forEach((btn, i) => {
    btn.onclick = () => {
      const idx = parseInt(btn.closest('.employee-card').getAttribute('data-index'));
      openModal(filteredEmployees[idx], employees.findIndex(e => e.email === filteredEmployees[idx].email));
    };
  });
}
// Delete button logic
function attachDeleteListeners() {
  document.querySelectorAll('.employee-card .delete-btn').forEach((btn, i) => {
    btn.onclick = () => {
      const idx = parseInt(btn.closest('.employee-card').getAttribute('data-index'));
      const emp = filteredEmployees[idx];
      if (!emp) {
        alert('No employee selected to delete.');
        return;
      }
      if (confirm('Are you sure you want to delete ' + emp.name + '?')) {
        const mainIdx = employees.findIndex(e => e.email === emp.email);
        if (mainIdx !== -1) employees.splice(mainIdx, 1);
        saveEmployeesToStorage();
        filterEmployees();
        renderEmployees();
        renderStats();
        renderPagination();
      }
    };
  });
}