function convertToRoman(num) {
    const romanNumerals = [
        { value: 1000, symbol: 'M' },
        { value: 900, symbol: 'CM' },
        { value: 500, symbol: 'D' },
        { value: 400, symbol: 'CD' },
        { value: 100, symbol: 'C' },
        { value: 90, symbol: 'XC' },
        { value: 50, symbol: 'L' },
        { value: 40, symbol: 'XL' },
        { value: 10, symbol: 'X' },
        { value: 9, symbol: 'IX' },
        { value: 5, symbol: 'V' },
        { value: 4, symbol: 'IV' },
        { value: 1, symbol: 'I' }
    ];

    let result = '';
    for (const { value, symbol } of romanNumerals) {
        while (num >= value) {
            result += symbol;
            num -= value;
        }
    }
    return result;
}

document.getElementById('convert-btn').addEventListener('click', convertHandler);
document.getElementById('number').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        convertHandler();
    }
});

function convertHandler() {
    const inputValue = document.getElementById('number').value.trim();
    const output = document.getElementById('output');

    // Clear output for a clean state
    output.textContent = '';

    // Validate input
    if (!inputValue) {
        output.textContent = 'Please enter a valid number';
        return;
    }

    const num = parseInt(inputValue, 10);

    if (isNaN(num)) {
        output.textContent = 'Please enter a valid number';
        return;
    }

    if (num < 1) {
        output.textContent = 'Please enter a number greater than or equal to 1';
        return;
    }

    if (num > 3999) {
        output.textContent = 'Please enter a number less than or equal to 3999';
        return;
    }

    // Convert and display Roman numeral
    const romanNumeral = convertToRoman(num);
    output.textContent = romanNumeral;
}
