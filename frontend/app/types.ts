export interface Dataset {
    id: string,
    metadatablocks: Array<Metadatablock>
    doi: string,
    site_url: string,
    revision: number,
    accepted: boolean,
    date: string,
    reviewer?: string,
}

export interface Metadatablock {
    id: string,
    name: string,
    description?: string,
    primitives: Array<Field>
    compounds: Array<Compound>
}

export interface Compound {
    id: string,
    name: string,
    description?: string,
    accepted: boolean,
    primitives: Array<Field>,
}

export interface Field {
    id: string,
    name: string,
    description?: string,
    accepted: boolean,
    field_type: string,
    chat: Chat,
    history: History,
    value: any
}

export interface History {
    [key: string]: string | number
}

export interface Chat {
    [key: string]: string | number
}

export interface Primitive {
    [key: string]: string | number | boolean
}

export interface Statistic {
    field_count: number,
    accpected_count: number
}