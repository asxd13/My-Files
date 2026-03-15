function generateRapor(nisn,semester,tahun){

    var templateId = "ISI_ID_TEMPLATE_RAPOR"
    var folderId = "ISI_ID_FOLDER_RAPOR"

    var sheetSiswa = getSheet("DATA_SISWA")
    var dataSiswa = sheetSiswa.getDataRange().getValues()

    var nama = ""
    var kelas = ""

    for (var i = 1; i < dataSiswa.length; i++) {
        if (dataSiswa[i][0] == nisn) {
            nama = dataSiswa[i][1]
            kelas = dataSiswa[i][3]
        }
    }

    var sheetNilai = getSheet("DATA_NILAI")
    var dataNilai = sheetNilai.getDataRange().getValues()
    var tabelNilai = []

    for (var i = 1; i < dataNilai.length; i++) {
        if (
            dataNilai[i][0] == nisn &&
            dataNilai[i][6] == semester &&
            dataNilai[i][7] == tahun
        ) {
            tabelNilai.push([
                dataNilai[i][1],
                dataNilai[i][5],
                dataNilai[i][8]
            ])
        }
    }

    var copy = DriveApp
        .getFileById(templateId)
        .makeCopy()

    var doc = DocumentApp.openById(copy.getId())
    var body = doc.getBody()

    body.replaceText("{{NAMA}}", nama)
    body.replaceText("{{NISN}}", nisn)
    body.replaceText("{{KELAS}}", kelas)
    body.replaceText("{{SEMESTER}}", semester)
    body.replaceText("{{TAHUN}}", tahun)

    var table = body.appendTable()

    table.appendTableRow([
        "Mapel",
        "Nilai",
        "Deskripsi"
    ])

    tabelNilai.forEach(function(row){
        table.appendTableRow(row)
    })

    doc.saveAndClose()

    var pdf = DriveApp
        .getFileById(doc.getId())
        .getAs("application/pdf")

    var folder = DriveApp.getFolderById(folderId)
    var filePdf = folder.createFile(pdf)

    DriveApp.getFileById(doc.getId()).setTrashed(true)

    return filePdf.getUrl()
}

function buatTabelNilai(body,dataNilai){

    var table = body.appendTable()

    table.appendTableRow([
        "No",
        "Mata Pelajaran",
        "Nilai"
    ])

    var no = 1

    dataNilai.forEach(function(n){
        table.appendTableRow([
            no,
            n.mapel,
            n.nilai
        ])
        no++
    })

}

function buatDeskripsiMapel(body,dataNilai){

    dataNilai.forEach(function(n){
        body.appendParagraph(
            n.mapel + " : " + n.deskripsi
        )
    })

}

function getDataPKL(nisn){

    var sheet = getSheet("DATA_PKL")
    var data = sheet.getDataRange().getValues()

    for (var i = 1; i < data.length; i++) {
        if (data[i][0] == nisn) {
            return {
                tempat: data[i][1],
                nilaiIndustri: data[i][2],
                nilaiGuru: data[i][3],
                nilaiAkhir: data[i][4],
                deskripsi: data[i][5]
            }
        }
    }

    return null

}

function generateRaporKelas(kelas,semester,tahun){

    var siswa = getSiswaByKelas(kelas)
    var hasil = []

    siswa.forEach(function(s){
        var nisn = s[0]
        var url = generateRaporLengkap(nisn,semester,tahun)
        hasil.push(url)
    })

    return hasil

}

function generateLegger(kelas,semester,tahun){

    var data = getNilaiKelas(kelas,semester,tahun)
    var doc = DocumentApp.create("Legger "+kelas)
    var body = doc.getBody()
    var table = body.appendTable()

    table.appendTableRow([
        "No",
        "Nama Siswa",
        "Nilai"
    ])

    var no = 1

    data.forEach(function(s){
        table.appendTableRow([
            no,
            s.nama,
            s.nilai.join(", ")
        ])
        no++
    })

    doc.saveAndClose()

    var pdf = DriveApp.getFileById(doc.getId()).getAs("application/pdf")
    var folder = DriveApp.getRootFolder()
    var file = folder.createFile(pdf)

    DriveApp.getFileById(doc.getId()).setTrashed(true)

    return file.getUrl()

}
