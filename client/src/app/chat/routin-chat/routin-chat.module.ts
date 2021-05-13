import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from '../chat/chat.component';
import { ChatGameComponent } from '../chat-game/chat-game.component';
import { ChatLoggedComponent } from '../chat-logged/chat-logged.component';


const routes: Routes = [
  { path: 'ChatAndPlay/chatGame', component: ChatGameComponent},
  { path: 'ChatAndPlay/ChatList', component: ChatLoggedComponent},
  { path: 'ChatAndPlay', component: ChatLoggedComponent},

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutinChatModule { }
