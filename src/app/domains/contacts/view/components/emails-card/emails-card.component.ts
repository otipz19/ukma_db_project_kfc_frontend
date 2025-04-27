import {Component, inject, input, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatAnchor} from "@angular/material/button";
import {ContactsStore} from "../../../data-access/store/contacts.store";

@Component({
  selector: 'app-emails-card',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    MatAnchor
  ],
  templateUrl: './emails-card.component.html',
  styleUrl: './emails-card.component.scss'
})
export class EmailsCardComponent implements OnInit {
  private readonly store = inject(ContactsStore);

  readonly $userId = input.required<number>({alias: 'userId'});

  protected readonly $emails = this.store.$emails;

  ngOnInit() {
    this.store.load(this.$userId());
  }
}
