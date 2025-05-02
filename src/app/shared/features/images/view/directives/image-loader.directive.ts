import {DestroyRef, Directive, ElementRef, inject, input, OnInit, output, Renderer2} from "@angular/core";
import {ImageService} from "../../data-access/services/image.service";
import {ImageType} from "../../../../../api/model/imageType";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Directive({
  selector: 'img[imageLoader]',
  standalone: true,
})
export class ImageLoaderDirective implements OnInit {
  private static readonly DEFAULT_IMAGE = 'https://placehold.co/400x400.png?text=Немає+Зображення';

  private readonly imageService = inject(ImageService);
  private readonly destroyRef = inject(DestroyRef);

  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

  readonly $imageType = input.required<ImageType>({alias: 'imageType'});
  readonly $title = input.required<string>({alias: 'title'});

  protected readonly imageLoaded = output<File | undefined>();

  ngOnInit() {
    this.imageService.getImage$(this.$imageType(), this.$title())
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(image => {
        if(image == undefined) {
          this.setImgSrc(ImageLoaderDirective.DEFAULT_IMAGE);
        } else {
          this.setLoadedFile(image);
        }
        this.imageLoaded.emit(image);
      });
  }

  private setLoadedFile(file: File) {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.setImgSrc(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  private setImgSrc(imgSrc: string) {
    this.renderer.setAttribute(this.el.nativeElement, 'src', imgSrc);
  }
}
