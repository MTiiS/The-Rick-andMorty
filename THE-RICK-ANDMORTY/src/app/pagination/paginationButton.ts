export class PaginationButton {

  id: number;
  text: String;
  isActive: boolean;
  isDisabled: boolean;

  constructor(id: number, text: string, isActive = false, isDisabled = false) {
    this.id = id;
    this.text = text;
    this.isActive = isActive;
    this.isDisabled = isDisabled;
  }
}
