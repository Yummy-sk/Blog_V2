import { ListItem, UnorderedList } from '@chakra-ui/react';
import * as S from './HomeDescription.style';

function AboutMe() {
  return (
    <S.Wrapper>
      <S.Title>About me</S.Title>
      <S.Paragraph>
        I’m a Front End Developer located in Korea. I&apos;m interested in UI
        effects, animations and creating intuitive, dynamic user experiences.
      </S.Paragraph>

      <S.Paragraph>
        What excites me most about working in software development is being able
        to design and create things that have purpose and solve real problems. I
        want to solve the problems of the world in software and contribute to a
        better world.
      </S.Paragraph>
    </S.Wrapper>
  );
}

function Skills() {
  return (
    <S.Wrapper>
      <S.Title>Skills</S.Title>
      <S.Inner>
        <UnorderedList>
          <ListItem>JavaScript, TypeScript</ListItem>
          <ListItem>React.js, Next.js</ListItem>
          <ListItem>Redux.js, recoil</ListItem>
          <ListItem>GraphQL</ListItem>
        </UnorderedList>
      </S.Inner>
    </S.Wrapper>
  );
}

export function HomeDescription() {
  return (
    <S.Container>
      <AboutMe />
      <Skills />
    </S.Container>
  );
}
