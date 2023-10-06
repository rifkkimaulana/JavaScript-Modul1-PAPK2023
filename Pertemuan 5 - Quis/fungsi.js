var mobilList = [];

function tampilkanDaftarMobil() {
  var ul = document.getElementById("listMobil");
  ul.innerHTML = "";

  mobilList.forEach(function (mobil, index) {
    var li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
    ${mobil}
    <button class="btn btn-danger" onclick="hapusMobil(${index})">Hapus</button>
  `;
    ul.appendChild(li);
  });
}

function tambahMobil() {
  var carName = document.getElementById("carName").value;
  mobilList.push(carName);
  tampilkanDaftarMobil();
  document.getElementById("carName").value = "";
}

function hapusMobil(index) {
  mobilList.splice(index, 1);
  tampilkanDaftarMobil();
}

tampilkanDaftarMobil();
