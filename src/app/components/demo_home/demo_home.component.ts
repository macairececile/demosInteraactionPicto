import { Component, OnInit } from '@angular/core';
import { AudioTextFileShareService } from "../../services/audioTextFileShare/audio-text-file-share.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-speech-to-picto',
  templateUrl: './demo_home.component.html',
  styleUrls: ['./demo_home.component.css']
})
export class DemoHomeComponent implements OnInit {

  lemmatisedText: string[] = [];

  constructor(private audioTextFileShareService: AudioTextFileShareService,
              private router: Router) { }

  ngOnInit(): void {
    this.audioTextFileShareService.lemmatisedText$.subscribe((text: string[]) => {
      this.lemmatisedText = text;
    });
  }

  afficherTexteLemmatise() : string {
    let texte: string = "";
    for (let i = 0; i < this.lemmatisedText.length; i++) {
      texte += this.lemmatisedText[i].valueOf();
    }
    return texte;
  }

  goToPage(page_name: string) : void {
    if (page_name == "speech") {
      this.router.navigate(['speechToPicto']);
    }
    else if (page_name == "text") {
      this.router.navigate(['textToPicto']);
    }
    else if (page_name == "picto") {
      this.router.navigate(['picto']);
    }
  }
}


