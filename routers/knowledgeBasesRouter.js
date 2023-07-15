import express from 'express'
import { addUrlsToUSpecificKnowledgeBase, createKnowledgeBaseUsingUrlsAndSave, deleteSpecificKnowledgeBase, deleteSpecificKnowledgeBaseAllFiles, deleteSpecificKnowledgeBaseSpecificFile, retriveKnowledgeBasesBellongWithAuthenticatedUser } from '../controllers/knowledgeBaseController.js';

const knowledgeBasesRouter = express.Router();

knowledgeBasesRouter.get('/',retriveKnowledgeBasesBellongWithAuthenticatedUser) 
knowledgeBasesRouter.post('/url', createKnowledgeBaseUsingUrlsAndSave);
knowledgeBasesRouter.post('/:knowledge_base_id/urls',addUrlsToUSpecificKnowledgeBase)
knowledgeBasesRouter.delete('/',deleteSpecificKnowledgeBase)
knowledgeBasesRouter.delete('/files',deleteSpecificKnowledgeBaseAllFiles)
knowledgeBasesRouter.delete('/file',deleteSpecificKnowledgeBaseSpecificFile)

export default  knowledgeBasesRouter