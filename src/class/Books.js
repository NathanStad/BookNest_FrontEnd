import Book from "./Book.js";
import {useFetchApiCrud} from "../data/useFetchApiCRUD";

class Books {
    constructor() {
        this.apiUrl = import.meta.env.VITE_API_URL; // URL de base de l'API
        this.books = []; // Tableau pour stocker les instances de livres
        this.loading = true; // Indique si les livres sont en cours de chargement
        this.error = null; // Stocke les erreurs éventuelles

        // Exécute la récupération des livres lors de l'initialisation
        this.init();
    }

    async init() {
        try {
            await this.getAllBooks();
        } catch (error) {
            this.error = error;
            console.error("Erreur lors de l'initialisation des livres :", error);
        } finally {
            this.loading = false; // Indique que le chargement est terminé
        }
    }

    async getAllBooks() {
        const apiUrl = this.apiUrl; // URL de base de l'API
        let currentPage = 1;
        let totalPages = 6; // Par défaut, à ajuster selon les données retournées
    
        while (currentPage <= totalPages) {
            try {
                const response = await fetch(`${apiUrl}books?page=${currentPage}&limit=6`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json', // Ajoutez d'autres en-têtes si nécessaire
                    },
                });
    
                // Vérifier si la réponse est correcte
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
    
                const data = await response.json(); // Convertir la réponse en JSON
                
                // Vérifier que les données contiennent les livres et les méta-informations
                const { books, meta } = data || {};
                if (!books || !meta) {
                    throw new Error("Données invalides : livres ou méta-informations manquantes");
                }
                
                // Ajouter les livres récupérés à la liste
                this.books.push(...books.map(book => new Book(book)));
    
    
                // Mettre à jour la pagination
                currentPage++;
                totalPages = meta.pages || totalPages; // Met à jour le total des pages si nécessaire
    
            } catch (err) {
                console.error(`Erreur lors de la récupération des livres (page ${currentPage}) :`, err);
                break; // Arrêter la boucle en cas d'erreur
            }
        }
    
        return this.books; // Retourner les livres récupérés
    }

    getBooks() {
        return this.books;
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


    addBook(book) {
        bookData = useFetchApiCrud('books', import.meta.env.VITE_API_URL);
        const {data} = bookData.create({title: book.title, author_id: book.author_id, publication_date: book.publication_date, summary: book.summary, cover_image: book.cover_image, location: book.location, genres: book.genres.map(genre => genre.getId())});
        this.AllBooks.push(new Book(data));
    }
}

export default Books;