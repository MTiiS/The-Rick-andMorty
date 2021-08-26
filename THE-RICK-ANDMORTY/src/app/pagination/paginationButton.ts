export class PaginationButton {

id: number;
text;
isActive;
isDisabled;

  constructor(id: number, text: string, isActive = false, isDisabled = false) {
    this.id = id;
    this.text = text;
    this.isActive = isActive;
    this.isDisabled = isDisabled;
  }
}