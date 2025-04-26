import {Component, computed, inject, input} from '@angular/core';
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

type ClientColumn = (keyof Omit<ClientStoreEntity, 'id' | 'username'>) | 'actions';

const ClientColumns: Record<ClientColumn, ClientColumn> = {
  surname: 'surname',
  firstName: 'firstName',
  middleName: 'middleName',
  birthDate: 'birthDate',
  bonuses: 'bonuses',
  actions: 'actions'
};

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
    MatHeaderCellDef
  ],
  templateUrl: './clients-list.component.html',
  styleUrl: './clients-list.component.scss'
})
export class ClientsListComponent {
  private readonly deleteService = inject(DeleteClientService);
  private readonly authService = inject(AuthService);
  protected readonly $userRole = this.authService.$role;

  readonly $clients = input.required<Array<ClientStoreEntity>>({alias: 'clients'});

  protected readonly $dataSource = computed(() => this.$clients());

  protected readonly displayedColumns: Array<ClientColumn> = Object.values(ClientColumns);
  protected readonly ClientColumns = ClientColumns;

  onDelete(client: ClientStoreEntity) {
    this.deleteService.deleteClient(client);
  }

  protected readonly UserRole = UserRole;
}
