import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

// Third party modules
import { ModalModule } from 'ngx-bootstrap/modal';

// Import the Http Module and our Data Service
import { HttpModule } from '@angular/http';
import { DataService } from './data.service';


import { HomeComponent } from './home/home.component';
//import { BecameaninsturctorComponent } from './becameaninsturctor/becameaninsturctor.component';
import { RouterModule, Routes} from '@angular/router';
import { CoursecatalogueComponent } from './coursecatalogue/coursecatalogue.component';
import { OurteamComponent } from './ourteam/ourteam.component';
import { StudentprofileComponent } from './studentprofile/studentprofile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CoursecatalogueComponent,
    OurteamComponent,
    StudentprofileComponent    
  ],
  imports: [
    ModalModule.forRoot(),
    BrowserModule,
    HttpModule,
    RouterModule.forRoot([
      {path: 'home', component: HomeComponent},
      {path: 'coursecatalogue', component: CoursecatalogueComponent},
      {path: 'ourteam', component: OurteamComponent},
      {path: 'studentprofile', component: StudentprofileComponent},
    ])
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
