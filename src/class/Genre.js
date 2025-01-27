
class Genre {
    constructor(data) {
        this.id = data._id;
        this.name = data.name;
    }

    getName() {
        return this.name;
    }

    getId() {
        return this.id;
    }


}

export default Genre;