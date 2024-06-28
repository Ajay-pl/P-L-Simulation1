function updateValues() {
    const avgExposure = parseFloat(document.getElementById('avgExposure').value);
    const coreIncome = parseFloat(document.getElementById('coreIncome').value);
    const feeIncome = parseFloat(document.getElementById('feeIncome').value);
    const financeCost = parseFloat(document.getElementById('financeCost').value);
    const outsourcingCost = parseFloat(document.getElementById('outsourcingCost').value);
    const establishmentExpenses = parseFloat(document.getElementById('establishmentExpenses').value);
    const administrativeExpenses = parseFloat(document.getElementById('administrativeExpenses').value);
    const depreciationExpenses = parseFloat(document.getElementById('depreciationExpenses').value);
    const provisionForNPA = parseFloat(document.getElementById('provisionForNPA').value);
    const badDebtsLOExpense = parseFloat(document.getElementById('badDebtsLOExpense').value);
    const badDebtsRecovered = parseFloat(document.getElementById('badDebtsRecovered').value);

    const totalIncome = coreIncome + feeIncome;
    const totalOperatingExpenses = financeCost + outsourcingCost + establishmentExpenses + administrativeExpenses + depreciationExpenses;
    const totalCreditLoss = provisionForNPA + badDebtsLOExpense - badDebtsRecovered;
    const contribution = totalIncome - totalOperatingExpenses - totalCreditLoss;

    document.getElementById('totalIncome').innerText = totalIncome.toFixed(2);
    document.getElementById('totalIncomePercent').innerText = ((totalIncome / avgExposure) * 100).toFixed(1) + '%';

    document.getElementById('coreIncomePercent').innerText = ((coreIncome / avgExposure) * 100).toFixed(1) + '%';
    document.getElementById('feeIncomePercent').innerText = ((feeIncome / avgExposure) * 100).toFixed(1) + '%';
    document.getElementById('financeCostPercent').innerText = ((financeCost / avgExposure) * 100).toFixed(1) + '%';
    document.getElementById('outsourcingCostPercent').innerText = ((outsourcingCost / avgExposure) * 100).toFixed(1) + '%';
    document.getElementById('establishmentExpensesPercent').innerText = ((establishmentExpenses / avgExposure) * 100).toFixed(1) + '%';
    document.getElementById('administrativeExpensesPercent').innerText = ((administrativeExpenses / avgExposure) * 100).toFixed(1) + '%';
    document.getElementById('depreciationExpensesPercent').innerText = ((depreciationExpenses / avgExposure) * 100).toFixed(1) + '%';

    document.getElementById('totalOperatingExpenses').innerText = totalOperatingExpenses.toFixed(2);
    document.getElementById('totalOperatingExpensesPercent').innerText = ((totalOperatingExpenses / avgExposure) * 100).toFixed(1) + '%';

    document.getElementById('provisionForNPAPercent').innerText = ((provisionForNPA / avgExposure) * 100).toFixed(1) + '%';
    document.getElementById('badDebtsLOExpensePercent').innerText = ((badDebtsLOExpense / avgExposure) * 100).toFixed(1) + '%';
    document.getElementById('badDebtsRecoveredPercent').innerText = ((badDebtsRecovered / avgExposure) * 100).toFixed(1) + '%';

    document.getElementById('totalCreditLoss').innerText = totalCreditLoss.toFixed(2);
    document.getElementById('totalCreditLossPercent').innerText = ((totalCreditLoss / avgExposure) * 100).toFixed(1) + '%';

    document.getElementById('contribution').innerText = contribution.toFixed(2);
    updateChart(totalIncome, totalOperatingExpenses, totalCreditLoss, contribution);
}

function updateChart(totalIncome, totalOperatingExpenses, totalCreditLoss, contribution) {
    const ctx = document.getElementById('waterfallChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Total Income', 'Total Operating Expenses', 'Total Credit Loss', 'Contribution'],
            datasets: [{
                label: 'P&L',
                data: [totalIncome, -totalOperatingExpenses, -totalCreditLoss, contribution],
                backgroundColor: ['#4caf50', '#f44336', '#f44336', '#2196f3']
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

window.onload = updateValues;
