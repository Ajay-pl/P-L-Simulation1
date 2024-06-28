function updateValues() {
    const avgExposure = parseFloat(document.getElementById('avgExposure').value) || 0;
    const coreIncome = parseFloat(document.getElementById('coreIncome').value) || 0;
    const feeIncome = parseFloat(document.getElementById('feeIncome').value) || 0;
    const financeCost = parseFloat(document.getElementById('financeCost').value) || 0;
    const outsourcingCost = parseFloat(document.getElementById('outsourcingCost').value) || 0;
    const establishmentExpenses = parseFloat(document.getElementById('establishmentExpenses').value) || 0;
    const administrativeExpenses = parseFloat(document.getElementById('administrativeExpenses').value) || 0;
    const depreciationExpenses = parseFloat(document.getElementById('depreciationExpenses').value) || 0;
    const provisionForNPA = parseFloat(document.getElementById('provisionForNPA').value) || 0;
    const badDebtsLOExpense = parseFloat(document.getElementById('badDebtsLOExpense').value) || 0;
    const badDebtsRecovered = parseFloat(document.getElementById('badDebtsRecovered').value) || 0;

    const totalIncome = coreIncome + feeIncome;
    const totalOperatingExpenses = financeCost + outsourcingCost + establishmentExpenses + administrativeExpenses + depreciationExpenses;
    const totalCreditLoss = provisionForNPA + badDebtsLOExpense - badDebtsRecovered;
    const contribution = totalIncome - totalOperatingExpenses - totalCreditLoss;

    document.getElementById('totalIncome').innerText = totalIncome.toFixed(2);
    document.getElementById('totalOperatingExpenses').innerText = totalOperatingExpenses.toFixed(2);
    document.getElementById('totalCreditLoss').innerText = totalCreditLoss.toFixed(2);
    document.getElementById('contribution').innerText = contribution.toFixed(2);

    document.getElementById('avgExposurePercent').innerText = ((avgExposure / avgExposure) * 100).toFixed(1) + '%';
    document.getElementById('coreIncomePercent').innerText = ((coreIncome / avgExposure) * 100).toFixed(1) + '%';
    document.getElementById('feeIncomePercent').innerText = ((feeIncome / avgExposure) * 100).toFixed(1) + '%';
    document.getElementById('totalIncomePercent').innerText = ((totalIncome / avgExposure) * 100).toFixed(1) + '%';
    document.getElementById('financeCostPercent').innerText = ((financeCost / avgExposure) * 100).toFixed(1) + '%';
    document.getElementById('outsourcingCostPercent').innerText = ((outsourcingCost / avgExposure) * 100).toFixed(1) + '%';
    document.getElementById('establishmentExpensesPercent').innerText = ((establishmentExpenses / avgExposure) * 100).toFixed(1) + '%';
    document.getElementById('administrativeExpensesPercent').innerText = ((administrativeExpenses / avgExposure) * 100).toFixed(1) + '%';
    document.getElementById('depreciationExpensesPercent').innerText = ((depreciationExpenses / avgExposure) * 100).toFixed(1) + '%';
    document.getElementById('totalOperatingExpensesPercent').innerText = ((totalOperatingExpenses / avgExposure) * 100).toFixed(1) + '%';
    document.getElementById('provisionForNPAPercent').innerText = ((provisionForNPA / avgExposure) * 100).toFixed(1) + '%';
    document.getElementById('badDebtsLOExpensePercent').innerText = ((badDebtsLOExpense / avgExposure) * 100).toFixed(1) + '%';
    document.getElementById('badDebtsRecoveredPercent').innerText = ((badDebtsRecovered / avgExposure) * 100).toFixed(1) + '%';
    document.getElementById('totalCreditLossPercent').innerText = ((totalCreditLoss / avgExposure) * 100).toFixed(1) + '%';
    document.getElementById('contributionPercent').innerText = ((contribution / avgExposure) * 100).toFixed(1) + '%';

    updateWaterfallChart(totalIncome, totalOperatingExpenses, totalCreditLoss, contribution);
}

function updateWaterfallChart(totalIncome, totalOperatingExpenses, totalCreditLoss, contribution) {
    const ctx = document.getElementById('waterfallChart').getContext('2d');

    const data = {
        labels: ['Total Income', 'Total Operating Expenses', 'Total Credit Loss', 'Contribution'],
        datasets: [{
            label: 'P&L Components',
            data: [totalIncome, -totalOperatingExpenses, -totalCreditLoss, contribution],
            backgroundColor: ['#4caf50', '#f44336', '#ff9800', '#2196f3'],
        }]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };

    if (window.myBar) {
        window.myBar.destroy();
    }
    window.myBar = new Chart(ctx, config);
}

window.onload = function() {
    updateValues();
};
