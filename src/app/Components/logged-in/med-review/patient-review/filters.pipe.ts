import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filters'
})
export class FiltersPipe implements PipeTransform {

  transform(value: any, filterString: string, propName: string): any {
    if (value.length === 0 || filterString == '') {
      return value;
    }

    // console.log(propName);
    let resultArray = [];

    for (const item of value) {

      let searchItem: string = item[propName];

      if (searchItem.toLowerCase().includes(filterString.toLowerCase())) {
        // console.log(filterString);
        // console.log(item)
        resultArray.push(item);
      }
    };

    return resultArray;

  }

}
