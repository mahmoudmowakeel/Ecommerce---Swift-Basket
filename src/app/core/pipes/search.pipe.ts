import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(arrayOfobjects: any[], text: string): any[] {
    return arrayOfobjects.filter((item) => item.title.toLowerCase().includes(text.toLowerCase()));
  }

}
