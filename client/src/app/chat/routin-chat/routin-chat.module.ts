import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from '../chat/chat.component';
import { ChatGameComponent } from '../chat-game/chat-game.component';
import { ChatLoggedComponent } from '../chat-logged/chat-logged.component';
import { Chatv2Component } from 'src/app/chatv2/chatv2.component';
import { WinComponent } from '../game/win/win.component';
import { LoseComponent } from '../game/lose/lose.component';


const routes: Routes = [
  { path: 'ChatAndPlay/chatGame', component: ChatGameComponent},
  { path: 'ChatAndPlay/Game/Lose', component: LoseComponent},
  { path: 'ChatAndPlay/Game/won', component: WinComponent},
  { path: 'ChatAndPlay/ChatList', component: ChatLoggedComponent},
  { path: 'ChatAndPlay', component: ChatGameComponent},
  

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutinChatModule { }
