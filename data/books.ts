import { Book } from '../types';

export const bookData: Record<string, Book> = {
  '1': {
    id: '1',
    title: 'مذكراتي',
    author: 'أحمد',
    coverColor: '#3498db',
    style: 'classic',
    dateCreated: '2024-01-01',
    chapters: [
      {
        id: 'ch1',
        title: 'الفصل الأول',
        pages: [
          {
            id: 'p1',
            title: 'اليوم الأول',
            content: 'بدأت اليوم كتابة مذكراتي...',
            date: '2024-01-01'
          },
          {
            id: 'p2',
            title: 'اليوم الثاني',
            content: 'استيقظت باكراً...',
            date: '2024-01-02'
          }
        ]
      },
      {
        id: 'ch2',
        title: 'الفصل الثاني',
        pages: [
          {
            id: 'p3',
            title: 'ذكريات الطفولة',
            content: 'عندما كنت صغيراً...',
            date: '2024-01-03'
          }
        ]
      }
    ]
  }
}; 