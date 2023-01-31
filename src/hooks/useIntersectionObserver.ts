import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from 'react';

type RefType = {
  [id: string]: IntersectionObserverEntry;
};

export function useIntersectionObserver({
  setActiveId,
}: {
  setActiveId: Dispatch<SetStateAction<string>>;
}) {
  const ref = useRef<RefType>({});

  // NOTE: Ref에 등록할 엘리먼트를 파싱하여 반환합니다.
  const getElementToRegisterToRef = ({
    headings,
  }: {
    headings: Array<IntersectionObserverEntry>;
  }) => {
    return headings.reduce(
      (acc: RefType, heading: IntersectionObserverEntry) => {
        const { id } = heading.target;

        return { ...acc, ...{ [id]: heading } };
      },
      {},
    );
  };

  // NOTE: 현재 Visible한 Heading을 반환합니다.
  const getVisibleHeading = ({
    headingRef,
  }: {
    headingRef: MutableRefObject<RefType>;
  }) => {
    return Object.keys(headingRef.current)
      .filter((elemetId: string) => {
        const headingElemet = headingRef.current[elemetId];

        return !!(headingElemet && headingElemet.isIntersecting);
      })
      .map((elementId: string) => {
        return headingRef.current[elementId];
      });
  };

  // NOTE: 해당 element의 선후 관계를 알기 위해 특정 element의 인덱스를 가져옵니다.
  const getIndexOfElement = ({
    id,
    headingElements,
  }: {
    id: string;
    headingElements: Array<Element>;
  }) => headingElements.findIndex(heading => heading.id === id);

  const checkScrollDriection = ({
    entry,
  }: {
    entry: IntersectionObserverEntry;
  }) => {
    // get srcoll direction
    const {
      boundingClientRect: { top },
      isIntersecting,
    } = entry;

    return top < 0 && isIntersecting ? 'down' : 'up';
  };

  // NOTE: Active된 리스트 중 가장 앞에 있는 요소를 Active로 간주하여 상태를 변경합니다.
  const setActiveHeading = useCallback(
    ({
      visibleList,
      headingElements,
      scrollDirection,
      setActiveId_,
    }: {
      visibleList: Array<IntersectionObserverEntry>;
      headingElements: Array<Element>;
      scrollDirection: 'up' | 'down';
      setActiveId_: Dispatch<SetStateAction<string>>;
    }) => {
      // NOTE: visible한 요소가 없다면 그냥 리턴
      if (!visibleList.length) return;

      // NOTE: visible한 요소가 하나라면 그 요소를 active로 간주
      if (visibleList.length === 1) {
        const [firstVisibleHeading] = visibleList;
        const {
          target: { id },
        } = firstVisibleHeading;

        setActiveId_(() => id);

        return;
      }

      const sortFunc = (
        a: IntersectionObserverEntry,
        b: IntersectionObserverEntry,
      ) => {
        if (scrollDirection === 'down') {
          return (
            getIndexOfElement({
              id: a.target.id,
              headingElements,
            }) -
            getIndexOfElement({
              id: b.target.id,
              headingElements,
            })
          );
        }

        return (
          getIndexOfElement({
            id: b.target.id,
            headingElements,
          }) -
          getIndexOfElement({
            id: a.target.id,
            headingElements,
          })
        );
      };

      const [sortedVisibleHeadings] = visibleList.sort((a, b) =>
        sortFunc(a, b),
      );

      const {
        target: { id },
      } = sortedVisibleHeadings;

      setActiveId_(() => id);
    },
    [],
  );

  useEffect(() => {
    // NOTE: 요소들을 불러온다.
    const headingElements = Array.from(document.querySelectorAll('h2, h3, h4'));

    const callback = (headings: Array<IntersectionObserverEntry>) => {
      ref.current = getElementToRegisterToRef({
        headings,
      });

      const visibleList = getVisibleHeading({
        headingRef: ref,
      });

      setActiveHeading({
        visibleList,
        headingElements,
        scrollDirection: checkScrollDriection({
          entry: headings[0],
        }),
        setActiveId_: setActiveId,
      });
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: '0px 0px -40% 0px',
    });

    // NOTE: 요소를 observe에 등록한다.
    headingElements.forEach(element => observer.observe(element));

    return () => observer.disconnect();
  }, [setActiveHeading, setActiveId]);
}
