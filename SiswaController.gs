function getDataSiswa() {
  var sheet = getSheet("DATA_SISWA");
  var data = sheet.getDataRange().getValues();
  data.shift();
  return data;
}

function tambahSiswa(nisn, nama, jk, kelas, jurusan) {
  var sheet = getSheet("DATA_SISWA");
  sheet.appendRow([
    nisn,
    nama,
    jk,
    kelas,
    jurusan,
    "AKTIF"
  ]);
  return true;
}

function hapusSiswa(nisn) {
  var sheet = getSheet("DATA_SISWA");
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] == nisn) {
      sheet.deleteRow(i + 1);
      return true;
    }
  }
}

function getSiswaByKelas(kelas) {
  var sheet = getSheet("DATA_SISWA");
  var data = sheet.getDataRange().getValues();
  var hasil = [];
  for (var i = 1; i < data.length; i++) {
    if (data[i][3] == kelas) {
      hasil.push(data[i]);
    }
  }
  return hasil;
}
