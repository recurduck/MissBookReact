import { bookService } from '../services/book-service.js'
import { BookList } from '../cmps/BookList.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookDetails } from '../cmps/BookDetails.jsx'

export class BookApp extends React.Component {
    state = {
        books: null,
        filterBy: null,
        selectedBook: null
    }
    componentDidMount() {
        // console.log('Mount!');
        this.loadBooks()
    }

    loadBooks() {
        bookService.query(this.state.filterBy)
            .then((books) => {
                console.log(books);
                this.setState({ books })
            })
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadBooks)
    }

    onSelectedBook = (book) => {
        this.setState({ selectedBook: book })
    }
    onDeleteBook = (bookId) => {
        bookService.deleteBook(bookId)
        this.onSelectedBook(null)
        this.loadBooks()
    }

    render() {
        // console.log('RENDER!', this.state.cars);
        const { books, selectedBook } = this.state
        if (!books) return <div>Loading...</div>
        return (
            <section>
                <h2>Miss Book</h2>
                {!selectedBook && <React.Fragment>
                    <BookFilter onSetFilter={this.onSetFilter} />
                    <BookList onSelectedBook={this.onSelectedBook} books={books} />
                </React.Fragment>}

                {selectedBook &&
                    <BookDetails book={selectedBook} onDeleteBook={this.onDeleteBook} goBack={() => this.onSelectedBook(null)} />}
            </section>
        )
    }
}