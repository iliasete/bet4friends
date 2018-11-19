// Angular imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Third party imports
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { MomentModule } from 'angular2-moment';

// Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Internal imports
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { AppDataResolver } from './resolvers/app-data.resolver';
import { CurrentWeekService } from './services/current-week.service';
import { CommonModule } from '@angular/common';
import { PredictionsWidgetComponent } from './components/predictions-widget/predictions-widget.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { MatchesSelectorComponent } from './components/matches-selector/matches-selector.component';

const APP_ROUTES: Routes = [
  { path: 'login',
    component: HomePageComponent,
    canActivate: [ LoginGuard ] },
  { path: 'dashboard',
    component: DashboardPageComponent,
    canActivate: [ AuthGuard ]
    // resolve: {
    //     appData: AppDataResolver
    // }
  },
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    DashboardPageComponent,
    PredictionsWidgetComponent,
    MatchesSelectorComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MomentModule,
    RouterModule.forRoot(APP_ROUTES),
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatToolbarModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  exports: [],
  providers: [
    AppDataResolver,
    CurrentWeekService,
    AuthService
  ],
  entryComponents: [ MatchesSelectorComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
