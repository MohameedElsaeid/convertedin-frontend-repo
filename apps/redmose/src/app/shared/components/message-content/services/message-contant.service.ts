import { Injectable } from '@angular/core';
import { MessageBinding } from '@redmose/shared/api';

@Injectable()
export class MessageContentService {
  //#region Declerations
  private _replacements: Object = new Object();
  private _replacementRegex!: RegExp;
  private _trackUrl: MessageBinding | undefined;
  messageData: { text: string; replaceText: string; caretIndex: number } = {
    caretIndex: 0,
    replaceText: '',
    text: '',
  };
  //#endregion

  //#region Methods
  init(text?: string, replaceText?: string): void {
    this.messageData.text = text || '';
    this.messageData.replaceText = replaceText || '';
  }

  createReplacements(messageBindings: Array<MessageBinding>): void {
    messageBindings.forEach((message) => {
      this._replacements[message.parameter] = message.value;
    });

    this._replacementRegex = new RegExp(
      Object.keys(this._replacements).join('|'),
      'gi'
    );
  }

  updateCaret(newValue: number): void {
    this.messageData.caretIndex = newValue;
  }

  replaceTags(text: string): string {
    return text.replace(this._replacementRegex, (matched) => {
      return this._replacements[matched] ?? matched;
    });
  }

  addMessageAttribute(message: MessageBinding): void {
    if (message.parameter.includes('track_url')) {
      this.processTrackUrl(message);
    } else {
      this.insertText(message.parameter);
      this.messageData.replaceText = this.replaceTags(this.messageData.text);

      if (this.messageData.text.includes('track_url')) {
        this.messageData.replaceText = this.messageData.replaceText =
          this.messageData.replaceText.replace(
            this._trackUrl.parameter,
            this._trackUrl.value
          );
      }
    }
  }

  processTrackUrl(message: MessageBinding): void {
    this._trackUrl
      ? (this.messageData.text = this.messageData.text.replace(
          this._trackUrl.parameter,
          message.parameter
        ))
      : this.insertText(message.parameter);

    this._trackUrl = message;
    this.messageData.replaceText = this.replaceTags(
      this.messageData.text
    ).replace(this._trackUrl.parameter, this._trackUrl.value);
  }

  insertText(text: string): void {
    this.messageData.text =
      this.messageData.text.slice(0, this.messageData.caretIndex) +
      ' ' +
      text +
      this.messageData.text.slice(this.messageData.caretIndex);
  }

  inputChange(): void {
    this.messageData.replaceText = this.replaceTags(this.messageData.text);

    this.messageData.text.includes(this._trackUrl?.parameter)
      ? (this.messageData.replaceText = this.messageData.replaceText.replace(
          this._trackUrl.parameter,
          this._trackUrl.value
        ))
      : (this._trackUrl = undefined);
  }
  //#endregion
}
