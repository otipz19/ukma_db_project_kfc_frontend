import {Pipe, PipeTransform} from "@angular/core";

export function mapMealStatsActual(value: boolean): string {
  return value ? 'Актуальна' : 'Неактуальна';
}

@Pipe({
  name: 'mealStatsActual',
  standalone: true
})
export class MealsStatsActualPipe implements PipeTransform {
    transform(value: boolean): string {
        return mapMealStatsActual(value);
    }
}
