let Btn = document.getElementById('save');
let table = document.getElementById('Table_Value');
let btnAdd = document.getElementById('btnAdd');
let frmInput = document.getElementById('finput');

let currentEditRow = null;

function getValue() {
    return {
        ID: document.getElementById('id').value,
        NAME: document.getElementById('name').value,
        PRICE: document.getElementById('price').value,
        QUANTITY: document.getElementById('quantity').value,
        PHOTO: document.getElementById('photo').files[0]
    };
}

btnAdd.addEventListener('click', () => {
    frmInput.style.display = 'flex';
    Btn.textContent = "Save";
    currentEditRow = null;

    document.getElementById('id').value = '';
    document.getElementById('name').value = '';
    document.getElementById('price').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('photo').value = '';
});

Btn.addEventListener('click', function (e) {
    e.preventDefault();
    let data = getValue();

    // ======= Editing Mode ==========
    if (currentEditRow) {
    currentEditRow.cells[0].innerText = data.ID;
    currentEditRow.cells[1].innerText = data.NAME;
    currentEditRow.cells[2].innerText = data.PRICE;
    currentEditRow.cells[3].innerText = data.QUANTITY;

    if (data.PHOTO) {
        const rowToEdit = currentEditRow; 
        let reader = new FileReader();
        reader.onload = function (event) {
            rowToEdit.cells[4].innerHTML = `<img src="${event.target.result}" style="width: 50px; height: 50px;">`;
        };
        reader.readAsDataURL(data.PHOTO);
    }

    frmInput.style.display = 'none';
    Btn.textContent = "Save";
    currentEditRow = null;
    return;
}


    // =========== Add New =============
    if (data.PHOTO) {
        let reader = new FileReader();
        reader.onload = function (event) {
            let imgSrc = event.target.result;
            let txt = `
                <tr> 
                    <td>${data.ID}</td>
                    <td>${data.NAME}</td>
                    <td>${data.PRICE}</td>
                    <td>${data.QUANTITY}</td>  
                    <td><img src="${imgSrc}" style="width: 50px; height: 50px;"></td>
                    <td>
                        <button class="p-2 btn btn-info edit">Edit</button>
                        <button class="p-2 btn btn-danger delete">Delete</button>
                    </td>
                </tr>
            `;
            table.insertAdjacentHTML('beforeend', txt);
            frmInput.style.display = 'none';
        };
        reader.readAsDataURL(data.PHOTO);
    } else {
        let txt = `
            <tr> 
                <td>${data.ID}</td>
                <td>${data.NAME}</td>
                <td>${data.PRICE}</td>
                <td>${data.QUANTITY}</td>  
                <td>No Image</td>
                <td>
                    <button class="p-2 btn btn-info edit">Edit</button>
                    <button class="p-2 btn btn-danger delete">Delete</button>
                </td>
            </tr>
        `;
        table.insertAdjacentHTML('beforeend', txt);
        frmInput.style.display = 'none';
    }
});

table.addEventListener('click', (e) => {
    let btn = e.target;

    if (btn.classList.contains("edit")) {
        currentEditRow = btn.closest('tr');
        const cells = currentEditRow.querySelectorAll('td');

        document.getElementById('id').value = cells[0].innerText;
        document.getElementById('name').value = cells[1].innerText;
        document.getElementById('price').value = cells[2].innerText;
        document.getElementById('quantity').value = cells[3].innerText;
        document.getElementById('photo').value = '';
        frmInput.style.display = 'flex';
        Btn.textContent = "Update";
    }

    if (btn.classList.contains("delete")) {
        if (confirm("Are you sure?")) {
            btn.closest('tr').remove();
        }
    }
});
