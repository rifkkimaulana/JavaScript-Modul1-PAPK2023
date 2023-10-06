// Variabel Array List Barang
var dataBarang = ["Buku Tulis", "Pensil", "Spidol"];

function showBarang() {
  var listBarang = document.getElementById("listBarang");

  for (let i = 0; i < dataBarang.length; i++) {
    var btnUpdate = "<a href='#' onclick='updateBarang(" + i + ")'>Edit</a>";
    var btnDelete = "<a href='#' onclick='deleteBarang(" + i + ")'>Delete</a>";
    listBarang.innerHTML +=
      "<li>" + dataBarang[i] + " [" + btnUpdate + " | " + btnDelete + "]</li>";
  }
}

function addBarang() {
  var input = document.querySelector("input[name=barang]");
  dataBarang.push(input.value);
  showBarang();
}

function updateBarang(id) {
  var newBarang = prompt("Nama Baru", dataBarang[id]);
  dataBarang[id] = newBarang;
  showBarang();
}

function deleteBarang(id) {
  dataBarang.splice(id, 1);
  showBarang();
}

showBarang();
