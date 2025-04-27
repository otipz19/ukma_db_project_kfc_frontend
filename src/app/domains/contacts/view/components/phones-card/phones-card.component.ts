import {Component, inject, input, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatAnchor} from "@angular/material/button";
import {ContactsStore} from "../../../data-access/store/contacts.store";

@Component({
  selector: 'app-phones-card',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    MatAnchor
  ],
  templateUrl: './phones-card.component.html',
  styleUrl: './phones-card.component.scss'
})
export class PhonesCardComponent implements OnInit {
  private readonly store = inject(ContactsStore);

  readonly $userId = input.required<number>({alias: 'userId'});

  protected readonly $phones = this.store.$phones;

  ngOnInit() {
    this.store.load(this.$userId());
  }
}
