import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ApiService } from '../api.service';

export interface UserData {
  ID: string;
  Title: number;
  Description: number;
  userID: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Sr#', 'Title', 'Description', 'User ID'];
  dataSource = new MatTableDataSource<UserData[]>();
  showLoader: boolean = true;
  @ViewChild('paginator') paginator: MatPaginator;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getRecord().subscribe(res => {
      this.dataSource = new MatTableDataSource(Object.values(res));
      if (this.dataSource.data) {
        this.showLoader = false;
        this.dataSource.paginator = this.paginator;
      }
    })

  }
  ngAfterViewInit() {
  }

}
