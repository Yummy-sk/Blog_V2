import { DesktopTableOfContents } from '@/components/post/table_of_content/desktop/DesktopTableOfContents';
import { MobileTableOfContents } from '@/components/post/table_of_content/mobile/MobileTableOfContents';
import { useHeadingData, useScreeType } from '@/hooks';

export function TableOfContents() {
  const { headings } = useHeadingData();

  const type = useScreeType();

  return (
    <nav>
      {type === 'desktop' ? (
        <DesktopTableOfContents headings={headings} />
      ) : (
        <MobileTableOfContents headings={headings} />
      )}
    </nav>
  );
}
