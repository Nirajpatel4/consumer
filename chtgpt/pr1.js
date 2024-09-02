// script.js

const { jsPDF } = window.jspdf;

function calculate() {
    const buyingPrice = parseFloat(document.getElementById('buying-price').value);
    const sellingPrice = parseFloat(document.getElementById('selling-price').value);
    const quantity = parseInt(document.getElementById('quantity').value, 10);

    if (isNaN(buyingPrice) || isNaN(sellingPrice) || isNaN(quantity) || quantity <= 0) {
        alert("Please enter valid numbers for all fields.");
        return;
    }

    const totalBuyingPrice = buyingPrice * quantity;
    const totalSellingPrice = sellingPrice * quantity;
    const profitLoss = totalSellingPrice - totalBuyingPrice;

    const resultText = profitLoss >= 0 ? 
        `Profit: $${profitLoss.toFixed(2)}` : 
        `Loss: $${Math.abs(profitLoss).toFixed(2)}`;

    document.getElementById('profit-loss').innerText = resultText;
    document.getElementById('download-pdf').style.display = 'block';
}

document.getElementById('download-pdf').addEventListener('click', function() {
    const doc = new jsPDF();
    const buyingPrice = document.getElementById('buying-price').value;
    const sellingPrice = document.getElementById('selling-price').value;
    const quantity = document.getElementById('quantity').value;
    const profitLoss = document.getElementById('profit-loss').innerText;

    doc.text(`Buying Price per Unit: $${buyingPrice}`, 10, 10);
    doc.text(`Selling Price per Unit: $${sellingPrice}`, 10, 20);
    doc.text(`Quantity: ${quantity}`, 10, 30);
    doc.text(`Total Buying Price: $${(buyingPrice * quantity).toFixed(2)}`, 10, 40);
    doc.text(`Total Selling Price: $${(sellingPrice * quantity).toFixed(2)}`, 10, 50);
    doc.text(`Result: ${profitLoss}`, 10, 60);
    doc.save('profit-loss-report.pdf');
});
