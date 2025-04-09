import { Observable } from 'rxjs';

export const imgToBase64 = (image: File): Observable<string> => {
  return new Observable((subscriber) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => subscriber.next(reader.result as string);
    reader.onerror = (error) => subscriber.error(error);
  });
};
