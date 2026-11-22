export class EmailAlreadyExistsError extends Error {
    constructor() {
        super("email already exists")
    }
}
export class EmailOrPasswordError extends Error {
    constructor() {
        super("incorrect email or password")
    }
}

export class UserNotExistError extends Error {
    constructor() {
        super("the user does not exist")
    }
}
