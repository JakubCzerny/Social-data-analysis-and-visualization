add = function(a, b) {
    return a+b
}

getData = function(dataset){
    var values = d3.values(dataset)
    var crimesDistrict = []
    for(var i=0; i<values.length; i++){
      crimesDistrict[i] = values[i][0] + values[i][1]
    }
    total = crimesDistrict.reduce(add,0);
    var keys   = d3.keys(dataset)
    var data = []
    for(var i=0; i<values.length; i++){
      data.push([values[i], keys[i]])
    }

    return data
}
