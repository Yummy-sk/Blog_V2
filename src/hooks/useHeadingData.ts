import { useState, useEffect } from 'react';
import { TocItem } from '@/types/content';

const getNestedHeadings = ({ headings }: { headings: Array<Element> }) => {
  // FIXME: 더 좋은 방법이 있을까..? 재귀는 중첩 관계가 아니기 때문에 재귀도 어려울텐데.. 고민해보자.
  return headings.reduce((acc: Array<TocItem>, heading: Element) => {
    if (heading.tagName === 'H2') {
      return [
        ...acc,
        {
          title: heading.textContent || '',
          id: heading.id,
          children: [],
        },
      ];
    }

    if (heading.tagName === 'H3') {
      const lastHeading = acc[acc.length - 1];

      return [
        ...acc.slice(0, acc.length - 1),
        {
          ...lastHeading,
          children: [
            ...lastHeading.children,
            {
              title: heading.textContent || '',
              id: heading.id,
              children: [],
            },
          ],
        },
      ];
    }

    if (heading.tagName === 'H4') {
      const lastHeading = acc[acc.length - 1];
      let lastChildHeading =
        lastHeading.children[lastHeading.children.length - 1];

      lastChildHeading = {
        ...lastChildHeading,
        children: lastChildHeading?.children || [],
      };

      return [
        ...acc.slice(0, acc.length - 1),
        {
          ...lastHeading,
          children: [
            ...lastHeading.children.slice(0, lastHeading.children.length - 1),
            {
              ...lastChildHeading,
              children: [
                ...lastChildHeading.children,
                {
                  title: heading.textContent || '',
                  id: heading.id,
                  children: [],
                },
              ],
            },
          ],
        },
      ];
    }

    return acc;
  }, []);
};

export function useHeadingData() {
  const [nestedHeadings, setNestedJeadings] = useState<Array<TocItem>>([]);

  useEffect(() => {
    // NOTE: 원하는 헤딩을 가져옵니다.
    const headings = Array.from(document.querySelectorAll('h2, h3, h4'));

    setNestedJeadings(getNestedHeadings({ headings }));
  }, []);

  return { headings: nestedHeadings };
}
