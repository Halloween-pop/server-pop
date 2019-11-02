const express = require('express');
const router = express.Router();
const fs = require('fs');

const imageToSlices = require('image-to-slices');

router.get('/:stage', (req, res) => {
    const {stage} = req.params;
    
    // STAGE 1 ~ 3
    if (stage === 1 || stage === 2 || stage ===3) {
        json = {
            1: [
                `'http://3.215.131.244:3000/images/${stage}/1-1.jpg'`,
                `'http://3.215.131.244:3000/images/${stage}/2-1.jpg'`, 
                `'http://3.215.131.244:3000/images/${stage}/3-1.jpg'`, 
                `'http://3.215.131.244:3000/images/${stage}/4-1.jpg'`, 
                `'http://3.215.131.244:3000/images/${stage}/5-1.jpg'`, 
                `'http://3.215.131.244:3000/images/${stage}/6-1.jpg'`, 
                `'http://3.215.131.244:3000/images/${stage}/7-1.jpg'`, 
                `'http://3.215.131.244:3000/images/${stage}/8-1.jpg'`, 
                `'http://3.215.131.244:3000/images/${stage}/9-1.jpg'`, 
                `'http://3.215.131.244:3000/images/${stage}/10-1.jpg'`, 
            ],
            2: [
                `'http://3.215.131.244:3000/images/${stage}/1-2.jpg'`,
                `'http://3.215.131.244:3000/images/${stage}/2-2.jpg'`,
                `'http://3.215.131.244:3000/images/${stage}/3-2.jpg'`,
                `'http://3.215.131.244:3000/images/${stage}/4-2.jpg'`,
                `'http://3.215.131.244:3000/images/${stage}/5-2.jpg'`,
                `'http://3.215.131.244:3000/images/${stage}/6-2.jpg'`,
                `'http://3.215.131.244:3000/images/${stage}/7-2.jpg'`,
                `'http://3.215.131.244:3000/images/${stage}/8-2.jpg'`,
                `'http://3.215.131.244:3000/images/${stage}/9-2.jpg'`,
                `'http://3.215.131.244:3000/images/${stage}/10-2.jpg'`, 
            ],
            3: [
                `'http://3.215.131.244:3000/images/${stage}/1-3.jpg'`,
                `'http://3.215.131.244:3000/images/${stage}/2-3.jpg'`,
                `'http://3.215.131.244:3000/images/${stage}/3-3.jpg'`,
                `'http://3.215.131.244:3000/images/${stage}/4-3.jpg'`,
                `'http://3.215.131.244:3000/images/${stage}/5-3.jpg'`,
                `'http://3.215.131.244:3000/images/${stage}/6-3.jpg'`,
                `'http://3.215.131.244:3000/images/${stage}/7-3.jpg'`,
                `'http://3.215.131.244:3000/images/${stage}/8-3.jpg'`,
                `'http://3.215.131.244:3000/images/${stage}/9-3.jpg'`,
                `'http://3.215.131.244:3000/images/${stage}/10-3.jpg'`,
            ]
        }
        res.send(json);
    } else {
        // STAGE 4 ~ 9

        // initialization imgToSlice
        let lineXArray = [100, 200];
        let lineYArray = [100, 200];
        let source = __dirname + `/../../../public/images/${stage}.jpg`; // width: 300, height: 300

        // slice img
        imageToSlices(source, lineXArray, lineYArray, {
            saveToDir: __dirname + '/../../../public/images/saveImg',
            clipperOptions: {
                canvas: require('canvas')
            }    
        }, () => {
            console.log('9단 자르기!');
        });

        // send to client
        json = {
            // debug in local
            // lst: [
            //     'http://localhost:3000/images/saveImg/section-1.jpg',
            //     'http://localhost:3000/images/saveImg/section-2.jpg',
            //     'http://localhost:3000/images/saveImg/section-3.jpg',
            //     'http://localhost:3000/images/saveImg/section-4.jpg',
            //     'http://localhost:3000/images/saveImg/section-5.jpg',
            //     'http://localhost:3000/images/saveImg/section-6.jpg',
            //     'http://localhost:3000/images/saveImg/section-7.jpg',
            //     'http://localhost:3000/images/saveImg/section-8.jpg',
            //     'http://localhost:3000/images/saveImg/section-9.jpg'
            // ]

            lst: [
                'http://3.215.131.244:3000/images/saveImg/section-1.jpg',
                'http://3.215.131.244:3000/images/saveImg/section-2.jpg',
                'http://3.215.131.244:3000/images/saveImg/section-3.jpg',
                'http://3.215.131.244:3000/images/saveImg/section-4.jpg',
                'http://3.215.131.244:3000/images/saveImg/section-5.jpg',
                'http://3.215.131.244:3000/images/saveImg/section-6.jpg',
                'http://3.215.131.244:3000/images/saveImg/section-7.jpg',
                'http://3.215.131.244:3000/images/saveImg/section-8.jpg',
                'http://3.215.131.244:3000/images/saveImg/section-9.jpg'
            ]
        }
        res.send(json);
    }
})

module.exports = router;
