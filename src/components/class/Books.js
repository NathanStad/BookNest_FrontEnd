import Book from "./Book";
class Books extends Component {
    constructor(props) {
        getAllBooks = () => {
            const booksData = useFetchApiCrud('books', import.meta.env.VITE_API_URL);
            const AllBooksData = booksData.readAll();
            return AllBooksData.books.map(book => new Book(book));
        }
        this.AllBooks = getAllBooks();
    }

    getAllBooks() {
        return this.AllBooks;
    }

    searchBooks(searchTerm) {
        return this.AllBooks.filter(book => book.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    searchBookById(id) {
        return this.AllBooks.find(book => book.id === id);
    }
    searchBooksByAuthor(idAutor) {
        return this.AllBooks.filter(book => book.author.getId().includes(idAutor));
    }

    searchBooksByGenre(idGenre) {
        return this.AllBooks.filter(book => book.genres.map(genre => genre.getId()).includes(idGenre));
    }
    searchBooksByGenres(idsGenres) {
        return this.AllBooks.filter(book => book.genres.map(genre => genre.getId()).some(id => idsGenres.includes(id)));
    }

    searchBooksByDate(date) {
        return this.AllBooks.filter(book => book.publication_date === date);
    }

    searchBooksByRating(rating) {
        return this.AllBooks.filter(book => book.comments.some(comment => comment.rating === rating));
    }

    searchBooksByLocation(location) {
        return this.AllBooks.filter(book => book.location === location);
    }

    addBook(book) {
        bookData = useFetchApiCrud('books', import.meta.env.VITE_API_URL);
        send = bookData.create({title: book.title, author_id: book.author_id, publication_date: book.publication_date, summary: book.summary, cover_image: book.cover_image, location: book.location, genres: book.genres.map(genre => genre.getId())});
        this.AllBooks.push(new Book(send));
    }
}

export default Books;