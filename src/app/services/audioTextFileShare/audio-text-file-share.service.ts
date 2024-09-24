import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioTextFileShareService {
  private lemmatisedTextSource = new BehaviorSubject<string[]>([]);
  lemmatisedText$ = this.lemmatisedTextSource.asObservable();

  setLemmatisedText(text: string[]) {
    this.lemmatisedTextSource.next(text);
  }

  private translatedSource = new BehaviorSubject<boolean>(true);
  translated$ = this.translatedSource.asObservable();

  private transcriptSource = new BehaviorSubject<boolean>(false);
  transcript$ = this.transcriptSource.asObservable();

  private transcription = new BehaviorSubject<string>('');
  transcription_whisper$ = this.transcription.asObservable();

  setTranslated(value: boolean) {
    this.translatedSource.next(value);
  }

  setTranscript(value: boolean) {
    this.transcriptSource.next(value);
  }

  setTranscription(text: string) {
    this.transcription.next(text);
  }

}
