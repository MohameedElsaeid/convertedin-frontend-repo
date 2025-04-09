import {
  HttpEvent,
  HttpResponse,
  HttpEventType,
  HttpProgressEvent,
} from '@angular/common/http';

export interface Upload {
  progress: number;
  state: UploadState;
}
export type UploadState = 'PENDING' | 'IN_PROGRESS' | 'DONE';
export const initialUploadState: Upload = { state: 'PENDING', progress: 0 };

export const calculateState = (
  upload: Upload,
  event: HttpEvent<unknown>
): Upload => {
  if (isHttpProgressEvent(event)) {
    return {
      progress: event.total
        ? Math.round((100 * event.loaded) / event.total)
        : upload.progress,
      state: 'IN_PROGRESS',
    };
  }
  if (isHttpResponse(event)) {
    return {
      progress: 100,
      state: 'DONE',
    };
  }
  return upload;
};

function isHttpResponse<T>(event: HttpEvent<T>): event is HttpResponse<T> {
  return event.type === HttpEventType.Response;
}

function isHttpProgressEvent(
  event: HttpEvent<unknown>
): event is HttpProgressEvent {
  return (
    event.type === HttpEventType.DownloadProgress ||
    event.type === HttpEventType.UploadProgress
  );
}
