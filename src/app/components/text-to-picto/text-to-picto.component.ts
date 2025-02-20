import {Component, OnInit} from '@angular/core';
import {AudioTextFileShareService} from "../../services/audioTextFileShare/audio-text-file-share.service";
import {Router} from "@angular/router";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-text-to-picto',
  templateUrl: './text-to-picto.component.html',
  styleUrls: ['./text-to-picto.component.css']
})
export class TextToPictoComponent implements OnInit {

  lemmatisedText: string[] = [];
  inputText: string = '';
  isTranslated: boolean = false;
  isLoading: boolean = false;
  translation_test: string[] = [];

  constructor(private audioTextFileShareService: AudioTextFileShareService,
              private router: Router,
              private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.audioTextFileShareService.lemmatisedText$.subscribe((text: string[]) => {
      this.lemmatisedText = text;
    });
  }

  onSubmitText() {
    this.translation_test = [];
    this.isTranslated = false;
    this.isLoading = true;
    this.apiService.processText(this.inputText).subscribe(
        (response) => {
            this.translation_test = response
            this.isTranslated = true;
            this.isLoading = false;
        },
        (error) => {
          console.error('Error processing text:', error);
        }
    );
  }

  onClickTexte(): void {
    if (this.inputText) {
      console.log(this.inputText)
      this.isTranslated = true;
    } else {
      this.isTranslated = false;
    }
  }

  afficherTexteLemmatise(): string {
    let texte: string = "";
    for (let i = 0; i < this.lemmatisedText.length; i++) {
      texte += this.lemmatisedText[i].valueOf();
    }
    return texte;
  }

  goToPage(page_name: string): void {
    if (page_name == "hubpictos") {
      this.router.navigate(['hubpictos']);
    } else if (page_name == "picto") {
      this.router.navigate(['picto']);
    } else if (page_name == "speech") {
      this.router.navigate(['speechToPicto']);
    }
  }

}
