function generateDeskripsi(mapel, nilai){

var level = ""

if(nilai >= 90){
level = "SANGAT_BAIK"
}
else if(nilai >= 80){
level = "BAIK"
}
else if(nilai >= 70){
level = "CUKUP"
}
else{
level = "KURANG"
}

var sheet = getSheet("DATA_DESKRIPSI")

var data = sheet.getDataRange().getValues()

for(var i=1;i<data.length;i++){

if(data[i][0] == level){

var template = data[i][1]

var deskripsi = template.replace("{MAPEL}", mapel)

return deskripsi

}

}

return ""

}
