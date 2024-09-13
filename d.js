form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form inputs
    const itempurchased = item.value;
    const quantitypurchased = Number(quantity.value); // Ensure it's a number
    const pricepurchased = Number(price.value); // Ensure it's a number
    const GSTpurchased = Number(GST.value); // Ensure it's a number, GST as a percentage

    // Create input elements for invoice table
    const item_input = createInputElement(itempurchased);
    const quantity_input = createInputElement(quantitypurchased);
    const price_input = createInputElement(pricepurchased);

    // Calculate GST per item and total price
    const GSTAmount = (pricepurchased * quantitypurchased * GSTpurchased) / 100; // GST calculation
    const totalPrice = (pricepurchased * quantitypurchased) + GSTAmount;

    // Create input elements for GST and Total Price
    const GST_input = createInputElement(GSTAmount.toFixed(2)); // Two decimal places for currency
    const Total_input = createInputElement(totalPrice.toFixed(2));

    // Append values to table
    td1.appendChild(item_input);
    td2.appendChild(quantity_input);
    td3.appendChild(price_input);
    td4.appendChild(GST_input);
    td5.appendChild(Total_input);

    // Update the total amounts for the invoice
    updateTotalAmount();
});

function updateTotalAmount() {
    const totalprices = document.querySelectorAll('.totalpc');
    
    // Calculate sum of all items' total prices
    const sum = Array.from(totalprices).reduce((total, input) => {
        return total + parseFloat(input.value);
    }, 0);
    
    // Tax can be a fixed value or calculated based on some conditions
    const tax = 75; // Adjust this according to your needs
    
    // Final amount after adding the fixed or calculated tax
    const finalAmount = sum + tax;

    // Update the total price and final amount in the invoice
    ta.textContent = sum.toFixed(2); // Show total amount with 2 decimals
    tx.textContent = tax.toFixed(2); // Show tax
    fp.textContent = finalAmount.toFixed(2); // Final price after tax
}

// Utility function to create a read-only input element
function createInputElement(value) {
    const input = document.createElement("input");
    input.classList.add("text");
    input.type = "text";
    input.style.color = "black";
    input.style.backgroundColor = "light salmon";
    input.style.fontSize = "12px";
    input.style.border = "none";
    input.value = value;
    input.setAttribute("readonly", "readonly");
    return input;
}

// Download the invoice as PDF
dwn.addEventListener('click', () => {
    const clone = inpdf.cloneNode(true);

    const inputs = clone.querySelectorAll('input');
    inputs.forEach(input => {
        const para = document.createElement('p');
        para.textContent = input.value;
        input.parentNode.replaceChild(para, input);
    });

    const opt = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: 'invoice.pdf',
        image: { type: 'png', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().from(clone).set(opt).save();
});
