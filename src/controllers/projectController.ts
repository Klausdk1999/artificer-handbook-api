//import { fileUpload } from 'express-fileupload';
import { Request, Response } from "express";
import { nextTick } from "process";
import { projectService } from "../services/projectsService";

async function insert(req: Request, res: Response) {

  const resp = await projectService.insert(req.body);

  res.send(resp).status(201);

}

async function fileSave(req, res) {
  
  let data;
  let uploadPath;
  let id = req.params.id;
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  // The name of the input field (i.e. "data") is used to retrieve the uploaded file
  data = req.files.files;
  uploadPath = __dirname + '/storage/'+ id +". ."+ data.name;

  // Use the mv() method to place the file somewhere on your server
  await req.files.files.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);
  });
  await projectService.saveFile(uploadPath,id,data.name);
  res.sendStatus(201);
};

async function sendFile(req , res) {
  const id = req.params.id;
 
  const file = await projectService.getFile(id);
  try{
    if(file.media===null){
      res.sendStatus(404);
    }else{
    const uploadPath=file.media;
    const fs = require('fs')
    const stream = require('stream')
    const r = fs.createReadStream(uploadPath) // or any other way to get a readable stream
    const ps = new stream.PassThrough() // <---- this makes a trick with stream error handling
    stream.pipeline(
     r,
     ps, 
     (err) => {
      if (err) {
        console.log(err) // No such file or any other kind of error
        return res.sendStatus(400); 
      }
    })
    ps.pipe(res) // <---- this makes a trick with stream error handling
    }
  }catch{
    res.sendStatus(404);
  }
  
}

async function get(req: Request, res: Response) {

  const projects = await projectService.get();

  res.send(projects);
}

async function getByUser(req: Request, res: Response) {
  const { id } = req.params;

  const projects = await projectService.getByUser(Number(id));

  res.send(projects).status(200);
}

async function getById(req: Request, res: Response) {
  const { id } = req.params;

  const project = await projectService.getById(+id);
  res.send(project);
}

export const projectController = {
  insert,
  get,
  getById,
  fileSave,
  getByUser,
  sendFile
};
