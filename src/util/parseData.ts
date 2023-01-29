/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import {
  DescriptionResponse,
  MultiSelectResponse,
  NumberResponse,
  TitleResponse,
  CreatedTimeResponse,
  BlogListTypes,
  CoverImageResponse,
} from '@/types/data';

const getTitle = (data: TitleResponse): string => {
  const [{ plain_text }] = data.title;

  return plain_text;
};

const getDescription = (data: DescriptionResponse): string => {
  const [{ plain_text }] = data.rich_text;

  return plain_text;
};

const getNumber = (data: NumberResponse): number => data.number;

const getTags = (data: MultiSelectResponse): Array<string> => {
  const { multi_select } = data;

  return multi_select.map(tag => tag.name);
};

const getCreatedTime = (data: CreatedTimeResponse): string => data.date.start;

export const getCoverImg = (data: CoverImageResponse): string =>
  data.external.url;

export const parseData = ({
  properties,
}: Pick<PageObjectResponse, 'properties'>): BlogListTypes => {
  return Object.entries(properties).reduce(
    (acc: BlogListTypes, [, val]) => {
      // Note: info의 value 이름을 일반화 할 수 없기 때문에, rest로 처리
      const { id: _, type, ...info } = val;

      // Note: 타입에 따라 분기
      switch (type) {
        case 'title':
          return { ...acc, title: getTitle(info as TitleResponse) };

        case 'rich_text':
          return {
            ...acc,
            description: getDescription(info as DescriptionResponse),
          };

        case 'number':
          return { ...acc, number: getNumber(info as NumberResponse) };

        case 'multi_select':
          return { ...acc, tags: getTags(info as MultiSelectResponse) };

        case 'date':
          return {
            ...acc,
            createdTime: getCreatedTime(info as CreatedTimeResponse),
          };

        default:
          return { ...acc };
      }
    },
    {
      title: '',
      description: '',
      tags: [],
      number: 0,
      createdTime: '',
    },
  );
};
