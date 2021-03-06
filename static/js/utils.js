export const getLocationPageTitle = (location) => {
    const titleArray = document.title.split(' | ')

    if (titleArray[0] === 'npranke') {
        return `${location} | ${titleArray.join(' | ')}`
    }
    return `${location} | ${titleArray.slice(1).join(' | ')}`
}

export const sendEvent = (category, action, label, value) => {
    if (typeof value !== 'undefined') {
        gtag(
            'event',
            action,
            {
                event_category: category,
                event_label: label,
                value,
            },
        )
    } else {
        gtag(
            'event',
            action,
            {
                event_category: category,
                event_label: label,
            },
        )
    }
}

export const sendPageview = () => {
    gtag(
        'config',
        process.env.GA,
        {
            page_title: document.title,
            page_path: document.location.pathname + document.location.hash,
            page_location: document.URL,
        },
    )
}

export const getSendEventHandler = (category, action, label, value) => {
    if (typeof value !== 'undefined') {
        return function sendEventHandler() {
            sendEvent(category, action, label, value)
        }
    }

    return function sendEventHandler() {
        sendEvent(category, action, label)
    }
}
