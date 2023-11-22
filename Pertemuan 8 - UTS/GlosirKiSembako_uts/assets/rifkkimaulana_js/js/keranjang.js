function formatCurrency(value) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
}

function refreshTampilanKeranjang() {
    const data_keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];
    const datakeranjangelement = document.getElementById("data_keranjang");
    const total_harga = document.getElementById("total_harga");

    datakeranjangelement.innerHTML = '';

    for (let i = 0; i < data_keranjang.length; i++) {
        const item = data_keranjang[i];
        const row = document.createElement("tr");
        row.innerHTML = `
            <th scope="row">${i + 1}</th>
            <td>${item.nama_produk}</td>
            <td>${item.jumlah_beli}</td>
            <td>${formatCurrency(item.harga_produk)}</td>
            <td style="text-center">
                <button class="btn btn-warning btn-sm" onclick="editItemKeranjang(${i})">
                    <i class="fas fa-edit"></i> 
                </button>
                <button class="btn btn-danger btn-sm" onclick="hapusItemKeranjang(${i})">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </td>
            
        `;
        datakeranjangelement.appendChild(row);
    }

    perbaharuiTotalHarga();
}

function editItemKeranjang(index) {
    const data_keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];
    
    const produk = data_keranjang[index];

    const inputNamaProduk = document.getElementById("inputNamaProduk");
    const inputJumlahBeli = document.getElementById("inputJumlahBeli");
    const inputHargaProduk = document.getElementById("inputHargaProduk");

    inputNamaProduk.value = produk.nama_produk;
    inputJumlahBeli.value = produk.jumlah_beli;
    inputHargaProduk.value = produk.harga_produk;

    const formEdit = document.getElementById("formEdit");
    formEdit.setAttribute("data-indeks", index);

    const modalEdit = new bootstrap.Modal(document.getElementById('modalEdit'));
    modalEdit.show();
}


document.addEventListener("DOMContentLoaded", function () {
    const formEdit = document.getElementById("formEdit");
    formEdit.addEventListener("submit", function (event) {
        event.preventDefault();
        const index = formEdit.dataset.indeks;

        const data_keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];
    
        const produk = data_keranjang[index];
    
        const inputJumlahBeli = document.getElementById("inputJumlahBeli");
        const inputHargaProduk = document.getElementById("inputHargaProduk");
    
        produk.jumlah_beli = inputJumlahBeli.value;
        produk.harga_produk = inputHargaProduk.value;
    
        localStorage.setItem('keranjang', JSON.stringify(data_keranjang));
    
        document.getElementById('modalEdit').style.display = 'none';
        document.body.classList.remove('modal-open');
        document.getElementsByClassName('modal-backdrop')[0].style.display = 'none';
    
        alert('Data berhasil diperbaharui');

        refreshTampilanKeranjang();
    });
});

const diskonArray = [
    { nama: "Pilih Voucher", potongan: 0 },
    { nama: "Potongan Harga 10%", potongan: 10 },
    { nama: "Potongan Harga 7%", potongan: 7 }
];
  
const diskonOption = document.getElementById("diskonOption");

diskonArray.forEach((diskon) => {
const option = document.createElement("option");
option.value = diskon.potongan;
option.text = diskon.nama;
diskonOption.add(option);
});

function perbaharuiTotalHarga() {
    const data_keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];
    const totalHargaElement = document.getElementById("total_harga");
    const totalPesananElement = document.getElementById("total_pesanan");
    const diskonOption = document.getElementById("diskonOption");

    diskonOption.addEventListener("change", function () {
        perbaharuiTotalHarga();
    });

    const hematInfoElement = document.getElementById("hematInfo");

    let total_harga = 0;

    for (let i = 0; i < data_keranjang.length; i++) {
        const item = data_keranjang[i];
        total_harga += item.jumlah_beli * item.harga_produk;
    }

    totalHargaElement.innerText = formatCurrency(total_harga);

    const selectedDiskon = diskonArray.find(diskon => diskon.potongan === parseInt(diskonOption.value));
    const diskon = selectedDiskon ? selectedDiskon.potongan : 0;

    const berhemat = total_harga * diskon / 100;
    hematInfoElement.innerText = `RP. ${formatCurrency(berhemat)}`;

    const total_pembayaran = total_harga - berhemat;

    totalPesananElement.innerText = formatCurrency(total_pembayaran);
}


function hapusItemKeranjang(index) {
    const konfirmasi = confirm("Apakah Anda yakin ingin menghapus data keranjang ini?");

    if (konfirmasi) {
        const data_keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];

        data_keranjang.splice(index, 1);

        localStorage.setItem('keranjang', JSON.stringify(data_keranjang));

        refreshTampilanKeranjang();
    }
}