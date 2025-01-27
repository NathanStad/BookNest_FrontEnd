class Comment {
    constructor(props) {
        this.id = props.id;
        this.book_id = props.book_id;
        this.user_id = props.user_id;
        this.content = props.content;
        this.rating = props.rating;
        this.date = props.ceated_at;
    }

    getBookId() {
        return this.book_id;
    }
    static getAllData() {
        return {
            book_id: this.book_id,
            user_id: this.user_id,
            content: this.content,
            rating: this.rating,
            date: this.date
        };
    }
    static updateComment(comment) {
        commentData = useFetchApiCrud(`books/${this.id}/critiques`, import.meta.env.VITE_API_URL);
        send = commentData.update({content: comment.content, rating: comment.rating});
    }
    static deleteComment() {
        commentData = useFetchApiCrud(`books/${this.id}/critiques`, import.meta.env.VITE_API_URL);
        send = commentData.del({id: this.id});
    }
}

export default Comment;