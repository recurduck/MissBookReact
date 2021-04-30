import { utilService } from '../services/util-service.js'

export function BookPreview({ book, onSelectedBook }) {
  const currencySymbol = utilService.getCurrencySymbol(book.listPrice.currencyCode)
  return (
    <article className="book-preview" onClick={() => onSelectedBook(book)}>
      <img src={book.thumbnail} />
      <p>{book.title}</p>
      <p>Price : {`${currencySymbol}${book.listPrice.amount}`}</p>
    </article>
  )
}