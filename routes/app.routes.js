const route=require("express").Router();
const appcontroller=require("../controller/app.controller")
const FileUploader=require("../helper/fileUpload")



const fileUpload= new FileUploader({
    folderName: "public/upload", supportedFiles:["application/pdf"], fieldSize: 1024 * 1024 * 5
})


// route.get("/",appcontroller.form)
route.get("/",appcontroller.getlist)
route.get("/add",appcontroller.form)

route.post("/submit-form",fileUpload.upload().single("resume"),appcontroller.submitform)
route.get("/list",appcontroller.getlist)
route.get("/edit/:id",appcontroller.showEditForm)
// route.post("/update-form",appcontroller.updateData)
route.post("/update-form", fileUpload.upload().single("resume"), appcontroller.updateData);
route.get("/soft-delete/:id",appcontroller.softDelete)


// download..................
route.get("/resume/:filename", appcontroller.downloadResume);




module.exports= route