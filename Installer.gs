function onOpen(){

  SpreadsheetApp.getUi()
  .createMenu("E-Rapor Installer")
  .addItem("Install Sistem","installSystem")
  .addToUi()

}

function installSystem(){

  var ss = SpreadsheetApp.getActive()

  var sheets = [
    "DATA_SEKOLAH",
    "DATA_SISWA",
    "DATA_MAPEL",
    "DATA_KELAS",
    "DATA_NILAI",
    "DATA_DESKRIPSI",
    "DATA_PKL",
    "DATA_LISENSI"
  ]

  sheets.forEach(function(name){

    var sh = ss.getSheetByName(name)

    if(!sh){
      ss.insertSheet(name)
    }

  })

}
