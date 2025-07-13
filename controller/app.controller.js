const EmpModel = require("../models/emp.models")
const fs= require("fs")
const path= require("path")


class appcontroller{

    async form(req, res){
        try{
            res.render("form",{
                title: "form page"
            })

            // res.send("hello harsh how are you")

        }catch (err){
            throw err
        }
    }

    async submitform(req, res){
        try{
            
            // console.log("hello .........................harsh"),
            
            // console.log(req,"request form data"),
            // console.log(req.body,"req........body")

            const resume= req.file.filename;

            const { skills } = req.body; 

            const skillsArr= skills.split(",").map(skill => skill.trim()).filter(Boolean); 

            console.log(req.file,"file naaaame")

            const saveData= await EmpModel.create({...req.body,resume: resume,skills: skillsArr});
            console.log(saveData,"saveData........")
            res.redirect("/list")
          


        }catch (err){
            throw err
        }
    }



    

        async downloadResume(req, res) {
            try {
                const { filename } = req.params;
                const filePath = path.join(__dirname, "../public/upload", filename);

                if (!fs.existsSync(filePath)) {
                    return res.status(404).send("File not found");
                }

                res.download(filePath);
            } catch (error) {
                
            }
        }

//----------------------
//     async submitform(req, res){
//     try {
//         const resume = req.file.filename;
//         const { skills } = req.body; // ✅ FIX: extract skills from form body

//         const skillsArr = skills.split(",").map(skill => skill.trim()).filter(Boolean); 

//         console.log(req.file, "file naaaame");

//         const saveData = await EmpModel.create({ ...req.body, resume: resume, skills: skillsArr });

//         console.log(saveData, "saveData........");
//         res.redirect("/list");

//     } catch (err) {
//         throw err;
//     }
// }
//-------------------------------------
    



    async getlist(req, res){
        try{
            

            const allData= await EmpModel.find({ isDeleted: false});
            // console.log(allData,"alldataisshow ")


            res.render("list",{
                allData,
                title: "list form"
            })
          


        }catch (err){
            throw err
        }

    }
    async showEditForm(req, res){
        try{
            
            

            const data= await EmpModel.findOne({_id: req.params.id});
            console.log(data,"edit all data.........")

            res.render("edit",{
                data,
                title: "edit form"
            })
          


        }catch (err){
            throw err
        }

    }

    async updateData(req, res){
        try{
            const {id, skills}= req.body;

            const skillsArr= skills.split(",").map(skill => skill.trim()).filter(Boolean);
            
            let updateObj ={...req.body, skills: skillsArr}
            
            const existingUser= await EmpModel.findById(id);

            // if(req.file){

            //     const oldResumePath= path.join(__dirname,"../public/upload", existingUser.resume);

            //     if(fs.existsSync(oldResumePath)){
            //         fs.unlinkSync(oldResumePath);
            //         console.log("old resume was deleted", existingUser.resume);

            //     }

            //     updateObj.resume= req.file.filename;
            // }

            if (req.file) {
                const oldResumePath = path.join(__dirname, "../public/upload", existingUser.resume);

                // Check if it's a different file before deleting
                if (fs.existsSync(oldResumePath) && existingUser.resume !== req.file.filename) {
                    fs.unlinkSync(oldResumePath);
                    console.log("Old resume deleted:", existingUser.resume);
                } else {
                    console.log("New resume uploaded (same name or already overwritten):", req.file.filename);
                }

                updateObj.resume = req.file.filename;
            }




            // const resume = req.file ? req.file.filename : undefined;

            // let updateObj ={...req.body, skills: skillsArr, resume: resume}

            //  delete updateObj.id;

            if(res.file){
                const oldResumeParh= path.join(__dirname,"../public/upload",)
            }


            const updateData= await EmpModel.findByIdAndUpdate(id, updateObj);
            // console.log(updateData,"update data...........")
            res.redirect(`/list`)

        }catch (err){

        }
    }

    async softDelete(req,res){
        try{
            const softDelete= await EmpModel.findByIdAndUpdate(req.params.id,{ isDeleted: true});
            console.log(softDelete,"soft delete...........")
            res.redirect(`/list`)

        }catch (err){
            throw err
        }
    }

//     async softDelete(req, res) {
//     try {
//         const { id } = req.params;

//         const softDelete = await EmpModel.findByIdAndUpdate(id, { isDeleted: true });

//         if (!softDelete) {
//             return res.status(404).send("User not found");
//         }

//         console.log(softDelete, "soft delete...........");
//         res.redirect("/list");

//     } catch (err) {
//         console.error("Soft delete error:", err);
//         res.status(500).send("Internal server error");
//     }
// }


    


}
module.exports=new appcontroller