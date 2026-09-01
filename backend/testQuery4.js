import { dbService } from './src/services/dbService.js';
const test = dbService.getQuestionsFiltered({ 
  classStandard: 9, 
  chapterId: null, 
  topicId: null, 
  levelNumber: 1, 
  questionType: "puzzle" 
});
console.log("Returned puzzle count:", test.length);
