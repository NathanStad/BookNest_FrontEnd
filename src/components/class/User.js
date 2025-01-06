/**
 * Represents a User.
 */
class User {
    /**
     * Creates a new User.
     * @param {string} username - The username of the user.
     * @param {string} password - The password of the user.
     * @param {string} email - The email of the user.
     */
    constructor(username, password, email) {
        this.id = null;
        this.username = username;
        this.password = password;
        this.email = email;
        this.token = null;
        this.created_at = new Date();
        this.alreadyExists = false;
    }

    /**
     * Validates the user data.
     * @returns {string[]} An array of error messages, if any.
     */
    validate() {
        const errors = [];

        if (!this.username || typeof this.username !== 'string' || this.username.length > 50) {
            errors.push('Invalid username');
        } else if (!User.validateUsernameUniqueness(this.username)) {
            errors.push(`Person ${user.username} already exists`);
        }

        if (!this.password || typeof this.password !== 'string' || this.password.length > 1024) {
            errors.push('Invalid password');
        }

        if (!this.email || typeof this.email !== 'string' || this.email.length > 100) {
            errors.push('Invalid email');
        }

        return errors;
    }

    /**
     * Creates a new user.
     * @returns {boolean} True if the user was created, false otherwise.
     */
    static createNewUser() {
        if (this.alreadyExists === false) {
            usersData = useFetchApiCrud('users', import.meta.env.VITE_API_URL);
            usersData.create({
                "username" : this.username, 
                "password" : this.password, 
                "email" : this.email
            });
            return true;
        } else {
            console.log("User already exists");
            return false;
        }
    }

    /**
     * Updates the user data.
     * @param {Object} update - The updated user data.
     * @param {string} update.username - The updated username.
     * @param {string} update.password - The updated password.
     * @param {string} update.email - The updated email.
     * @returns {boolean} True if the user was updated, false otherwise.
     */
    static updataUser(update) {
        if (this.token !== null) {
            usersData = useFetchApiCrud('users', import.meta.env.VITE_API_URL);
            usersData.update({
                "id" : this.id,
                "username" : update.username, 
                "password" : update.password, 
                "email" : update.email
            });
            return true;
        } else {
            console.log("You are not logged in");
            return false;
        }
    }

    /**
     * Logs in the user.
     * @returns {boolean|string} True if the user was logged in, false otherwise or a message if user not found.
     */
    static login() { 
        validate();
        if(token === null) {
            if(this.email !== "") {
                if(this.password !== "") {
                    usersData = useFetchApiCrud('users', import.meta.env.VITE_API_URL);
                    allUsers = usersData.readAll();
                    if (allUsers.length > 0) {
                        for (let i = 0; i < allUsers.length; i++) {
                            if (allUsers[i].email === this.email) {
                                if (allUsers[i].password === this.password) {
                                    data = usersData.login({
                                        "email" : allUsers[i].email, 
                                        "password" : allUsers[i].password
                                    });
                                    this.token = data.token;
                                    this.alreadyExists = true;
                                    this.id = allUsers[i].id;
                                } else {
                                    console.log("Incorrect password");
                                    return false;
                                }
                            } else {
                                return "User not found";
                            }
                        }
                    }
                }
            }
        } else {
           console.log("You are already logged in");
           return false;
        }
    }

    /**
     * Gets the username of the user.
     * @returns {string} The username of the user.
     */
    static getUsername() {
        return this.username;
    }

    /**
     * Gets the email of the user.
     * @returns {string} The email of the user.
     */
    static getEmail() {
        return this.email;
    }

    /**
     * Deletes the user.
     * @returns {boolean} True if the user was deleted, false otherwise.
     */
    static deleteUser() {
        if (this.token !== null) {
            usersData = useFetchApiCrud('users', import.meta.env.VITE_API_URL);
            usersData.delete({
                "id" : this.id
            });
            this.id = null;
            this.username = null;
            this.password = null;
            this.email = null;
            this.token = null;
            this.created_at = null;
            this.alreadyExists = false;
            return true;
        } else {
            console.log("You are not logged in");
            return false;
        }
    }

    /**
     * Sets a book as read by the user.
     * @param {Object} book - The book to set as read.
     * @param {string} book.getId - The ID of the book.
     * @returns {Object} The response data.
     */
    static setBooksRead(book) {
        if (this.token !== null) {
            data = useFetchApiCrud(`users/${this.id}/already-read`, import.meta.env.VITE_API_URL);
            allBooks = usersData.create({
                "user_id" : this.id,
                "book_id" : book.getId()
            });
            return allBooks;
        } else {
            console.log("You are not logged in");
            return false;
        }
    }

    /**
     * Gets all books read by the user.
     * @returns {Books|boolean} The books read by the user or false if not logged in.
     */
    static getAllBooksRead() {
        if (this.token !== null) {
            data = useFetchApiCrud(`users/${this.id}/already-read`, import.meta.env.VITE_API_URL);
            allBooks = usersData.readAll(this.id);
            let books = new Books(allBooks);
            return books;
        } else {
            console.log("You are not logged in");
            return false;
        }
    }

    /**
     * Deletes a book from the user's read list.
     * @param {Object} book - The book to delete.
     * @param {string} book.getId - The ID of the book.
     * @returns {Object} The response data.
     */
    static deleteBooksRead(book) {
        if (this.token !== null) {
            data = useFetchApiCrud(`users/${this.id}/already-read`, import.meta.env.VITE_API_URL);
            dataFin = usersData.del({
                "user_id" : this.id,
                "book_id" : book.getId()
            });
            return dataFin;
        } else {
            console.log("You are not logged in");
            return false;
        }
    }

    /**
     * Sets a book as a favorite for the user.
     * @param {Object} book - The book to set as a favorite.
     * @param {string} book.getId - The ID of the book.
     * @returns {Object} The response data.
     */
    static setFavorites(book) {
        if (this.token !== null) {
            data = useFetchApiCrud(`users/${this.id}/favorites`, import.meta.env.VITE_API_URL);
            allBooks = usersData.create({
                "user_id" : this.id,
                "book_id" : book.getId()
            });
            return allBooks;
        } else {
            console.log("You are not logged in");
            return false;
        }
    }

    /**
     * Gets all favorite books of the user.
     * @returns {Books|boolean} The favorite books of the user or false if not logged in.
     */
    static getAllFavorites() {
        if (this.token !== null) {
            data = useFetchApiCrud(`users/${this.id}/favorites`, import.meta.env.VITE_API_URL);
            allBooks = usersData.readAll(this.id);
            let books = new Books(allBooks);
            return books;
        } else {
            console.log("You are not logged in");
            return false;
        }
    }

    /**
     * Deletes a book from the user's favorites.
     * @param {Object} book - The book to delete.
     * @param {string} book.getId - The ID of the book.
     * @returns {Object} The response data.
     */
    static deleteFavorites(book) {
        if (this.token !== null) {
            data = useFetchApiCrud(`users/${this.id}/favorites`, import.meta.env.VITE_API_URL);
            dataFin = usersData.del({
                "user_id" : this.id,
                "book_id" : book.getId()
            });
            return dataFin;
        } else {
            console.log("You are not logged in");
            return false;
        }
    }

    /**
     * Sets a book in the user's wishlist.
     * @param {Object} book - The book to set in the wishlist.
     * @param {string} book.getId - The ID of the book.
     * @returns {Object} The response data.
     */
    static setWishlist(book) {
        if (this.token !== null) {
            const data = useFetchApiCrud(`users/${this.id}/wishlist`, import.meta.env.VITE_API_URL);
            const allBooks = data.create({
                "user_id": this.id,
                "book_id": book.getId()
            });
            return allBooks;
        } else {
            console.log("You are not logged in");
            return false;
        }
    }

    /**
     * Gets all books in the user's wishlist.
     * @returns {Books|boolean} The books in the wishlist or false if not logged in.
     */
    static getAllWishlist() {
        if (this.token !== null) {
            const data = useFetchApiCrud(`users/${this.id}/wishlist`, import.meta.env.VITE_API_URL);
            const allBooks = data.readAll(this.id);
            const books = new Books(allBooks);
            return books;
        } else {
            console.log("You are not logged in");
            return false;
        }
    }

    /**
     * Deletes a book from the user's wishlist.
     * @param {Object} book - The book to delete.
     * @param {string} book.getId - The ID of the book.
     * @returns {Object} The response data.
     */
    static deleteWishlist(book) {
        if (this.token !== null) {
            const data = useFetchApiCrud(`users/${this.id}/wishlist`, import.meta.env.VITE_API_URL);
            const dataFin = data.del({
                "user_id": this.id,
                "book_id": book.getId()
            });
            return dataFin;
        } else {
            console.log("You are not logged in");
            return false;
        }
    }
}

module.exports = User;