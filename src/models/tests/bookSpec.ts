import { Book, BookStore } from '../book';

const store = new BookStore();

describe('BookStore model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });
  it('should have an show method', () => {
    expect(store.show).toBeDefined();
  });
  it('should have an create method', () => {
    expect(store.create).toBeDefined();
  });
  it('should have an show method', () => {
    expect(store.delete).toBeDefined();
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

  it('show method should show the correct book', async () => {
    const result = await store.show('1');
    expect(result).toEqual({
      id: 1,
      title: 'Bridge to Terabithia',
      total_pages: 250,
      author: 'Katherine Paterson',
      summary: 'Childrens',
    });
  });

  it('delete method should delete the correct book', async () => {
    store.delete('1');
    const result = await store.index()
    expect(result).toEqual([]);
  })
});
