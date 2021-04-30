import { utilService } from '../services/util-service.js'
import { LongText } from '../cmps/LongText.jsx'

export class BookDetails extends React.Component {
  state = {
    book: this.props.book,
    isLongTextShown: false
  }

  getKindReading = () => {
    const { pageCount } = this.state.book;
    if (pageCount > 500) return 'Long Reading';
    else if (pageCount > 200) return 'Decent Reading';
    else if (pageCount < 100) return 'Light Reading';
    return '';
  }

  getpublishedTag = () => {
    const { publishedDate } = this.state.book;
    const currYear = new Date().getFullYear();
    if (currYear - publishedDate < 1) return '(New!)'
    else if (currYear - publishedDate > 10) return '(Veteran Book)'
    return '';
  }

  getStyleColorByPrice = () => {
    const { amount } = this.state.book.listPrice;
    if(amount > 150) return 'danger'
    else if(amount < 20) return 'success'
  }

  render() {
    const { book } = this.state
    const { getpublishedTag } = this
    const { getKindReading } = this
    const { isLongTextShown } = this.state
    const { onDeleteBook } = this.props
    const { goBack } = this.props
    return (
      <div className="book-details">
        <img src={book.thumbnail} alt={book.title} />
        {book.listPrice.isOnSale ? <img src='../assets/img/sale.png' /> : ''}
        <p>Title: {book.title}</p>
        <p>SubTitle: {book.subtitle}</p>
        <p>Authours: {book.authors.join(', ')}</p>
        <p>Published on: {`${book.publishedDate} ${getpublishedTag()}`}</p>
        <p>Language: {book.language}</p>
        <p>PageCount: {`${book.pageCount} ${getKindReading()}`}</p>
        <p>Description: <LongText desc={book.description} isLongTextShown={isLongTextShown} /></p>
        <p>Price: 
          <span className={this.getStyleColorByPrice()}>
            {`${utilService.getCurrencySymbol(book.listPrice.currencyCode)}${book.listPrice.amount}`}
          </span>
        </p>
        <button onClick={goBack}>Go back</button>
        <button onClick={() => onDeleteBook(book.id)}>Delete Book</button>
      </div>
    )
  }
}
