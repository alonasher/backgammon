import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { RoutinChatModule } from './routin-chat/routin-chat.module';
import { FormsModule } from '@angular/forms';
import { ChatGameComponent } from './chat-game/chat-game.component';
import { ChatLoggedComponent } from './chat-logged/chat-logged.component';
import { GameComponent } from './game/game.component';
import { LoggedInComponent } from './logged-in/logged-in.component';
import { Chatv2Component } from '../chatv2/chatv2.component';
<<<<<<< HEAD
import { OnlineUsersComponent } from '../online-users/online-users.component';
=======
import { RoolDiceComponent } from './rool-dice/rool-dice.component';
// import {DragDropModule} from '@angular/cdk/drag-drop';
>>>>>>> 40d50396f5106815872b63b4419e93c945faeac8



@NgModule({
  declarations: [
    ChatComponent,
    ChatGameComponent,
    ChatLoggedComponent,
    GameComponent,
    LoggedInComponent,
    Chatv2Component,
<<<<<<< HEAD
    OnlineUsersComponent
=======
    RoolDiceComponent
>>>>>>> 40d50396f5106815872b63b4419e93c945faeac8
  ],
  imports: [
    CommonModule,
    RoutinChatModule,
    FormsModule,
    
    // DragDropModule
  ]
})
export class ChatModule { }
