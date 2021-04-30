import { BookPreview } from './BookPreview.jsx'
export function BookList({ books, onSelectedBook }) {
  return (
    <div className="book-list">
      { books.map(book => <BookPreview book={book} key={book.id} onSelectedBook={onSelectedBook} />)} 
    </div>
  )
}