const hatTableHeight = 15;

export const itemStyle = {
    border: '1px solid rgba(0, 191, 255, 0.5)',
    borderRadius: 3,
    marginTop: 1,
    cursor: 'pointer',
    height: 40,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 10
}

export const itemNormStyle = {
    backgroundColor: 'rgba(0, 191, 255, 0.1)'
}

export const itemHoveredStyle = {
    backgroundColor: 'rgba(0, 191, 255, 0.3)'
}

export const elementStyle = {
    width: '20%',
    height: '50%',
    boxSizing: 'border-box',
    float: 'left',
    paddingTop: '2px',
    paddingLeft: '2px',
    paddingRight: '2px',
    border: '1px solid #000099',
    borderTopRightRadius: 5
}

export const hatTableStyle = {
    width: '100%',
    height: hatTableHeight + '%',
    borderBottom: '1px solid #000099',
    backgroundColor: 'rgba(0, 191, 255, 0.7)',
    display: 'table',
    borderTopRightRadius: 5,
}

export const hatStyle = {
    textAlign: 'center',
    display: 'table-cell',
    verticalAlign: 'middle'
}

export const listStyle = {
    overflow: 'auto',
    height: (100 - hatTableHeight) + '%',
    paddingBottom: 1,
    boxSizing: 'border-box'
}