// 全局变量
let currentTheme = 'dark';
let uploadedFiles = [];
let currentPage = 'diagnosisPage';

// DOM元素
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const expertModeCheckbox = document.getElementById('expertMode');
const expertSection = document.getElementById('expertSection');
const fileInput = document.getElementById('fileInput');
const uploadedFilesContainer = document.getElementById('uploadedFiles');
const submitBtn = document.getElementById('submitBtn');
const backBtn = document.getElementById('backBtn');
const navItems = document.querySelectorAll('.nav-item');
const pages = document.querySelectorAll('.page');

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
});

// 应用初始化
function initializeApp() {
    // 设置默认主题
    updateTheme();
    
    // 设置默认页面
    showPage('diagnosisPage');
    
    // 模拟一些历史数据
    loadHistoryData();
}

// 事件监听器设置
function setupEventListeners() {
    // 主题切换
    themeToggle.addEventListener('click', toggleTheme);
    
    // 专家模式切换
    expertModeCheckbox.addEventListener('change', toggleExpertMode);
    
    // 文件上传
    fileInput.addEventListener('change', handleFileUpload);
    
    // 拍照上传（模拟）
    document.getElementById('cameraBtn').addEventListener('click', simulateCamera);
    
    // 提交诊断
    submitBtn.addEventListener('click', startDiagnosis);
    
    // 返回按钮
    backBtn.addEventListener('click', () => showPage('diagnosisPage'));
    
    // 底部导航
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetPage = item.getAttribute('data-page');
            showPage(targetPage);
            updateNavigation(item);
        });
    });
    
    // 执行结果按钮
    document.getElementById('viewReportBtn')?.addEventListener('click', viewReport);
    document.getElementById('downloadBtn')?.addEventListener('click', downloadReport);
    document.getElementById('newDiagnosisBtn')?.addEventListener('click', startNewDiagnosis);
    
    // 历史记录清空
    document.getElementById('clearHistoryBtn')?.addEventListener('click', clearHistory);
}

// 主题切换
function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    updateTheme();
}

function updateTheme() {
    const body = document.body;
    const icon = themeIcon;
    
    if (currentTheme === 'light') {
        body.classList.add('light-theme');
        icon.className = 'fas fa-sun';
    } else {
        body.classList.remove('light-theme');
        icon.className = 'fas fa-moon';
    }
}

// 专家模式切换
function toggleExpertMode() {
    const isChecked = expertModeCheckbox.checked;
    expertSection.style.display = isChecked ? 'block' : 'none';
}

// 文件上传处理
function handleFileUpload(event) {
    const files = Array.from(event.target.files);
    files.forEach(file => {
        if (file.type.startsWith('image/')) {
            addUploadedFile(file);
        }
    });
}

function addUploadedFile(file) {
    uploadedFiles.push(file);
    
    const filePreview = document.createElement('div');
    filePreview.className = 'file-preview';
    
    const img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    img.alt = file.name;
    
    const removeBtn = document.createElement('button');
    removeBtn.className = 'file-remove';
    removeBtn.innerHTML = '×';
    removeBtn.onclick = () => removeUploadedFile(file, filePreview);
    
    filePreview.appendChild(img);
    filePreview.appendChild(removeBtn);
    uploadedFilesContainer.appendChild(filePreview);
}

function removeUploadedFile(file, element) {
    const index = uploadedFiles.indexOf(file);
    if (index > -1) {
        uploadedFiles.splice(index, 1);
    }
    element.remove();
}

// 模拟拍照功能
function simulateCamera() {
    // 实际项目中，这里会调用相机API
    alert('拍照功能需要在实际设备上运行');
}

// 开始诊断
function startDiagnosis() {
    const problemText = document.getElementById('problemInput').value.trim();
    
    if (!problemText && uploadedFiles.length === 0) {
        alert('请描述问题或上传图片');
        return;
    }
    
    // 收集用户选择的选项
    const options = {
        expertMode: document.getElementById('expertMode').checked,
        networkMode: document.getElementById('networkMode').checked,
        selectedExperts: Array.from(document.querySelectorAll('input[name="expert"]:checked')).map(cb => cb.value),
        outputMode: document.querySelector('input[name="outputMode"]:checked').value,
        problemText: problemText,
        attachments: uploadedFiles.length
    };
    
    console.log('诊断选项:', options);
    
    // 切换到执行页面
    showPage('executionPage');
    
    // 开始模拟诊断过程
    simulateDiagnosisProcess();
}

// 模拟诊断过程
function simulateDiagnosisProcess() {
    const tasks = [
        { id: 'task1', delay: 1000 },
        { id: 'task2', delay: 2000 },
        { id: 'task3', delay: 3000 },
        { id: 'task4', delay: 4000 }
    ];
    
    tasks.forEach((task, index) => {
        setTimeout(() => {
            const taskElement = document.getElementById(task.id);
            
            // 移除之前的任务状态
            if (index > 0) {
                const prevTask = document.getElementById(tasks[index - 1].id);
                prevTask.classList.remove('active');
                prevTask.classList.add('completed');
                prevTask.querySelector('.progress-status').innerHTML = '<i class="fas fa-check"></i>';
            }
            
            // 设置当前任务为活跃状态
            taskElement.classList.add('active');
            
            // 如果是最后一个任务，完成后显示结果
            if (index === tasks.length - 1) {
                setTimeout(() => {
                    taskElement.classList.remove('active');
                    taskElement.classList.add('completed');
                    taskElement.querySelector('.progress-status').innerHTML = '<i class="fas fa-check"></i>';
                    
                    // 显示诊断结果
                    setTimeout(() => {
                        document.getElementById('executionResult').style.display = 'block';
                    }, 500);
                }, 1500);
            }
        }, task.delay);
    });
}

// 页面切换
function showPage(pageId) {
    pages.forEach(page => {
        page.classList.add('hidden');
    });
    
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.remove('hidden');
        currentPage = pageId;
    }
}

// 导航更新
function updateNavigation(activeItem) {
    navItems.forEach(item => {
        item.classList.remove('active');
    });
    activeItem.classList.add('active');
}

// 查看报告
function viewReport() {
    alert('报告查看功能 - 实际项目中会打开报告详情页面');
}

// 下载报告
function downloadReport() {
    const outputMode = document.querySelector('input[name="outputMode"]:checked').value;
    alert(`正在下载${outputMode.toUpperCase()}格式的报告...`);
}

// 开始新诊断
function startNewDiagnosis() {
    // 重置表单
    document.getElementById('problemInput').value = '';
    document.getElementById('expertMode').checked = false;
    document.getElementById('networkMode').checked = false;
    
    // 清空专家选择
    document.querySelectorAll('input[name="expert"]').forEach(cb => cb.checked = false);
    
    // 重置输出模式为PDF
    document.querySelector('input[name="outputMode"][value="pdf"]').checked = true;
    
    // 清空上传的文件
    uploadedFiles = [];
    uploadedFilesContainer.innerHTML = '';
    
    // 隐藏专家选择区域
    expertSection.style.display = 'none';
    
    // 重置任务状态
    document.querySelectorAll('.progress-item').forEach(item => {
        item.classList.remove('active', 'completed');
        item.querySelector('.progress-status').innerHTML = '<i class="fas fa-clock"></i>';
    });
    
    // 隐藏执行结果
    document.getElementById('executionResult').style.display = 'none';
    
    // 返回诊断页面
    showPage('diagnosisPage');
    updateNavigation(document.querySelector('.nav-item[data-page="diagnosisPage"]'));
}

// 清空历史记录
function clearHistory() {
    if (confirm('确定要清空所有历史记录吗？')) {
        const historyList = document.getElementById('historyList');
        historyList.innerHTML = '<div class="empty-state">暂无历史记录</div>';
    }
}

// 加载历史数据（模拟）
function loadHistoryData() {
    // 实际项目中，这里会从服务器加载数据
    const historyList = document.getElementById('historyList');
    
    // 为历史记录项添加事件监听器
    const historyItems = historyList.querySelectorAll('.history-item');
    historyItems.forEach(item => {
        const viewBtn = item.querySelector('.history-btn:first-child');
        const actionBtn = item.querySelector('.history-btn:last-child');
        
        viewBtn.addEventListener('click', () => {
            alert('查看历史诊断详情');
        });
        
        actionBtn.addEventListener('click', (e) => {
            const icon = e.target.closest('button').querySelector('i');
            if (icon.classList.contains('fa-download')) {
                alert('下载历史报告');
            } else if (icon.classList.contains('fa-pause')) {
                alert('暂停正在处理的任务');
            }
        });
    });
}

// 专家卡片选择处理
document.addEventListener('change', function(e) {
    if (e.target.name === 'expert') {
        const expertCard = e.target.closest('.expert-card');
        if (e.target.checked) {
            expertCard.style.borderColor = 'var(--accent-primary)';
            expertCard.style.background = 'rgba(99, 102, 241, 0.1)';
        } else {
            expertCard.style.borderColor = 'var(--border)';
            expertCard.style.background = 'var(--bg-secondary)';
        }
    }
});

// 输出模式选择处理
document.addEventListener('change', function(e) {
    if (e.target.name === 'outputMode') {
        const modeCards = document.querySelectorAll('.mode-card');
        modeCards.forEach(card => {
            card.style.borderColor = 'var(--border)';
            card.style.background = 'var(--bg-secondary)';
        });
        
        const selectedCard = e.target.closest('.mode-card');
        selectedCard.style.borderColor = 'var(--accent-primary)';
        selectedCard.style.background = 'rgba(99, 102, 241, 0.1)';
    }
});

// 防止表单默认提交
document.addEventListener('submit', function(e) {
    e.preventDefault();
});

// 添加触摸反馈
document.addEventListener('touchstart', function(e) {
    const target = e.target.closest('button, .checkbox-item, .expert-card, .mode-card, .nav-item');
    if (target) {
        target.style.transform = 'scale(0.98)';
    }
});

document.addEventListener('touchend', function(e) {
    const target = e.target.closest('button, .checkbox-item, .expert-card, .mode-card, .nav-item');
    if (target) {
        setTimeout(() => {
            target.style.transform = '';
        }, 100);
    }
}); 