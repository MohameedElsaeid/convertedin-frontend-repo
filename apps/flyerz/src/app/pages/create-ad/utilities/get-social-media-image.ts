import { CreateAdChannelType } from '@flyerz/shared/api';

export const getSocialMediaImg = (id: CreateAdChannelType): string => {
  let img = '';
  switch (id) {
    case CreateAdChannelType.FACEBOOK:
    case CreateAdChannelType.FACEBOOK_INSTAGRAM:
      img = 'assets/icons/common/channels/Facebook.svg';
      break;

    case CreateAdChannelType.INSTAGRAM:
      img = 'assets/icons/common/channels/Instagram.svg';
      break;

    case CreateAdChannelType.GOOGLE:
      img = 'assets/icons/common/channels/google.svg';
      break;

    case CreateAdChannelType.SNAPCHAT:
      img = 'assets/icons/common/channels/snapchat.svg';
      break;

    case CreateAdChannelType.TIKTOK:
      img = 'assets/icons/common/channels/tiktok.svg';
      break;
  }

  return img;
};
