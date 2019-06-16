export const sendEvent = (category, action, label) => {
    gtag(
        'event',
        action,
        {
            event_category: category,
            event_label: label,
        },
    )
}

export const getSendEventHandler = (category, action, label) => {
    return function sendEventHandler() {
        sendEvent(category, action, label)
    }
}

export const getLocationPageTitle = (location) => {
    const titleArray = document.title.split(' | ')

    if (titleArray[0] === 'npranke') {
        return `${location} | ${titleArray.join(' | ')}`
    }
    return `${location} | ${titleArray.slice(1).join(' | ')}`
}
