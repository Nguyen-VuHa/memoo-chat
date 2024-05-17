

export const generatorTitlePage = (title) => {
    return `MeMoo | ${title}`
}

export const sizeDrawerByWindowSize = (windowSize) => {
    if(windowSize > 1024) return '50%'
    if(windowSize > 680 && windowSize <= 1024) return '70%'
    if(windowSize < 680) return '100%'
}
