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

export const getWorkbookClickHandler = (component) => {
    return function workbookClickHandler(event) {
        event.preventDefault()
        sendEvent(component, 'navigate', 'workbook')
        alert('Workbook will be here shortly')
    }
}
