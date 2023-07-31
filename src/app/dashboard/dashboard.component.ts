import { Component, DoCheck, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { RaiseclaimComponent } from '../raiseclaim/raiseclaim.component';
import { CommentpopupComponent } from '../commentpopup/commentpopup.component';
import { UpdatepopupComponent } from '../updatepopup/updatepopup.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements DoCheck, AfterViewInit {

  major = 0
  data: any[] = [];
  openCount: any;
  closeCount: any;
  code: any;
  res: any;

  userlist: any;
  displayedColumns: string[] = ['id', 'name', 'email', 'status', 'role', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ismenurequired = false;
  isMenuVisible = false;
  isAdmin = false;
  isuser = true;
  name: any

  constructor(private route: Router, private service: AuthService, private dialog: MatDialog, private http: HttpClient, private toastr: ToastrService) {
    this.name = sessionStorage.getItem('id')
    let role = sessionStorage.getItem('role');
    if (role == 'admin') {
      this.isAdmin = true;
    }
  }
  ngOnInit(): void {
    this.LoadUser();
    this.getStatus();

  }

  ngDoCheck(): void {
    let currentroute = this.route.url;
    let role = sessionStorage.getItem('role');
    if (currentroute == '/user' || currentroute == '/register') {
      this.isMenuVisible = false
    } else {
      this.isMenuVisible = true
    }

    if (role == 'admin') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }
  public dataticket: any[] = [];
  LoadUser() {
    this.service.getAll().subscribe(res => {  // this.data i have added because it do require an argument
      this.dataticket = res;
      this.userlist = res;
      this.userlist = this.userlist.filter((i: any) => i.name == this.name)
      this.dataSource = new MatTableDataSource(this.userlist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  //.filter((item) => item.name === 'Mahesh')
  // getAllTickets(){
  //   this.service.getTicket()
  //   .subscribe(res=>{
  //     this.dataSource=new MatTableDataSource(res);  
  //     this.dataSource.paginator=this.paginator;
  //     this.dataSource.sort=this.sort;
  //   },
  //   err=>{
  //     alert("Error");
  //   })
  // }
  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  updateUser(code: any) {
    this.OpenDialog('1000ms', '600ms', code);
  }

  OpenDialog(enteranimation: any, exitanimation: any, code: string) {
    const popup = this.dialog.open(UpdatepopupComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '30%',
      data: {
        usercode: code
      }
    });
    popup.afterClosed().subscribe(res => {
      this.LoadUser();
    });
  }

  getTicket(code: any) {
    this.OpenDialogRaiseClaim('1000ms', '600ms', code)
  }

  OpenDialogRaiseClaim(enteranimation: any, exitanimation: any, code: string) {
    const popup = this.dialog.open(RaiseclaimComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '60%',
      // height:'30%',
      data: {
        usercode: code
      }
    });
    popup.afterClosed().subscribe(res => {
      this.LoadUser();
    });
  }
  open = 0
  close = 0
  getStatus() {
    this.service.getClaim().subscribe(res => {
      res.filter((i: any) => {
        i.select;
        if (i.select == "Major issue") {
          this.major += 1;
        }
        if (i.isactive) {
          this.close += 1
        }
        else {
          this.open += 1
        }
      })
      this.toastr.error("There are " + this.major + " High Priority Tasks");
    })
  }

  showcomment(code: any) {
    this.OpenCommentDialog('1000ms', '600ms', code);
  }
  OpenCommentDialog(enteranimation: any, exitanimation: any, code: string) {
    const popup = this.dialog.open(CommentpopupComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '30%',
      height: '20%',
      data: {
        usercode: code
      }
    });
    popup.afterClosed().subscribe(res => {
      this.LoadUser();
    });
  }
}
