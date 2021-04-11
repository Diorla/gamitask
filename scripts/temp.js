const temp = {}

list.forEach(item=> {
    const current = item.number;
    if(temp[current]) temp[current].push(item)
    else temp[current] = [item];
})