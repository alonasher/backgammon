import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'SighnInUp',redirectTo:'SighnInUp',pathMatch:'full'},
  {path:'ChatAndPlay',redirectTo:'ChatAndPlay',pathMatch:'full'},
  {path:'',redirectTo:'ChatAndPlay',pathMatch:'full'},
  {path:'StartPage',redirectTo:'StartPage',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
