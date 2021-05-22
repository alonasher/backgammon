import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Chatv2Component } from './chatv2/chatv2.component';

const routes: Routes = [
  {path:'SighnInUp',redirectTo:'SighnInUp',pathMatch:'full'},
  {path:'ChatAndPlay',redirectTo:'ChatAndPlay',pathMatch:'full'},
  {path:'',redirectTo:'StartPage',pathMatch:'full'},
  {path:'StartPage',redirectTo:'StartPage',pathMatch:'full'},
  {path: 'chat-test', component:Chatv2Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
