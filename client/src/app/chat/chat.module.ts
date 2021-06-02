import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutinChatModule } from './routin-chat/routin-chat.module';
import { FormsModule } from '@angular/forms';
import { ChatGameComponent } from './chat-game/chat-game.component';
import { ChatLoggedComponent } from './chat-logged/chat-logged.component';
import { GameComponent } from './game/game.component';
import { LoggedInComponent } from './logged-in/logged-in.component';
import { Chatv2Component } from '../chatv2/chatv2.component';
import { RoolDiceComponent } from './rool-dice/rool-dice.component';
import { HouseBlackComponent } from './game/house-black/house-black.component';
import { LoseComponent } from './game/lose/lose.component';
import { WinComponent } from './game/win/win.component';
import { WaitingRoomComponent } from './chat-game/waiting-room/waiting-room.component';
import { PrivateMessegeComponent } from './private-messege/private-messege.component';
// import {DragDropModule} from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [
    ChatGameComponent,
    ChatLoggedComponent,
    GameComponent,
    LoggedInComponent,
    Chatv2Component,
    RoolDiceComponent,
    HouseBlackComponent,
    RoolDiceComponent,
    LoseComponent,
    WinComponent,
    WaitingRoomComponent,
    PrivateMessegeComponent
  ],
  imports: [
    CommonModule,
    RoutinChatModule,
    FormsModule,
    
    // DragDropModule
  ]
})
export class ChatModule { }
