import {inject, Injectable} from "@angular/core";
import {catchError, map, Observable, of, switchMap} from "rxjs";
import {fromPromise} from "rxjs/internal/observable/innerFrom";
import {ImageType} from "../../../../../api/model/imageType";
import {NotifyService} from "../../../notify/data-access/services/notify.service";
import {ImageControllerService} from "../../../../../api/api/imageController.service";

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private readonly imageApi = inject(ImageControllerService);
  private readonly notify = inject(NotifyService);

  getImage$(imageType: ImageType, title: string): Observable<File | undefined> {
    return this.imageApi.getImage(imageType, title, 'response')
      .pipe(
        map(response => {
          const blob = response.body;
          if(blob == undefined) {
            return undefined;
          }
          const contentType = response.headers.get('Content-Type')!;
          return new File([blob], 'image', {type: contentType});
        }),
        catchError(() => of(undefined))
      );
  }

  changeImage$(imageType: ImageType, title: string, image: File | undefined): Observable<boolean> {
    if (image == undefined) {
      return this.deleteImageRequest$(imageType, title);
    }
    return this.setImageRequest$(imageType, title, image);
  }

  uploadNewImage$(imageType: ImageType, title: string, image: File | undefined): Observable<boolean> {
    if (image == undefined) {
      return of(false);
    }
    return this.setImageRequest$(imageType, title, image);
  }

  private setImageRequest$(imageType: ImageType, title: string, image: File): Observable<boolean> {
    return this.getBase64$(image)
      .pipe(
        switchMap(base64 => {
          if (image == undefined || base64 == undefined) {
            return of(true);
          }
          return this.imageApi.setImage(imageType, title, {
            image: base64,
            mimeType: image.type
          });
        }),
        this.notify.notifyError(),
        map(() => true)
      );
  }

  private deleteImageRequest$(imageType: ImageType, title: string): Observable<boolean> {
    return this.imageApi.deleteImage(imageType, title)
      .pipe(
        this.notify.notifyError(),
        map(() => true)
      );
  }

  // private getBase64$(image: File): Observable<string> {
  //   const fileURL = URL.createObjectURL(image);
  //   return fromPromise(imageToBase64(fileURL))
  //     .pipe(
  //       tap(() => {
  //         URL.revokeObjectURL(fileURL);
  //       })
  //     );
  // }

  private getBase64$(image: File): Observable<string> {
    return fromPromise(this.fileToBase64Raw(image));
  }

  private fileToBase64Raw(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(',')[1]; // Remove the data URL prefix
        resolve(base64);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file); // This returns a data URL (with base64)
    });
  }
}
