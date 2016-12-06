let promise = new Promise(function(resolve, reject) {
        setTimeout(function() {
            if (true) {
                resolve('success');
            } else {
                reject('error');
            }
        })
    },
    1000);
promise.then((data) => {
    console.log(data)
}, (error) => {
    console.log(error)
});

async function asyncPrint(value, ms) {
    try {
        let result = await timeout(ms);
        console.log(result)
        console.log('success', value)
    } catch (error) {
        console.log('error', value)
    }
}
asyncPrint('hello world', 1500);