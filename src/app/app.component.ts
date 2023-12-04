import { Binary } from '@angular/compiler';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular_xlsx';

  displayedColumns: string[] = ['col1', 'col2', 'col3', 'col4'];
  dataSource = new MatTableDataSource<any>([])
  data: any

  readExcel(event: any) {
    let file = event.target.files[0]

    let fileReader = new FileReader()
    fileReader.readAsBinaryString(file)

    fileReader.onload = (e) => {
      let workbook = XLSX.read(fileReader.result, {type: 'binary'})
      let sheetNames = workbook.SheetNames
      let sheet = workbook.Sheets[sheetNames[0]]
      let jsonData = XLSX.utils.sheet_to_json(sheet)

      const columnMappings: { [key: string]: string } = {
        'coluna 1': 'col1',
        'coluna 2': 'col2',
        'coluna 3': 'col3',
        'coluna 4': 'col4'
      };

      let transformedData = jsonData.map((row: any) => {
        let transformedRow: { [key: string]: any } = {};
        if (typeof row === 'object' && row !== null) {
          Object.keys(row).forEach(key => {
            let newKey = columnMappings[key] || key;
            transformedRow[newKey] = row[key];
          });
        }
        return transformedRow;
      });

      this.dataSource.data = transformedData;

      console.log(this.dataSource.data)
    }
  }
}

