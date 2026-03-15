function doGet(e) {

var page = e && e.parameter.page ? e.parameter.page : "login"

var template = HtmlService.createTemplateFromFile("layout")

template.page = page

return template
.evaluate()
.setTitle("E-Rapor SMK")
.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)

}

function include(file) {
return HtmlService.createHtmlOutputFromFile(file).getContent()
}
function getJumlahSiswa(){

return 120

}

function loginSystem(lembaga,kode){

var sheet = getSheet("DATA_LISENSI")

var data = sheet.getDataRange().getValues()

for(var i=1;i<data.length;i++){

if(
data[i][0]==kode &&
data[i][1]==lembaga &&
data[i][2]=="AKTIF"
){

return true

}

}

return false

}

function getStatistik(){

var siswa = getSheet("DATA_SISWA").getLastRow()-1
var mapel = getSheet("DATA_MAPEL").getLastRow()-1
var kelas = getSheet("DATA_KELAS").getLastRow()-1

return {
siswa:siswa,
mapel:mapel,
kelas:kelas
}

}
