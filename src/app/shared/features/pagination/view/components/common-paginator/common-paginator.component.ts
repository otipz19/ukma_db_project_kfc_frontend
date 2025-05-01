import {Component, input, output} from '@angular/core';
import {PAGE_SIZE_OPTIONS, PaginatorModel} from "../../../data-access/model/paginator-model";
import {MatPaginator, PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-common-paginator',
  imports: [
    MatPaginator,
  ],
  templateUrl: './common-paginator.component.html',
  styleUrl: './common-paginator.component.scss'
})
export class CommonPaginatorComponent {
  readonly $paginator = input.required<PaginatorModel>({alias: 'paginator'});
  protected readonly page = output<PageEvent>();

  protected readonly PAGE_SIZE_OPTIONS = PAGE_SIZE_OPTIONS;
}
