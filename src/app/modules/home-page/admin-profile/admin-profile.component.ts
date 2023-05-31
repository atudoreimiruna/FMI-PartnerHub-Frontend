import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FilesService } from 'src/app/services/files.service';
import { StudentsService } from 'src/app/services/students.service';

@Component({
    selector: 'admin-profile',
    templateUrl: './admin-profile.component.html',
    styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent {
  
  constructor(
    public authService: AuthService,
    public studentService: StudentsService,
    public fileService: FilesService,
    private route: ActivatedRoute
  ) { }

  public email!: string;

    ngOnInit() {
    this.email = this.route.snapshot.params['email'];
  }
}