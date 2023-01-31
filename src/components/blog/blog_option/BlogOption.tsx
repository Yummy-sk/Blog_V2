import { useRouter } from 'next/router';
import { Button, Input, useColorMode } from '@chakra-ui/react';
import { parseTagString } from '@/util';
import * as S from './BlogOption.style';

interface Props {
  keyword: string;
  onChangeKeyword: ({ keyword }: { keyword: string }) => void;
  onSubmitKeyword: ({
    e,
    keyword,
  }: {
    e: React.FormEvent<HTMLFormElement>;
    keyword: string;
  }) => void;
}

export function BlogOption({
  keyword,
  onChangeKeyword,
  onSubmitKeyword,
}: Props) {
  const router = useRouter();
  const { colorMode } = useColorMode();

  const getCurrentPath = ({ asPath }: { asPath: string }) => {
    const path = asPath.split('/');
    return path[path.length - 1];
  };

  const getTitle = ({ currentPath }: { currentPath: string }) => {
    if (currentPath === 'all' || typeof currentPath !== 'string') {
      return 'All Posts';
    }

    return parseTagString({ tag: currentPath });
  };

  const currentTitle = getTitle({
    currentPath: getCurrentPath({ asPath: router.asPath }),
  });

  return (
    <S.Container>
      <S.Row>
        <S.Title>{currentTitle}</S.Title>
        {currentTitle !== 'All Posts' && (
          <S.Button
            currentTheme={colorMode}
            onClick={() => {
              router.push('/blog/all');
            }}>
            All Posts
          </S.Button>
        )}
      </S.Row>

      <S.Form
        currentTheme={colorMode}
        onSubmit={e => onSubmitKeyword({ e, keyword })}>
        <Input
          placeholder='Search Keyword'
          width='100%'
          value={keyword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChangeKeyword({
              keyword: e.target.value,
            })
          }
        />
        <Button variant='outline' size='md' type='submit'>
          Submit
        </Button>
      </S.Form>
    </S.Container>
  );
}
