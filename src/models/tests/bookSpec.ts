import { Book, BookStore } from '../book';

const store = new BookStore();

describe('BookStore model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('create method should add a book', async () => {
    const result = await store.create({
      title: 'Bridge to Terabithia',
      total_pages: 250,
      author: 'Katherine Paterson',
      summary: 'Childrens',
    });
    expect(result).toEqual({
      id: 1,
      title: 'Bridge to Terabithia',
      total_pages: 250,
      author: 'Katherine Paterson',
      summary: 'Childrens',
    });
  });
});
