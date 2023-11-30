// Routing Halaman Utama yaitu Home
$(document).ready(function () {
  home();
  $("#home").addClass("active");
  $("#katalog").removeClass("active");
  $("#profil").removeClass("active");
});

function home() {
  $.ajax({
    type: "GET",
    url: "home.html",
    data: "data",
    dataType: "html",
    success: function (response) {
      $("#content").html(response);
      $("#home").addClass("active");
      $("#katalog").removeClass("active");
      $("#profil").removeClass("active");
      fetch();
    },
  });
}

function katalog() {
  $.ajax({
    type: "GET",
    url: "katalog.html",
    data: "data",
    dataType: "html",
    success: function (response) {
      $("#content").html(response);
      $("#home").removeClass("active");
      $("#katalog").addClass("active");
      $("#profil").removeClass("active");
      fetch();
    },
  });
}

function profil() {
  $.ajax({
    type: "GET",
    url: "profil.html",
    data: "data",
    dataType: "html",
    success: function (response) {
      $("#content").html(response);
      $("#home").removeClass("active");
      $("#katalog").removeClass("active");
      $("#profil").addClass("active");
    },
  });
}

// Sweat allert Info Aplikasi
sweetalert2;
function info() {
  Swal.fire({
    title: "Info",
    text: "Apps Toko Online v.1.0",
    icon: "info",
    confirmButtonText: "Tutup",
    confirmButtonColor: "#3085d6",
  });
}

// Get data from api
function fetch() {
  $.ajax({
    type: "GET",
    url: "http://localhost/api_toko_online/produk/list?search=" + $("#search").val(),
    dataType: "JSON",
    success: function (response) {
      $("#load_data").html("");
      if (response.status) {
        let card_data = "";
        $.each(response.data, function (i, v) {
          card_data += ` <a class="product-items w-50 flex-column" href="#">
            <div class="product-cover mb-2" style="background-image: url('${v.img}');"></div>
            <p class="bodytext1 semibold m-0 px-2 text-secondary">${v.nama}</p>
            <p class="bodytext2 color-black300 m-0 px-2">${v.deskripsi.substring(0, 40)}</p>
            <p class="caption m-0 py-1 px-2 text-primary">Rp. ${numFormat(v.harga)}</p>
            </a>`;
          $("#load_data").html(card_data);
        });
      } else {
        $("#load_data").html(
          '<div class="col-12 text-center"><h4 class="text-danger">Oops, barang yang anda cari tidak di temukan</h4></div>'
        );
      }
    },
  });
}

// Format Currency
function numFormat(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
