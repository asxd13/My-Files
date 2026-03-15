function getDataMapel(){

var sheet = getSheet("DATA_MAPEL")

var data = sheet.getDataRange().getValues()

data.shift()

return data

}

function tambahMapel(kode,nama,tingkat,jurusan,kkm){

var sheet = getSheet("DATA_MAPEL")

sheet.appendRow([
kode,
nama,
tingkat,
jurusan,
kkm
])

return true

}

function hapusMapel(kode){

var sheet = getSheet("DATA_MAPEL")

var data = sheet.getDataRange().getValues()

for(var i=1;i<data.length;i++){

if(data[i][0]==kode){

sheet.deleteRow(i+1)

return true

}

}

}
