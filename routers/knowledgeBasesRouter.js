import express from 'express'
import multer from 'multer'
import { createKnowledgeBaseUsingFilesAndSave,createKnowledgeBaseUsingUrlsFilesAndSave,
    addFilesToSpecificKnowledgeBase,addUrlsToSpecificKnowledgeBaseV2, 
    createKnowledgeBaseUsingUrlsAndSave, deleteSpecificKnowledgeBase, 
    deleteSpecificKnowledgeBaseAllFiles, deleteSpecificKnowledgeBaseSpecificFile, 
    retriveKnowledgeBasesBellongWithAuthenticatedUser, createKnowledgeBaseV2UsingUrlsFilesAndSave, 
    addUrlsToSpecificKnowledgeBase, 
    createKnowledgeBaseV2UsingUrlsAndSave} from '../controllers/knowledgeBaseController.js';

const knowledgeBasesRouter = express.Router();
const upload = multer();//handle multipart formdata

knowledgeBasesRouter.get('/',retriveKnowledgeBasesBellongWithAuthenticatedUser) 
knowledgeBasesRouter.post('/all',upload.any(),createKnowledgeBaseUsingUrlsFilesAndSave);
knowledgeBasesRouter.post('/url', createKnowledgeBaseUsingUrlsAndSave);
knowledgeBasesRouter.post('/url', createKnowledgeBaseV2UsingUrlsAndSave);
knowledgeBasesRouter.post('/files',upload.any(), createKnowledgeBaseUsingFilesAndSave);
knowledgeBasesRouter.post('/files',upload.any(), createKnowledgeBaseV2UsingUrlsFilesAndSave);
knowledgeBasesRouter.post('/:knowledge_base_id/urls',addUrlsToSpecificKnowledgeBase)
knowledgeBasesRouter.post('/:knowledge_base_id/urls',addUrlsToSpecificKnowledgeBaseV2)
knowledgeBasesRouter.post('/:knowledge_base_id/files',upload.any(),addFilesToSpecificKnowledgeBase)
knowledgeBasesRouter.delete('/',deleteSpecificKnowledgeBase)
knowledgeBasesRouter.delete('/files',deleteSpecificKnowledgeBaseAllFiles)
knowledgeBasesRouter.delete('/file',deleteSpecificKnowledgeBaseSpecificFile)

export default  knowledgeBasesRouter