import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { RoutinChatModule } from './routin-chat/routin-chat.module';
import { FormsModule } from '@angular/forms';
import { ChatGameComponent } from './chat-game/chat-game.component';
import { ChatLoggedComponent } from './chat-logged/chat-logged.component';
import { GameComponent } from './game/game.component';
import { LoggedInComponent } from './logged-in/logged-in.component';



@NgModule({
  declarations: [
    ChatComponent,
    ChatGameComponent,
    ChatLoggedComponent,
    GameComponent,
    LoggedInComponent
  ],
  imports: [
    CommonModule,
    RoutinChatModule,
    FormsModule
  ]
})
export class ChatModule { }
