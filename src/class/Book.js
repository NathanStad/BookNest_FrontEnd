import Author from "./Author.js";
import Genre from "./Genre.js";
import Comment from "./Author.js";
class Book {
    constructor(data) {
        
      this.id = data._id;
      this.title = data.title;
      this.author = new Author(data.author_id);
      this.publication_date = data.publication_date;
      this.summary = data.summary;
      this.image = data.cover_image;
      this.genres = data.genres.map(genre => new Genre(genre));      
    }
    static genres(data) {
        return data.map(id => new Genre(genreData.read(id)));
    }
    static author(data) {
        return new Author(data);
    }
    // static getComments(data) {
    //     return data.map(comment => new Comment(comment));
    // }
    static getAllData() {
      return {
        id: this.id,
        title: this.title,
        author: this.author.getName(),
        publication_date: this.publication_date,
        summary: this.summary,
        image: this.image,
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
  