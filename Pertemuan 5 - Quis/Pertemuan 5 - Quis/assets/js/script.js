$(document).ready(function () {
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

  function deleteCar(index) {
    if (confirm("Apakah kamu yakin ingin menghapus mobil terpilih?")) {
      mobil.splice(index, 1);
      renderTableRows();
    }
  }

  function renderTableRows() {
    var tableBody = $("#carTableBody");
    var modalContainer = $("#modalContainer");

    tableBody.empty();
    modalContainer.empty();

    for (var i = 0; i < mobil.length; i++) {
      var car = mobil[i];

      var row = $("<tr>");
      row.append('<th class="text-center">' + car.id + "</th>");
      row.append('<td class="text-center">' + car.merek + "</td>");
      row.append('<td class="text-center">' + car.model + "</td>");
      row.append('<td class="text-center">' + car.warna + "</td>");
      row.append('<td class="text-center">' + car.tahun + "</td>");

      var actions = $('<td class="text-center">');

      actions.append(
        `<button class="btn btn-warning btn-sm ml-1" onclick="openEditModal(${car.id})">Edit</button>`
      );

      actions.append(
        '<button type="button" class="btn btn-danger btn-sm ml-1 delete-btn">Hapus</button>'
      );

      row.append(actions);
      tableBody.append(row);

      var modal = $(`
                    <div class="modal fade" id="editModal${car.id}" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="editModalLabel">Edit Mobil</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <form id="editForm">
                                        <div class="form-group">
                                            <label for="editMerek">Merek:</label>
                                            <input value="${car.merek}" type="text" class="form-control" id="editMerek${car.id}" required />
                                        </div>
                                        <div class="form-group">
                                            <label for="editModel">Model:</label>
                                            <input value="${car.model}" type="text" class="form-control" id="editModel${car.id}" required />
                                        </div>
                                        <div class="form-group">
                                            <label for="editWarna">Warna:</label>
                                            <input value="${car.warna}" type="text" class="form-control" id="editWarna${car.id}" required />
                                        </div>
                                        <div class="form-group">
                                            <label for="editTahun">Tahun:</label>
                                            <input value="${car.tahun}" type="number" class="form-control" id="editTahun${car.id}" required />
                                        </div>
                                        <input type="hidden" id="editIndex${car.id}" value="${i}" />
                                        <button type="button" class="btn btn-primary" onclick="saveEdit(${car.id})">Simpan Perubahan</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                `);

      modalContainer.append(modal);
    }
  }

  $("#carTableBody").on("click", ".delete-btn", function () {
    var index = $(this).closest("tr").index();
    deleteCar(index);
  });

  window.openEditModal = function (id) {
    var modalId = "#editModal" + id;
    $(modalId).modal("show");
  };

  window.saveEdit = function (id) {
    var index = $("#editIndex" + id).val();
    mobil[index].merek = $("#editMerek" + id).val();
    mobil[index].model = $("#editModel" + id).val();
    mobil[index].warna = $("#editWarna" + id).val();
    mobil[index].tahun = $("#editTahun" + id).val();
    $(`#editModal${id}`).modal("hide");

    $("body").removeClass("modal-open");
    $(".modal-backdrop").remove();

    renderTableRows();
  };

  window.saveAdd = function () {
    var newCar = {
      id: mobil.length + 1,
      merek: $("#addMerek").val(),
      model: $("#addModel").val(),
      warna: $("#addWarna").val(),
      tahun: $("#addTahun").val(),
    };
    mobil.push(newCar);

    $("body").removeClass("modal-open");
    $(".modal-backdrop").remove();

    renderTableRows();
    $("#addModal").modal("hide");
  };

  renderTableRows();
});
