var xlsx = require('xlsx');

const fs = require('fs');

var workbook = xlsx.readFile('/Users/antonshishov/Desktop/BachFolder13072018/ПИ 13.07.2018.xls');

var sheet_name_list = workbook.SheetNames;

var all_data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

module.exports = all_data;

