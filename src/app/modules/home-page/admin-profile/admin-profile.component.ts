import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Partner } from 'src/app/interfaces/partner';
import { AuthService } from 'src/app/services/auth.service';
import { FilesService } from 'src/app/services/files.service';
import { PartnersService } from 'src/app/services/partners.service';
import { StudentsService } from 'src/app/services/students.service';

@Component({
    selector: 'admin-profile',
    templateUrl: './admin-profile.component.html',
    styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent {
  
  public partners!: Partner[];

  constructor(
    public authService: AuthService,
    public studentService: StudentsService,
    public fileService: FilesService,
    private route: ActivatedRoute,
    private partnersService: PartnersService
  ) { 
    this.getAllPartners();
  }

  public email!: string;
    ngOnInit() {
    this.email = this.route.snapshot.params['email'];
  }

  public getAllPartners(): void {
    this.partnersService.getPartners().subscribe((result) => {
      this.partners = result;
    });
  }

}