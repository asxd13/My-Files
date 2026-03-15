function getDataKelas() {
  var sheet = getSheet("DATA_KELAS");
  var data = sheet.getDataRange().getValues();
  data.shift();
  return data;
}

function tambahKelas(id, nama, tingkat, jurusan, wali) {
  var sheet = getSheet("DATA_KELAS");
  sheet.appendRow([
    id,
    nama,
    tingkat,
    jurusan,
    wali
  ]);
  return true;
}

function hapusKelas(id) {
  var sheet = getSheet("DATA_KELAS");
  var data = sheet.getDataRange().getValues();

  for (var i = 1; i < data.length; i++) {
    if (data[i][0] == id) {
      sheet.deleteRow(i + 1);
      return true;
    }
  }
}
