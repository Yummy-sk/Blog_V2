import fs from 'fs';
import { Feed } from 'feed';
import { NotionService } from '@/service';

export const generateRSS = async () => {
  try {
    const notionService = new NotionService();
    const posts = await notionService.getPosts({});

    const feed = new Feed({
      title: 'Yeummy-sk Blog',
      description: '성장을 위해 노력하는 개발자 염상권의 블로그입니다.',
      id: 'https://www.yeummy-blog.com/',
      link: 'https://www.yeummy-blog.com/',
      image: `https://www.yeummy-blog.com/favicon.ico`,
      favicon: `https://www.yeummy-blog.com/favicon.ico`,
      copyright: `All rights reserved ${new Date().getFullYear()}, Jatin Sharma`,
      updated: new Date(),
      generator: 'Feed for Node.js',
      feedLinks: {
        rss2: `https://www.yeummy-blog.com/rss/feed.xml`,
        json: `https://www.yeummy-blog.com/rss/feed.json`,
      },
      author: {
        name: 'SangKwon Yeum',
        email: 'kunshup2000@gmail.com',
        link: 'https://twitter.com/NateYeum',
      },
    });

    if (posts) {
      posts.forEach(post_ => {
        feed.addItem({
          title: post_.title,
          link: `https://www.yeummy-blog.com/blog/${post_.id}`,
          date: new Date(post_.createdTime),
          description: post_.description,
        });
      });

      fs.mkdirSync('./public/rss', { recursive: true });
      fs.writeFileSync('./public/rss/feed.xml', feed.rss2());
      fs.writeFileSync('./public/rss/feed.json', feed.json1());
    }
  } catch (e) {
    console.error(e);
  }
};
