export function nameToWebsite(name) {
    if (!name) {
        return '';
    }
    return `@${name.toLowerCase().replace(/\s/g, '-')}`;
}

export function transUrltoFileName(url) {
    const urlParts = url.split('/'); // 使用 '/' 分割字符串
    const filename = urlParts[urlParts.length - 1]; // 获取最后一个元素
    return filename;
}
