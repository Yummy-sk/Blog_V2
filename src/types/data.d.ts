import { TextRichTextItemResponse } from '@notionhq/client/build/src/api-endpoints';

type Merge<A, B> = {
  [K in keyof A]: K extends keyof B ? B[K] : A[K];
} & B extends infer O
  ? { [K in keyof O]: O[K] }
  : never;

type SelectTypes = {
  id: string;
  name: string;
  color: string;
};

type TitleResponse = {
  type: 'title';
  title: Array<TextRichTextItemResponse>;
  id: string;
};

type DescriptionResponse = {
  type: 'rich_text';
  rich_text: Array<TextRichTextItemResponse>;
  id: string;
};

type NumberResponse = {
  type: 'number';
  number: number;
  id: string;
};

type MultiSelectResponse = {
  type: 'multi_select';
  multi_select: Array<SelectTypes>;
  id: string;
};

type CreatedTimeResponse = {
  type: 'date';
  date: {
    start: string;
    end: string | null;
    time_zone: null;
  };
  id: string;
};

type CoverImageResponse = {
  type: 'external';
  external: {
    url: string;
  };
};

type BlogListTypes = {
  title: string;
  description: string;
  number: number;
  tags: Array<string>;
  createdTime: string;
};

type BlogListProps = Merge<BlogListTypes, { id: string }>;

type BlogDetailProps = Merge<BlogListProps, { cover: string }>;

interface BlogPageProps {
  detail: BlogDetailProps;
  content: string;
}
