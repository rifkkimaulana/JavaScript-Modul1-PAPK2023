const kyglosirproduk = [
    { id_produk: 1, nama_produk: "Beras", harga_produk: 20000, gambar_produk: "./images/produk/beras.jpg" },
    { id_produk: 2, nama_produk: "Garam", harga_produk: 5000, gambar_produk: "./images/produk/garam.jpg" },
    { id_produk: 3, nama_produk: "Gula Aren", harga_produk: 30000, gambar_produk: "./images/produk/gulaaren.jpg" },
    { id_produk: 4, nama_produk: "Kopi Gajah", harga_produk: 1500, gambar_produk: "./images/produk/kopihitamgajah.jpg" },
    { id_produk: 5, nama_produk: "Mie Instan", harga_produk: 3000, gambar_produk: "./images/produk/miecabeijo.jpg" },
    { id_produk: 6, nama_produk: "Minyak Goreng", harga_produk: 47000, gambar_produk: "./images/produk/minyak goreng.jpg" },
    { id_produk: 7, nama_produk: "Susu Kaleng", harga_produk: 15000, gambar_produk: "./images/produk/susukaleng.jpg" },
    { id_produk: 8, nama_produk: "Tepung", harga_produk: 14000, gambar_produk: "./images/produk/tepung.jpg" }
];

const listProduk = document.getElementById("listProduk");

kyglosirproduk.forEach((produk) => {
    const kartuProduk = document.createElement("div");
    kartuProduk.classList.add("col-6", "col-md-4");

    kartuProduk.innerHTML = `
    <div class="card mt-2">
        <img src="${produk.gambar_produk}" class="img-fluid">
        <div class="card-body">
        <h5>${produk.nama_produk}</h5>
        <p>Harga: RP. ${produk.harga_produk}</p>
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text">Jumlah</span>
            </div>
                <input type="number" id="jumlah_beli-${produk.id_produk}" class="form-control" min="1" value="1">
            </div>
        </div>
    
        <div class="card-footer">
            <div class="text-center">
                <button class="btn btn-warning btn-sm"
                    onclick="tambahKeranjang('${produk.id_produk}','${produk.nama_produk}', ${produk.harga_produk}, document.getElementById('jumlah_beli-${produk.id_produk}').value)">Tambah ke
                    Keranjang</button>
            </div>
        </div>
    </div>
    `;

    listProduk.appendChild(kartuProduk);
});

function tambahKeranjang(id_produk, nama_produk, harga_produk, jumlah_beli) {
    const produk = {
        id_produk: id_produk,
        nama_produk: nama_produk,
        harga_produk: harga_produk,
        jumlah_beli: jumlah_beli,
    };

    const datakeranjang = JSON.parse(localStorage.getItem('keranjang')) || [];

    datakeranjang.push(produk);

    localStorage.setItem('keranjang', JSON.stringify(datakeranjang));

    notifikasiTambahKeranjang(nama_produk);
}


function notifikasiTambahKeranjang(nama_produk) {
    const toast = new bootstrap.Toast(document.getElementById('toast'));
    const toastBody = document.getElementById('toastBody');
    toastBody.innerHTML = `${nama_produk} telah ditambahkan ke keranjang belanja. <br> 
    <div class="toast-footer">
        <a href="./keranjang.html" class="btn btn-sm btn-success mt-2 ms-auto">Lihat Keranjang</a>
        </div>`;
    toast.show();
}