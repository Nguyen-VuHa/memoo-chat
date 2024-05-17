

export const colorByStatus = (status) => {
    let color = ''
    switch (status) {
        case 'active':
            color ='#87d068'
            break;
        case 'deactivate':
            color ='#f50'
            break;
        default:
            break;
    }

    return color
} 