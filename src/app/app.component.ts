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

  displayedColumns: string[] = []
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

      this.dataSource.data = jsonData

      // primeira linha - coluna com os nomes das colunas
      this.displayedColumns = Object.keys(jsonData[0] as string[]);


      console.log(this.dataSource.data)
    }
  }
}
