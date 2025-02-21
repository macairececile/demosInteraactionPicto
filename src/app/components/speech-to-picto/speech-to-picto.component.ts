import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { AudioTextFileShareService } from "../../services/audioTextFileShare/audio-text-file-share.service";
import {Router} from "@angular/router";
import {ApiService} from "../../services/api.service";
import {AudioRecorderService} from "../../services/audioRecorder/audio-recorder.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-speech-to-picto',
  templateUrl: './speech-to-picto.component.html',
  styleUrls: ['./speech-to-picto.component.css']
})
export class SpeechToPictoComponent implements OnInit {

  @ViewChild('fileInput') fileInput!: ElementRef;

  lemmatisedText: string[] = [];
  isTranslated: boolean = false;
  isTranscripted: boolean = false;
  transcript : string = "";
  translation_test: string[] = [];
  isLoading: boolean = false;
  isRecording: boolean = false;
    recordedSongToListen: any = "";
    sendSound: boolean = false;
    disableAddSongButton: boolean = true;
    buttonAdd: string = "";
    showRecord: boolean = false;

  constructor(private audioTextFileShareService: AudioTextFileShareService,
              private audioRecorderService: AudioRecorderService,
              public sanitizer: DomSanitizer,
              private router : Router,
              private apiService: ApiService) { }

  ngOnInit(): void {}

  triggerFileInput(){
      this.showRecord = false;
      this.isTranslated = false;
      this.isLoading = false;
      this.fileInput.nativeElement.click();
  }

  // afficherTexteLemmatise() : string {
  //   let texte: string = "";
  //   for (let i = 0; i < this.lemmatisedText.length; i++) {
  //     texte += this.lemmatisedText[i].valueOf();
  //   }
  //   return texte;
  // }

  goToPage(page_name: string) : void {
    if (page_name == "hubpictos") {
      this.router.navigate(['hubpictos']);
    }
    else if (page_name == "text") {
      this.router.navigate(['textToPicto']);
    }
    else if (page_name == "picto") {
      this.router.navigate(['picto']);
    }
  }

  recordVoice(){
      this.showRecord = true;
      this.isTranslated = false;
      this.isLoading = false;
      this.recordedSongToListen = null;
      this.sendSound = false;
  }
    recording(){
        if (this.isRecording){
            this.stopRecord();
        }else {
            this.startRecord();
        }
    }

    startRecord(){
        this.isRecording = true;
        this.audioRecorderService.startRecording();
    }

    stopRecord(){
        this.isRecording = false;
        this.audioRecorderService.stopRecording();
        setTimeout(() => {
            this.recordedSongToListen = this.sanitizer.bypassSecurityTrustResourceUrl(this.audioRecorderService.audioUrl);
            this.sendSound = true;
        }, 500);
    }

    addSong(){
        this.translation_test = [];
        this.showRecord = false;
        this.isTranslated = false;
        this.isLoading = true;
        this.apiService.processAudio(this.audioRecorderService.audioFile).subscribe(
                (response) => {
                    this.transcript = response[0]
                    this.translation_test = response[1];
                    this.isTranslated = true;
                    this.isLoading = false;
                },
                (error) => {
                    console.error('Error processing audio voice:', error);
                }
            );
        }

    onFileUpload(event: any) {
          this.translation_test = [];
          this.isTranslated = false;
          this.isLoading = true;
          const file: File = event.target.files[0];
          if (file) {
              this.apiService.processAudio(file).subscribe(
                  (response) => {
                      this.transcript = response[0];
                      this.translation_test = response[1];
                      this.isTranslated = true;
                      this.isLoading = false;
                  },
                  (error) => {
                      console.error('Error processing audio file:', error);
                  }
              );
      }
    }
}
