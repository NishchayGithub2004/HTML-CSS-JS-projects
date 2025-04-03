let pieChart;

function updateDownpayment() {
    const principal = parseFloat(document.getElementById("principal").value);
    
    const percentage = parseFloat(document.getElementById("downpayment-percentage").value) || 0;
  
    if (principal && percentage >= 0 && percentage < 100) {
        const downpayment = (percentage / 100) * principal;
        document.getElementById("downpayment").value = downpayment.toFixed(2);
    }
    
    else {
        document.getElementById("downpayment").value = "";
        
        if (percentage === 100) {
            alert("Down payment cannot be 100% of the principal amount.");
        }
    }
}

function updatePercentage() {
    const principal = parseFloat(document.getElementById("principal").value);
    
    const downpayment = parseFloat(document.getElementById("downpayment").value) || 0;

    if (principal && downpayment >= 0) {
        const percentage = (downpayment / principal) * 100;
        document.getElementById("downpayment-percentage").value = percentage.toFixed(2);
    } 
    
    else {
        document.getElementById("downpayment-percentage").value = "";
    }
}

function calculateMortgage() {
    const principal = parseFloat(document.getElementById("principal").value);
    
    const downpayment = parseFloat(document.getElementById("downpayment").value) || 0;
    
    const interestRate = parseFloat(document.getElementById("interest").value);
    
    const years = parseInt(document.getElementById("years").value);
    
    const extraPayment = parseFloat(document.getElementById("extra-payment").value) || 0;

    if (!principal || !interestRate || !years) {
        alert("Please fill in all fields with valid numbers.");
        return;
    }

    if (downpayment >= principal) {
        alert("Down payment cannot be greater than or equal to the principal amount.");
        return;
    }

    if (extraPayment >= principal - downpayment) {
        alert("Extra payment cannot be greater than or equal to the remaining loan amount.");
        return;
    }

    if (interestRate <= 0 || interestRate >= 100) {
        alert("Interest rate must be greater than 0 and less than 100.");
        return;
    }

    const monthlyInterestRate = interestRate / 100 / 12;
    
    const loanAmount = principal - downpayment;
    
    let remainingBalance = loanAmount;
    
    const monthlyPayments = years * 12;
    
    let monthlyPayment = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -monthlyPayments));

    let totalInterest = 0;
  
    let totalMonths = 0;

    while (remainingBalance > 0 && totalMonths < monthlyPayments) {
        totalMonths++;
        
        const interestPayment = remainingBalance * monthlyInterestRate;
        
        let principalPayment = monthlyPayment - interestPayment;

        if (remainingBalance < principalPayment + extraPayment) {
            principalPayment = remainingBalance;
            remainingBalance = 0;
        } 
        
        else {
            remainingBalance -= principalPayment + extraPayment;
        }

        totalInterest += interestPayment;
    }

    document.getElementById("monthly-payment").innerText = (monthlyPayment + extraPayment).toFixed(2);
    
    document.getElementById("total-emi").innerText = totalMonths;
    
    document.getElementById("total-principal").innerText = loanAmount.toFixed(2);
    
    document.getElementById("total-interest").innerText = totalInterest.toFixed(2);
    
    drawPieChart(totalInterest, loanAmount);
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("principal").addEventListener("input", function () {
        const principal = parseFloat(this.value);
        
        const downpayment = parseFloat(document.getElementById("downpayment").value) || 0;
        
        const percentage = parseFloat(document.getElementById("downpayment-percentage").value) || 0;

        if (principal && downpayment && percentage >= 0 && percentage < 100) {
            const newDownpayment = (percentage / 100) * principal;
            
            document.getElementById("downpayment").value = newDownpayment.toFixed(2);
        }
    });

    document.getElementById("downpayment-percentage").addEventListener("input", updateDownpayment);
});

function drawPieChart(totalInterest, totalPrincipal) {
    const ctx = document.getElementById("pie-chart").getContext("2d");

    if (pieChart) {
        pieChart.destroy();
    }

    pieChart = new Chart(ctx, {
        type: "pie",
        
        data: {
            labels: ["Principal", "Interest"],
            
            datasets: [
                {
                    label: "Mortgage Breakdown",
                    data: [totalPrincipal, totalInterest],
                    backgroundColor: ["#9EDDFF", "#6499E9"],
                    borderColor: "#fff",
                    borderWidth: 1,
                },
            ],
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,
        },
    });
}

function clearFields() {
    document.getElementById("principal").value = "";
    document.getElementById("downpayment").value = "";
    document.getElementById("downpayment-percentage").value = "";
    document.getElementById("interest").value = "";
    document.getElementById("years").value = 30;
    document.getElementById("extra-payment").value = "";
    document.getElementById("monthly-payment").innerText = "0.00";
    document.getElementById("total-emi").innerText = "0";
    document.getElementById("total-principal").innerText = "0.00";
    document.getElementById("total-interest").innerText = "0.00";
  
    if (pieChart) {
        pieChart.destroy();
    }
  
    const ctx = document.getElementById("pie-chart").getContext("2d");
    
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}