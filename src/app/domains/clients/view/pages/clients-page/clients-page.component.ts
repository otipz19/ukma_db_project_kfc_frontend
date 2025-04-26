import {Component, inject, OnInit, Signal} from '@angular/core';
import {ClientsStore} from "../../../data-access/store/clients.store";
import {SearchBarComponent} from "../../../../../shared/components/search-bar/search-bar.component";
import {ClientsListComponent} from "../../components/clients-list/clients-list.component";
import {ClientStoreEntity} from "../../../data-access/model/client-store-entity";

@Component({
  selector: 'app-clients-page',
  imports: [
    SearchBarComponent,
    ClientsListComponent,
  ],
  templateUrl: './clients-page.component.html',
  styleUrl: './clients-page.component.scss'
})
export class ClientsPageComponent implements OnInit {
  private readonly store = inject(ClientsStore);

  protected readonly $clients: Signal<ClientStoreEntity[]> = this.store.$viewList;

  ngOnInit() {
    this.store.initialLoad();
  }

  protected onSearch(query: string) {
    this.store.filters.search.setFilter(query);
    this.store.forceSignalReload();
  }
}
