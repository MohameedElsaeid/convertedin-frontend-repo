export interface Post {
  postId: string;
  postMessage: string;
  createAt: string;
  callToAction: Array<any>;
  instagramEligibility: string;
  attachments?: {
    type: 'image' | 'video';
    data: Array<string>;
    default?: string;
  };
}
