let price = 19.5;
let cid = [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
];


const currencyUnit = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.10,
    "QUARTER": 0.25,
    "ONE": 1.00,
    "FIVE": 5.00,
    "TEN": 10.00,
    "TWENTY": 20.00,
    "ONE HUNDRED": 100.00
};


document.getElementById('price-display').textContent = price.toFixed(2);

document.getElementById('purchase-btn').addEventListener('click', function() {
    const cashInput = document.getElementById('cash');
    const cash = parseFloat(cashInput.value);
    const changeDueElement = document.getElementById('change-due');

    
    if (cash < price) {
        alert("Customer does not have enough money to purchase the item");
        return;
    }

    
    if (cash === price) {
        changeDueElement.textContent = "No change due - customer paid with exact cash";
        return;
    }

    const change = calculateChange(price, cash, cid);
    changeDueElement.textContent = formatChange(change);
});

function calculateChange(price, cash, cid) {
    let changeDue = Math.round((cash - price) * 100) / 100;
    let totalCID = cid.reduce((acc, curr) => acc + curr[1], 0);
    totalCID = Math.round(totalCID * 100) / 100;

    
    if (totalCID < changeDue) {
        return { status: "INSUFFICIENT_FUNDS", change: [] };
    }

    
    if (totalCID === changeDue) {
        return { status: "CLOSED", change: cid };
    }

    
    let drawer = JSON.parse(JSON.stringify(cid)).reverse();
    let change = [];

    
    for (let [denomination, amount] of drawer) {
        let value = currencyUnit[denomination];
        let available = Math.round(amount * 100) / 100;
        let used = 0;

        while (changeDue >= value && available >= value) {
            changeDue = Math.round((changeDue - value) * 100) / 100;
            available -= value;
            used += value;
        }

        if (used > 0) {
            change.push([denomination, Math.round(used * 100) / 100]);
        }
    }

    
    if (changeDue > 0) {
        return { status: "INSUFFICIENT_FUNDS", change: [] };
    }

    return { status: "OPEN", change: change };
}

function formatChange(changeObj) {
    if (changeObj.status === "INSUFFICIENT_FUNDS") {
        return "Status: INSUFFICIENT_FUNDS";
    }

    let formatted = `Status: ${changeObj.status}`;

    if (changeObj.change.length > 0) {
        
        let changeToFormat = changeObj.status === "CLOSED" ? changeObj.change : changeObj.change.sort((a, b) => currencyUnit[b[0]] - currencyUnit[a[0]]);

        changeToFormat.forEach(([denomination, amount]) => {
            if (amount > 0) {
                formatted += ` ${denomination}: $${amount.toFixed(2)}`;
            }
        });
    }

    return formatted;
}
