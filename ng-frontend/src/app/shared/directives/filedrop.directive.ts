import {
  Directive,
  HostBinding,
  HostListener,
  Output,
  EventEmitter,
} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appFileDrop]',
})
export class FileDropDirective {
  @Output() filesDropped = new EventEmitter<File>();
  @Output() filesHovered = new EventEmitter<boolean>();

  @HostBinding('style.background') private background = '#f5fcff';

  @HostListener('dragover', ['$event']) onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#9ecbec';
    this.filesHovered.emit(true);
  }

  @HostListener('dragleave', ['$event']) onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#f5fcff';
    this.filesHovered.emit(false);
  }

  @HostListener('drop', ['$event']) onDrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#f5fcff';
    const file = evt.dataTransfer?.files[0];
    this.filesDropped.emit(file);
    this.filesHovered.emit(false);
  }
}
