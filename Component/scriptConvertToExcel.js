
function ExportToExcel(type,fn,dl){
    let table = document.querySelector(".table");
    let wb = XLSX.units.table_to_book(table,{sheet:"sheet1"});
    return dl?
    XLSX.write(wb,{bookType:type,bookSST:true,type:"base64"}):
    XLSX.writeFile(wb,fn || ("MySheetName." + (type || "xlsx")));
}