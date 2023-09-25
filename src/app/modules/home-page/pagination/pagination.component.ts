import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})

export class PaginationComponent implements OnInit {

  @Input() totalLength: number = 0;
  @Input() pageSize: number = 10;
  @Input() pageSizeOptions: number[] = [5, 10, 25, 100];
  @Input() currentPage: number = 0;
  @Input() showFirstLastButtons: boolean = true;
  @Input() hidePageSize: boolean = false;
  @Input() hidePageNumber: boolean = false;
  @Input() itemsObservable!: Observable<any>;
  @Output() changePage: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  handlePageChange(event: any): void {
    if(event.pageSize != this.pageSize) {
      this.pageSize = event.pageSize;
    }
    if(event.pageIndex != this.currentPage) {
      this.currentPage = event.pageIndex;
    }
    this.changePage.emit({
      pageSize: this.pageSize,
      pageIndex: this.currentPage + 1
    });
  }
}