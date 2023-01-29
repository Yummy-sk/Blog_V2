import { buildImageUrl } from 'cloudinary-build-url';

interface IGetCdnSrc {
  src: string;
  width: number;
  height: number;
}

export const getCdnSrc = ({ src, width, height }: IGetCdnSrc) => {
  const ROOT_FOLDER_NAME =
    process.env.NEXT_PUBLIC_CLOUDINARY_ROOT_FOLDER || null;

  try {
    if (!ROOT_FOLDER_NAME) throw new Error('No image name found');

    const paths = src.split('/');
    const idx = paths.findIndex(path => path === ROOT_FOLDER_NAME);
    const parsedSrc = paths.slice(idx + 1).join('/');

    return buildImageUrl(parsedSrc, {
      transformations: {
        resize: {
          type: 'scale',
          width,
          height,
        },
      },
    });
  } catch (e) {
    return buildImageUrl('not_found_nz7sch', {
      transformations: {
        resize: {
          type: 'scale',
          width,
          height,
        },
      },
    });
  }
};
