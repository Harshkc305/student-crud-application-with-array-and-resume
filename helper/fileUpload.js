const multer = require("multer");
const path= require("path");
const fs= require("fs");

class FileUploader{
    constructor({folderName="public/upload", supportedFiles=["application/pdf"],fieldSize=1024 * 1024 * 2}){
        this.folderName= folderName;
        this.supportedFiles= supportedFiles;
        this.fieldSize=fieldSize;

        //check if the folder is exist ,if not  create it

        if(!fs.existsSync(this.folderName)){
            fs.mkdirSync(this.folderName,{recursive: true});
        }
    }

    storage(){
        return multer.diskStorage({
            destination:(req, file, cb)=>{
                console.log(file,"fileeeeee");

                cb(null, this.folderName);
            },
            filename:(req, file, cb)=>{
                let ext= path.extname(file.originalname); //to file extension of old file
                cb(null,Date.now() + "Am" + ext); // uniq name creation
            },
        });
    }

    // set up file filter to only accept the support file type

    fileFilter(){
        return (req, file, callback)=>{
            if(this.supportedFiles.includes(file.mimetype)){
                callback(null, true);
            }else{
                console.log(`please sellect a valid file fornate`)
                callback(null, false);
            }
        }
    }

    //return the muted configuration with dynamic option

    upload(){
        return multer({
            storage: this.storage(),
            fileFilter: this.fileFilter(),
            limits:{
                fileSize: this.fieldSize, // limit the file size
            }
        })
    }
}
module.exports= FileUploader