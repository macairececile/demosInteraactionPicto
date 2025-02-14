import { Component, OnInit } from '@angular/core';
import { AudioTextFileShareService } from "../../services/audioTextFileShare/audio-text-file-share.service";
import {Router} from "@angular/router";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-speech-to-picto',
  templateUrl: './speech-to-picto.component.html',
  styleUrls: ['./speech-to-picto.component.css']
})
export class SpeechToPictoComponent implements OnInit {

  lemmatisedText: string[] = [];
  isTranslated: boolean = false;
  isTranscripted: boolean = false;
  transcript : string = "";
  translation_test: string[] = [];
  isLoading: boolean = false;

  constructor(private audioTextFileShareService: AudioTextFileShareService,
              private router : Router,
              private apiService: ApiService) { }

  ngOnInit(): void {}

  onFileUpload(event: any) {
      this.translation_test = [];
      this.isTranslated = false;
      this.isLoading = true;
    const file: File = event.target.files[0];
    if (file) {
      this.apiService.processAudio(file).subscribe(
          (response) => {
              this.translation_test = response;
              this.isTranslated = true;
              this.isLoading = false;
          },
          (error) => {
            console.error('Error processing audio:', error);
          }
      );
    }
  }

  // afficherTexteLemmatise() : string {
  //   let texte: string = "";
  //   for (let i = 0; i < this.lemmatisedText.length; i++) {
  //     texte += this.lemmatisedText[i].valueOf();
  //   }
  //   return texte;
  // }

  goToPage(page_name: string) : void {
    if (page_name == "demos") {
      this.router.navigate(['demos']);
    }
    else if (page_name == "text") {
      this.router.navigate(['textToPicto']);
    }
    else if (page_name == "eval") {
      this.router.navigate(['evalDemos']);
    }
  }

}
