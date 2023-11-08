function tampilanCardMobil() {
  var mobil = [
    {
      id: 1,
      merek: "Toyota",
      model: "Camry",
      warna: "Merah",
      tahun: 2022,
      harga: 200000,
    },
    {
      id: 2,
      merek: "Honda",
      model: "Accord",
      warna: "Hitam",
      tahun: 2023,
      harga: 200000,
    },
    {
      id: 3,
      merek: "Ford",
      model: "Mustang",
      warna: "Biru",
      tahun: 2021,
      harga: 200000,
    },
  ];

  var carListContainer = document.getElementById("carList");

  mobil.forEach(function (car) {
    document.write('<div class="card mb-3">');
    document.write('<div class="card-body">');
    document.write(
      '<h5 class="card-title">' + car.merek + " " + car.model + "</h5>"
    );
    document.write(
      '<p class="card-text">Harga: Rp. ' + car.harga + "/hari</p>"
    );
    document.write(
      '<button class="btn btn-primary" onclick="OpenPesanModal(' +
        car.id +
        ')">Pesan Sekarang</button>'
    );
    document.write("</div></div>");

    document.write(`
    <div class="modal fade" id="pesanModal${
      car.id
    }" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="editModalLabel">Cekout Pesanan</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                <form method="GET" action="./cekout.html">
                    <input type="hidden" name="namaMobil" value="${
                      car.merek + " " + car.model
                    }">
                    <div class="form-group">
                        <label for="nama">Nama:</label>
                        <input type="text" class="form-control" id="nama" name="nama" required>
                    </div>
                    <div class="form-group">
                        <label for="alamat">Alamat:</label>
                        <textarea class="form-control" id="alamat" name="alamat" rows="3" required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="nomorhp">Nomor Telepon:</label>
                        <input type="tel" class="form-control" id="nomorhp" name="nomorhp" required>
                    </div>
                    <div class="form-group">
                        <label for="tanggalPesan">Tanggal Pesan:</label>
                        <input type="date" class="form-control" id="tanggalPesan" name="tanggalPesan" required>
                    </div>
                    <div class="form-group">
                        <label for="catatan">Catatan Tambahan:</label>
                        <textarea class="form-control" id="catatan" name="catatan" rows="3"></textarea>
                    </div>
                    <input type="hidden" name="idMobil" value="1">
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-success">Proses Pesanan!</button>
                    </div>
                </div>
                </form>

            </div>
        </div>
    </div>
`);
  });
}

window.OpenPesanModal = function (id) {
  var modalId = "#pesanModal" + id;
  $(modalId).modal("show");
};

tampilanCardMobil();
