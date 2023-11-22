const defaultAlamatArray = [
    { nama: 'Alamat 1', alamat: 'Dusun Cinaglang, RT002/RW002, Desa Neglasari, Kecamatan Daramaraja, Kabupaten Sumedang.' }
];

function simpanDataAlamat() {
    localStorage.setItem('data_alamat', JSON.stringify(defaultAlamatArray));
    refreshTabelAlamat();
}

function alamatLihat() {

    const alamatLokal = JSON.parse(localStorage.getItem('data_alamat')) || [];
    const tbody = document.getElementById("tabelAlamat");

    for (let i = 0; i < alamatLokal.length; i++) {
        const alamat = alamatLokal[i];
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${alamat.nama}</td>
            <td>${alamat.alamat}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="hapusAlamat(${i})">  <i class="fas fa-trash-alt"></i></button>
            </td>
        `;
        tbody.appendChild(row);
    }
}

document.getElementById("tambahButton").addEventListener("click", function () {
    const nama = document.getElementById("namaAlamat").value;
    const alamat = document.getElementById("inputAlamat").value;

    if (nama && alamat) {
        const alamatBaru = { nama, alamat };
        defaultAlamatArray.push(alamatBaru);
        
        refreshTabelAlamat();
        $('#tambahAlamat').modal('hide');

        alert("Alamat baru berhasil ditambahkan ke daftar alamat");
    } else {
        alert("Nama dan Alamat tidak boleh kosong.");
    }
});

function hapusAlamat(index) {
    const konfirmasi = confirm("Apakah Anda yakin ingin menghapus data keranjang ini?");

    if (konfirmasi) {
        const data_alamat = JSON.parse(localStorage.getItem('data_alamat')) || [];

        data_alamat.splice(index, 1);

        localStorage.setItem('data_alamat', JSON.stringify(data_alamat));
        refreshTabelAlamat();
    }
}

function refreshTabelAlamat() {
    const tbody = document.getElementById("tabelAlamat");
    tbody.innerHTML = ''; 
    alamatLihat();
}

alamatLihat();