import Author from "./Author";
import Genre from "./Genre";
import Comment from "./Author";
import { c } from "vite/dist/node/types.d-aGj9QkWt";
class Book {
    constructor({ id, title, author_id, publication_date, summary, cover_image, location, genres }) {
      this.title = id;
      this.title = title;
      this.author = author(author_id);
      this.publication_date = publication_date;
      this.summary = summary;
      this.cover_image = cover_image;
      this.location = location;
      this.genres = genres(genres);
      this.comments = getComments();
    }
    genres(ids) {
        const genreData = useFetchApiCrud('genres', import.meta.env.VITE_API_URL);
        return ids.map(id => new Genre(genreData.read(id)));
    }
    author(id) {
        authorData = useFetchApiCrud('authors', import.meta.env.VITE_API_URL);
        data = authorData.read(id);
        return new Author(data);
    }
    getComments() {
        const commentData = useFetchApiCrud(`books/${this.id}/critiques`, import.meta.env.VITE_API_URL);
        const data = commentData.readAll();
        return data.map(comment => new Comment(comment));
    }
    static getAllData() {
      return {
        title: this.title,
        author: this.author.getName(),
        publication_date: this.publication_date,
        summary: this.summary,
        cover_image: this.cover_image,
        location: this.location,
        genres: this.genres.map(genre => genre.name),
        };
    }

    static getAuthor() {
        return this.author;
    }

    static getGenres() {
        return this.genres;
    }

    static getTitle() {
        return this.title;
    }

    static getPublicationDate() {
        return this.publication_date;
    }

    static getLocation() {
        return this.location;
    }

    static addComment(comment) {
        commentData = useFetchApiCrud(`books/${this.id}/critiques`, import.meta.env.VITE_API_URL);
        send = commentData.create({book_id: this.id, user_id: comment.user_id, content: comment.content, rating: comment.rating});
        return send;
    }

    static getAllComments() {
        return this.comments;
    }

  }
  
  export default Book;
  