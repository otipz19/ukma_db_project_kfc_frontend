import {Component, effect, inject, input, output, signal} from '@angular/core';
import {NotifyService} from "../../../../notify/data-access/services/notify.service";
import {NgxFileDropEntry, NgxFileDropModule} from "ngx-file-drop";

@Component({
  selector: 'app-image-drop-zone',
  imports: [
    NgxFileDropModule
  ],
  templateUrl: './image-drop-zone.component.html',
  styleUrl: './image-drop-zone.component.scss'
})
export class ImageDropZoneComponent {
  private static readonly MAX_FILE_SIZE = 2 * 1024 * 1024;
  private static readonly ALLOWED_FILE_TYPES: readonly string[] = ["image/png", "image/jpeg", "image/jpg", "image/gif"] as const;

  private readonly notify = inject(NotifyService);

  protected $imageSrc = signal<string | ArrayBuffer | null>(null);

  readonly $initialFile = input<File | undefined>(undefined, {alias: 'initialFile'});

  protected readonly fileUpdate = output<File | undefined>();

  constructor() {
    effect(() => {
      const initialFile = this.$initialFile();
      if (initialFile) {
        this.loadFilePreview(initialFile);
      }
    });
  }

  protected onDrop(event: NgxFileDropEntry[]) {
    if (event.length > 0) {
      const fileEntry = event[0].fileEntry;
      if (fileEntry.isFile) {
        (fileEntry as FileSystemFileEntry).file(file => {
          if (this.isFileSizeTooBig(file)) {
            this.showFileSizeErrorMessage();
            return;
          }

          if(this.isFileTypeNotAllowed(file)) {
            this.showFileTypeErrorMessage();
            return;
          }

          this.loadFilePreview(file);
          this.fileUpdate.emit(file);
        });
      }
    }
  }

  private loadFilePreview(file: File) {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.$imageSrc.set(reader.result);
    };
    reader.readAsDataURL(file);
  }

  private isFileSizeTooBig(file: File) {
    return file.size > ImageDropZoneComponent.MAX_FILE_SIZE;
  }

  private showFileSizeErrorMessage() {
    this.notify.showError('Файл надто великий. Максимальний розмір файлу: ' + ImageDropZoneComponent.MAX_FILE_SIZE);
  }

  private isFileTypeNotAllowed(file: File) {
    return !ImageDropZoneComponent.ALLOWED_FILE_TYPES.includes(file.type);
  }

  private showFileTypeErrorMessage() {
    this.notify.showError('Недопустимий формат файлу. Допустимі формати: ' + ImageDropZoneComponent.ALLOWED_FILE_TYPES.toString());
  }

  protected onRemove(event: MouseEvent) {
    event.stopPropagation();
    this.$imageSrc.set(null);
    this.fileUpdate.emit(undefined);
  }
}
