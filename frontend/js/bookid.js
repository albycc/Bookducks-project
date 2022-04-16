
export function convertId(bookItem){
    let arr = bookItem.attributes.itemID.split('_');

    const itemIDobject = {
        item:arr[0],
        type:arr[1],
        id:arr[2]
    }

    return itemIDobject
}