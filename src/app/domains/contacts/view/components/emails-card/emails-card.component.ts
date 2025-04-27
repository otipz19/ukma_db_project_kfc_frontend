import {Component, inject, input, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatAnchor, MatIconButton} from "@angular/material/button";
import {ContactsStore} from "../../../data-access/store/contacts.store";
import {MatIcon} from "@angular/material/icon";
import {SetEmailsService} from "../../../data-access/services/set-emails.service";

@Component({
  selector: 'app-emails-card',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    MatAnchor,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './emails-card.component.html',
  styleUrl: './emails-card.component.scss'
})
export class EmailsCardComponent implements OnInit {
  private readonly store = inject(ContactsStore);
  private readonly editService = inject(SetEmailsService);

  readonly $userId = input.required<number>({alias: 'userId'});

  protected readonly $emails = this.store.$emails;

  ngOnInit() {
    this.store.load(this.$userId());
  }

  protected onEdit() {
    this.editService.set(this.$userId(), this.$emails());
  }
}
