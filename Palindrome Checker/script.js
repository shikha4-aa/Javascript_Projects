function isPalindrome(str) {
    
    const cleanStr = str.toLowerCase().replace(/[\W_]/g, '');
    
    
    if (cleanStr === '') {
        return false;
    }
    
    
    const reversedStr = cleanStr.split('').reverse().join('');
    return cleanStr === reversedStr;
}

document.getElementById('check-btn').addEventListener('click', function() {
    const input = document.getElementById('text-input').value;
    const result = document.getElementById('result');

    if (!input) {
        alert('Please input a value');
        return;
    }

    const isPal = isPalindrome(input);
    result.textContent = `${input} is ${isPal ? 'a' : 'not a'} palindrome`;
});

// Handle Enter key
document.getElementById('text-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.getElementById('check-btn').click();
    }
});