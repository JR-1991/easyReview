export function capitalizeFirstLetter(name: string) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

export function cleanAndCapitalize(name: string) {
    return capitalizeFirstLetter(name.replace(/_/g, " "));
}