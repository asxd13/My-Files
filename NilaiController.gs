function importNilai(fileData,fileName,mapel,semester,tahun) {
  var bytes = Utilities.base64Decode(fileData.split(",")[1]);

  var blob = Utilities.newBlob(bytes);
  blob.setName(fileName);

  var file = DriveApp.createFile(blob);

  var resource = {
    title: file.getName(),
    mimeType: MimeType.GOOGLE_SHEETS
  };

  var converted = Drive.Files.copy(resource, file.getId());

  var ss = SpreadsheetApp.openById(converted.id);
  var sheet = ss.getSheets()[0];
  var data = sheet.getDataRange().getValues();

  data.shift();

  var sheetNilai = getSheet("DATA_NILAI");

  data.forEach(function(row) {
    var nisn = row[0];
    var tugas = row[2];
    var tulis = row[3];
    var praktik = row[4];

    var deskripsi = generateDeskripsi(mapel,nilaiAkhir);

    sheetNilai.appendRow([
      nisn,
      mapel,
      tugas,
      tulis,
      praktik,
      nilaiAkhir,
      semester,
      tahun,
      deskripsi
    ]);
  });

  DriveApp.getFileById(file.getId()).setTrashed(true);
  DriveApp.getFileById(converted.id).setTrashed(true);

  return true;
}
