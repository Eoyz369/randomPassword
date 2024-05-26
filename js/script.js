const lang = {
    en: {
        title: "Random Password Generator",
        lengthLabel: "Password Length:",
        lowercaseLabel: "Include Lowercase Letters (a..z):",
        uppercaseLabel: "Include Uppercase Letters (A..Z):",
        numbersLabel: "Include Numbers (0..9):",
        symbolsLabel: "Include Special Characters:",
        generateButton: "Generate Password",
        historyTitle: "History",
        copyButton: "Copy",
        deleteButton: "Delete",
        clearHistoryButton: "Clear History",
        toggleLanguageButton: "切换语言"
    },
    cn: {
        title: "随机密码生成器",
        lengthLabel: "密码长度:",
        lowercaseLabel: "包含小写字母(a..z):",
        uppercaseLabel: "包含大写字母(A..Z):",
        numbersLabel: "包含数字(0..9):",
        symbolsLabel: "包含特殊字符:",
        generateButton: "生成密码",
        historyTitle: "历史记录",
        copyButton: "复制",
        deleteButton: "删除",
        clearHistoryButton: "清除历史记录",
        toggleLanguageButton: "Toggle Language"
    }
};

let currentLang = 'cn'; // 默认为中文

document.getElementById('toggleLanguage').addEventListener('click', () => {
    currentLang = currentLang === 'cn' ? 'en' : 'cn';
    updateLanguage();
});

function updateLanguage() {
    const language = lang[currentLang];
    document.getElementById('title').innerText = language.title;
    document.getElementById('lengthLabel').innerText = language.lengthLabel;
    document.getElementById('lowercaseLabel').innerText = language.lowercaseLabel;
    document.getElementById('uppercaseLabel').innerText = language.uppercaseLabel;
    document.getElementById('numbersLabel').innerText = language.numbersLabel;
    document.getElementById('symbolsLabel').innerText = language.symbolsLabel;
    document.getElementById('generateButton').innerText = language.generateButton;
    document.getElementById('historyTitle').innerText = language.historyTitle;
    document.getElementById('clearHistoryButton').innerText = language.clearHistoryButton;
    
    // 更新切换语言按钮的文本
    document.getElementById('toggleLanguage').innerText = language.toggleLanguageButton;

    const copyButtons = document.querySelectorAll('.history-item button:first-child');
    const deleteButtons = document.querySelectorAll('.history-item button:last-child');
    copyButtons.forEach(button => button.innerText = language.copyButton);
    deleteButtons.forEach(button => button.innerText = language.deleteButton);

    const historyItems = document.querySelectorAll('.history-item');
    historyItems.forEach(item => {
        const copyButton = item.children[1]; // 获取第二个子元素，即复制按钮
        if (copyButton) {
            copyButton.innerText = language.copyButton;
        } else {
            console.error("No copy button found in history item:", item);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    updateLanguage(); // 页面加载时更新语言
});

document.getElementById('generateButton').addEventListener('click', generatePassword);

function generatePassword() {
    const length = parseInt(document.getElementById('length').value);
    const includeLowercase = document.getElementById('lowercase').checked;
    const includeUppercase = document.getElementById('uppercase').checked;
    const includeNumbers = document.getElementById('numbers').checked;
    const includeSymbols = document.getElementById('symbols').checked;

    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let charset = '';
    if (includeLowercase) charset += lowercase;
    if (includeUppercase) charset += uppercase;
    if (includeNumbers) charset += numbers;
    if (includeSymbols) charset += symbols;

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    addHistory(password);
}

function addHistory(password) {
    const history = document.getElementById('historyPassword');
    const newItem = document.createElement('div');
    newItem.className = 'history-item';

    const text = document.createElement('span');
    text.textContent = password;

    const copyButton = document.createElement('button');
    copyButton.textContent = lang[currentLang].copyButton;
    copyButton.addEventListener('click', () => {
        navigator.clipboard.writeText(password);
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = lang[currentLang].deleteButton;
    deleteButton.addEventListener('click', () => {
        history.removeChild(newItem);
    });

    newItem.appendChild(text);
    newItem.appendChild(copyButton);
    newItem.appendChild(deleteButton);

    const firstItem = history.firstChild;
    history.insertBefore(newItem, firstItem);
}

document.getElementById('clearHistoryButton').addEventListener('click', clearHistory);

function clearHistory() {
    const historyItems = document.querySelectorAll('.history-item');
    historyItems.forEach(item => {
        item.parentNode.removeChild(item);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    populateLengthOptions();
    updateLanguage();
});

function populateLengthOptions() {
    const lengthSelect = document.getElementById('length');
    for (let i = 6; i <= 36; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        lengthSelect.appendChild(option);
    }
}
