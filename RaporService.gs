function getNilaiSiswa(nisn, semester, tahun) {
  var sheet = getSheet("DATA_NILAI")
  var data = sheet.getDataRange().getValues()
  var hasil = []

  for (var i = 1; i < data.length; i++) {
    if (
      data[i][0] == nisn &&
      data[i][6] == semester &&
      data[i][7] == tahun
    ) {
      hasil.push({
        mapel: data[i][1],
        nilai: data[i][5],
        deskripsi: data[i][8]
      })
    }
  }

  return hasil
}

function getNilaiKelas(kelas, semester, tahun) {
  var siswa = getSiswaByKelas(kelas)
  var sheetNilai = getSheet("DATA_NILAI")
  var dataNilai = sheetNilai.getDataRange().getValues()
  var hasil = []

  siswa.forEach(function (s) {
    var nisn = s[0]
    var nama = s[1]
    var nilai = []

    for (var i = 1; i < dataNilai.length; i++) {
      if (
        dataNilai[i][0] == nisn &&
        dataNilai[i][6] == semester &&
        dataNilai[i][7] == tahun
      ) {
        nilai.push(dataNilai[i][5])
      }
    }

    hasil.push({
      nama: nama,
      nilai: nilai
    })
  })

  return hasil
}
