import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CLIENT_RESOLVER_KEY} from "../../../data-access/resolvers/client.resolver";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {ClientStoreEntity} from "../../../data-access/model/client-store-entity";
import {UserPhonesControllerService} from "../../../../../api/api/userPhonesController.service";
import {UserEmailsControllerService} from "../../../../../api/api/userEmailsController.service";
import {catchError, EMPTY, Observable} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MatAnchor, MatButton} from "@angular/material/button";
import {UserRole} from "../../../../../api";
import {AuthService} from "../../../../../core/services/auth.service";
import {DeleteClientService} from "../../../features/delete-client/data-access/services/delete-client.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-client-profile-page',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    MatAnchor,
    MatButton,
  ],
  templateUrl: './client-profile-page.component.html',
  styleUrl: './client-profile-page.component.scss'
})
export class ClientProfilePageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly phoneApi = inject(UserPhonesControllerService);
  private readonly emailApi = inject(UserEmailsControllerService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly clientDeleteService = inject(DeleteClientService);
  private readonly location = inject(Location);

  protected readonly authService = inject(AuthService);

  protected readonly $client = signal<ClientStoreEntity>(this.route.snapshot.data[CLIENT_RESOLVER_KEY]);
  protected readonly $phones = signal<string[]>([]);
  protected readonly $emails = signal<string[]>([]);

  ngOnInit() {
    this.requestContacts(
      this.emailApi.getUserEmails(this.$client().id)
    )
      .subscribe(list => {
        this.$emails.set(list);
      });

    this.requestContacts(
      this.phoneApi.getUserPhones(this.$client().id)
    )
      .subscribe(list => {
        this.$phones.set(list);
      });
  }

  private requestContacts(request: Observable<string[]>): Observable<string[]> {
    return request
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError(() => {
          return EMPTY;
        })
      );
  }

  protected readonly UserRole = UserRole;

  onDelete() {
    this.clientDeleteService.deleteClient$(this.$client())
      .subscribe(() => {
        if (this.authService.hasRole(UserRole.CLIENT)) {
          this.authService.unLogin();
        } else {
          this.location.back();
        }
      });
  }
}
