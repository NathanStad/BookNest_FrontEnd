class Author {
    constructor(data) {
        this.id = data._id;
        this.name = data.name;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }
}

export default Author;