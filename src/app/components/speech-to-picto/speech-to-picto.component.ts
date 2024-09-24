import { Component, OnInit } from '@angular/core';
import { AudioTextFileShareService } from "../../services/audioTextFileShare/audio-text-file-share.service";
import {Router} from "@angular/router";

type PictoData = {
  id: number;
  word: string;
};

const translation_test: PictoData[] = [
  { id: 21917, word: 'plaire' },
  { id: 5397, word: 'heureusement' },
  { id: 4671, word: 'aller_en_excursion_en_autobus' },
  { id: 11709, word: 'au' },
  { id: 2704, word: 'ville' },
  { id: 2704, word: 'ville' },
  { id: 2704, word: 'ville' },
  { id: 2704, word: 'ville' }
];

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
  translation_test = translation_test;

  constructor(private audioTextFileShareService: AudioTextFileShareService,
              private router : Router) { }

  ngOnInit(): void {
    this.audioTextFileShareService.lemmatisedText$.subscribe((text: string[]) => {
      this.lemmatisedText = text;
    });
    this.audioTextFileShareService.translated$.subscribe(value => {
      this.isTranslated = value;
    });

    this.audioTextFileShareService.transcript$.subscribe(value => {
      this.isTranscripted = value;
    });

    this.audioTextFileShareService.transcription_whisper$.subscribe((text: string) => {
      this.transcript = text;
    });

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
