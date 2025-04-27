import {Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CLIENT_RESOLVER_KEY} from "../../../data-access/resolvers/client.resolver";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {ClientStoreEntity} from "../../../data-access/model/client-store-entity";
import {MatAnchor, MatButton, MatIconButton} from "@angular/material/button";
import {UserRole} from "../../../../../api";
import {AuthService} from "../../../../../core/services/auth.service";
import {DeleteClientService} from "../../../features/delete-client/data-access/services/delete-client.service";
import {Location} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {UpdateClientService} from "../../../features/update-client/data-access/services/update-client.service";
import {ClientProfileStore} from "../../../data-access/store/client-profile.store";

@Component({
  selector: 'app-client-profile-page',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    MatAnchor,
    MatButton,
    MatIconButton,
    MatIcon,
  ],
  templateUrl: './client-profile-page.component.html',
  styleUrl: './client-profile-page.component.scss'
})
export class ClientProfilePageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(ClientProfileStore);
  private readonly clientDeleteService = inject(DeleteClientService);
  private readonly location = inject(Location);
  private readonly updateService = inject(UpdateClientService);

  protected readonly authService = inject(AuthService);

  protected readonly $clientId = signal<ClientStoreEntity['id']>(this.route.snapshot.data[CLIENT_RESOLVER_KEY].id);
  protected readonly $client = this.store.$client;
  protected readonly $phones = this.store.$phones;
  protected readonly $emails = this.store.$emails;

  ngOnInit() {
    this.store.load(this.$clientId());
  }

  protected readonly UserRole = UserRole;

  protected onDelete() {
    const client = this.$client();
    if(!client) {
      return;
    }
    this.clientDeleteService.deleteClient$(client)
      .subscribe(() => {
        if (this.authService.hasRole(UserRole.CLIENT)) {
          this.authService.unLogin();
        } else {
          this.location.back();
        }
      });
  }

  protected onEdit() {
    const client = this.$client();
    if(!client) {
      return;
    }
    this.updateService.update$(client)
      .subscribe(() => {
        this.store.reloadClientData();
      });
  }
}
