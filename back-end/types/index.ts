type RoundInput = {
    behaviour?: string;
    name: string;
    numberOfTables: number|null;
    ranked: boolean;
}

type PlayerInput = {
    firstName: string;
    lastName: string;
}

export {
    RoundInput,
    PlayerInput,
}