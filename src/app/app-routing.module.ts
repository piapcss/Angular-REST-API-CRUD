import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

import { UserDetailComponent } from "./users-detail/user-detail.component";
import { UserFormComponent } from "./users/users-list/users-form/user-form.component";
import { UserListComponent } from "./users/users-list/user-list.component";

const appRoutes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  {
    path: 'users', component: UserListComponent, children: [
      { path: '', component: UserFormComponent },
    ]
  },
  { path: 'user-detail/:id', component: UserDetailComponent },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/page-not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
