import {Component, computed, inject, input, output} from '@angular/core';
import {
  MatCell,
  MatCellDef, MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef, MatTable
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {ClientStoreEntity} from "../../../data-access/model/client-store-entity";
import {DeleteClientService} from "../../../features/delete-client/data-access/services/delete-client.service";
import {AuthService} from "../../../../../core/services/auth.service";
import {UserRole} from "../../../../../api";
import {RouterLink} from "@angular/router";
import {
  ClientPageTableColumn,
  ClientPageTableColumns
} from "../../../features/tables/data-access/model/client-columns";
import {MatSort, MatSortHeader, Sort} from "@angular/material/sort";
import {PageEvent} from "@angular/material/paginator";
import {
  PAGE_SIZE_OPTIONS,
  PaginatorModel
} from "../../../../../shared/features/pagination/data-access/model/paginator-model";
import {
  CommonPaginatorComponent
} from "../../../../../shared/features/pagination/view/components/common-paginator/common-paginator.component";

@Component({
  selector: 'app-clients-list',
  imports: [
    MatCell,
    MatCellDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatIconButton,
    MatRow,
    MatRowDef,
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    RouterLink,
    MatSort,
    MatSortHeader,
    CommonPaginatorComponent
  ],
  templateUrl: './clients-list.component.html',
  styleUrl: './clients-list.component.scss'
})
export class ClientsListComponent {
  private readonly deleteService = inject(DeleteClientService);
  private readonly authService = inject(AuthService);
  protected readonly $userRole = this.authService.$role;

  readonly $clients = input.required<Array<ClientStoreEntity>>({alias: 'clients'});
  readonly $paginator = input.required<PaginatorModel>({alias: 'paginator'});
  protected readonly $dataSource = computed(() => this.$clients());

  protected readonly sort = output<Sort>();
  protected readonly page = output<PageEvent>();

  protected readonly displayedColumns: Array<ClientPageTableColumn> = Object.values(ClientPageTableColumns);
  protected readonly ClientColumns = ClientPageTableColumns;

  protected onDelete(client: ClientStoreEntity) {
    this.deleteService.deleteClient(client);
  }

  protected readonly UserRole = UserRole;
  protected readonly PAGE_SIZE_OPTIONS = PAGE_SIZE_OPTIONS;
}
