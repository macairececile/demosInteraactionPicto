import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {SelectPictoComponent} from "./components/select-picto/select-picto.component";
import {SpeechToPictoComponent} from "./components/speech-to-picto/speech-to-picto.component";
import {TranslatePictoComponent} from "./components/translate-picto/translate-picto.component";
import {AnnotVocabComponent} from "./components/annot_vocab/annot_vocab.component";
import {PostEditionExitComponent} from "./components/post_edition_exit/post-edition-exit.component";
import {PostEditionComponent} from "./components/post_edition/post-edition.component";
import {PostEditionHomeComponent} from "./components/post_edition_home/post-edition-home.component";
import {EvalHomeComponent} from "./components/eval_home/eval_home.component";
import {EvalComponent} from "./components/eval/eval.component";
import {AdminComponent} from "./components/admin/admin.component";
import {EvalExitComponent} from "./components/eval_exit/eval_exit.component";
import {LoginComponent} from "./components/login/login.component";
import {LoadingComponent} from "./components/loading/loading.component";
import {DemoHomeComponent} from "./components/demo_home/demo_home.component";
import {TextToPictoComponent} from "./components/text-to-picto/text-to-picto.component";
import {Eval_demosComponent} from "./components/eval_demos/eval_demos.component";


const routes: Routes = [
  {path: 'print', component:SelectPictoComponent},
  {path: 'picto', component:TranslatePictoComponent},
  {path: 'speechToPicto', component:SpeechToPictoComponent},
  {path: 'textToPicto', component:TextToPictoComponent},
  {path: 'evalDemos', component:Eval_demosComponent},
  {path: 'postEditPictoHome', component:PostEditionHomeComponent},
  {path: 'postEditPicto', component:PostEditionComponent},
  {path: 'postEditPictoExit', component:PostEditionExitComponent},
  {path: 'dicoPicto', component:AnnotVocabComponent},
  {path: 'evalPictoHome', component:EvalHomeComponent},
  {path: 'evalPicto', component:EvalComponent},
  {path: 'evalPictoExit', component:EvalExitComponent},
  {path: 'admin', component:AdminComponent},
  {path: 'login', component:LoginComponent},
  {path: 'loading', component:LoadingComponent},
  {path: 'hubpictos', component:DemoHomeComponent},
  {path: '', redirectTo:'hubpictos', pathMatch: 'full'}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {useHash: true})
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
