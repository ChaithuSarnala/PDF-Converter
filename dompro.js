
const body = document.querySelector(".input_form")
const inpdf = document.querySelector(".invoice-container")
const form = document.querySelector(".new_data-input");


const item = document.querySelector("#item");
const quantity = document.querySelector("#quantity");
const price = document.querySelector("#price");
const GST = document.querySelector("#gst");
const Name = document.querySelector("#name");
const Mobile = document.querySelector("#mobile");
const GSTIN = document.querySelector("#tin");
const Invoice = document.querySelector("#invo");
const date = document.querySelector("#date");
const Method = document.querySelector("#payment");

const inn = document.querySelector("#inn");
const gn = document.querySelector("#gn");
const sd = document.querySelector("#sd");

const sum = document.querySelector("#sum");
const tax = document.querySelector("#tax");
const fp = document.querySelector("#fp");

const tab=document.querySelector('.my_items');

const dwn = document.querySelector('.downbtn');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const invoice_num = Invoice.value;
    const gstindata = GSTIN.value;
    const sold_date = date.value;

    if (!inn.hasChildNodes()) {
        const invoice_input = document.createElement('input');
        invoice_input.value = invoice_num;
        invoice_input.setAttribute('readonly', 'readonly');
        inn.appendChild(invoice_input);

    }
    if (!gn.hasChildNodes()) {
        const gstin_input = document.createElement('input');
        gstin_input.value = gstindata;
        gstin_input.setAttribute('readonly', 'readonly');
        gn.appendChild(gstin_input);

    }
    if (!sd.hasChildNodes()) {
        const solddate_input = document.createElement('input');
        solddate_input.value = sold_date;
        solddate_input.setAttribute('readonly', 'readonly');
        sd.appendChild(solddate_input);

    }

});


form.addEventListener("submit", (e) => {
    e.preventDefault();

    const itempurchased = item.value;
    const quantitypurchased = quantity.value;
    const pricepurchased = price.value;
    const GSTpurchased = GST.value;

    const item_input = document.createElement("input");
    item_input.classList.add("item_input");
    item_input.value = itempurchased;
    item_input.type = "text";
    item_input.style.color = "black";
    item_input.style.backgroundColor = "light salmon";
    item_input.style.fontSize = "12px";
    item_input.style.border = "none";
    item_input.setAttribute("readonly", "readonly");



    const quantity_input = document.createElement("input");
    quantity_input.classList.add("Quantity_input");
    quantity_input.value = quantitypurchased;
    quantity_input.type = "text";
    quantity_input.style.color = "black";
    quantity_input.style.backgroundColor = "light salmon";
    quantity_input.style.fontSize = "12px";
    quantity_input.style.border = "none";
    quantity_input.setAttribute("readonly", "readonly");



    const price_input = document.createElement("input");
    price_input.classList.add("price_input");
    price_input.value = pricepurchased;
    price_input.type = "text";
    price_input.style.color = "black";
    price_input.style.backgroundColor = "light salmon";
    price_input.style.fontSize = "12px";
    price_input.style.border = "none";
    price_input.setAttribute("readonly", "readonly");



    const GST_input = document.createElement("input");
    GST_input.classList.add("GST_input");
    GST_input.value = GSTpurchased;
    GST_input.type = "text";
    GST_input.style.color = "black";
    GST_input.style.backgroundColor = "light salmon";
    GST_input.style.fontSize = "12px";
    GST_input.style.border = "none";
    GST_input.value = (Number(quantitypurchased) * Number(pricepurchased) * 0.18);
    GST_input.setAttribute("readonly", "readonly");



    const Total_input = document.createElement("input");
    Total_input.classList.add("totalpc");
    Total_input.type = "text";
    Total_input.style.color = "black";
    Total_input.style.backgroundColor = "light salmon";
    Total_input.style.fontSize = "12px";
    Total_input.style.border = "none";
    Total_input.value = (Number(quantitypurchased) * Number(pricepurchased)) + Number(GST_input.value);
    Total_input.setAttribute("readonly", "readonly");




    td1.appendChild(item_input);
    td2.appendChild(quantity_input);
    td3.appendChild(price_input);
    td4.appendChild(GST_input);
    td5.appendChild(Total_input);

    updateTotalAmount();
});


function updateTotalAmount() {
    const totalprices = document.querySelectorAll('.totalpc');
    const sum = Array.from(totalprices).reduce((total, input) => {
        return total + parseFloat(input.value);
    }, 0);

    const gstInputs = document.querySelectorAll('.GST_input');
    const totalGST = Array.from(gstInputs).reduce((total, input) => {
        return total + parseFloat(input.value);
    }, 0);

    const finalAmount = sum + totalGST;

    ta.textContent = sum;
    tx.textContent = totalGST;
    fp.textContent = finalAmount;
}


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
console.log(window);




