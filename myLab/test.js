var imageToSlices = require('image-to-slices');
 
var lineXArray = [100, 200];
var lineYArray = [100, 200];
var source = 'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwjk9pLTmMzlAhUFG6YKHcglAqgQjRx6BAgBEAQ&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F5981411991334782%2F&psig=AOvVaw3s28HHYcO2L1r3lV-O9sF4&ust=1572806959232664'; // width: 300, height: 300
 
imageToSlices(source, lineXArray, lineYArray, {
    saveToDir: '.'
}, function() {
    console.log('the source image has been sliced into 9 sections!');
});