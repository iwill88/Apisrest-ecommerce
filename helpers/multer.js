import multer from 'multer';


const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, './public/uploaded')
    },
    filename: (req, file, cb) => {
        console.log(file)
        req.imageName = new Date().toISOString().replace(/:/g, '-') + file.originalname
        console.log(req.imageName)
        cb(null, req.imageName)
       
    }
})

const fileFilter = (req, file, cb) => {


    if (file.mimetype === 'image/jpeg' ||file.mimetype === 'image/png') {
        cb(null, true);                
    } else {
        cb(null, false); 
       
    }
}


const upload = multer(
    { storage: storage, 
    limits:{
        fileSize: 1024 * 1024 
    },
    fileFilter: fileFilter
});

export default upload