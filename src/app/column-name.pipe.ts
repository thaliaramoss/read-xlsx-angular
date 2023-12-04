import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'columnName'
})
export class ColumnNamePipe implements PipeTransform {

  transform(value: string): string {
    const mappings: { [key: string]: string } = {
      'col1': 'Nome Coluna 1',
      'col2': 'Nome Coluna 2',
      'col3': 'Nome Coluna 3',
      'col4': 'Nome Coluna 4',
    }
    return mappings[value] || value; // Retorna o valor mapeado ou o valor original se não houver mapeamento
  }

}
