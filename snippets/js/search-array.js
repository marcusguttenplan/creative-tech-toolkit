function search(key, arr){
    for (var i=0; i < arr.length; i++) {
        if (arr[i].uid === key) {
            return arr[i];
        }
    }
}
