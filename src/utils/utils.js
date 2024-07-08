export function nameToWebsite(name) {
    if (!name) {
        return '';
    }
    return `@${name.toLowerCase().replace(/\s/g, '-')}`;
}
