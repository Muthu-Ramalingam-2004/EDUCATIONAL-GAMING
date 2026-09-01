import { dbService } from './src/services/dbService.js';
const test = dbService.getQuestionsFiltered({ 
  classStandard: 9, 
  chapterId: null, 
  topicId: null, 
  levelNumber: 1, 
  questionType: "quiz" 
});
console.log("Returned count:", test.length);
if (test.length <= 5) {
  console.log("IDs:", test.map(q => q.id));
} else {
  console.log("Too many to list, first 5:", test.slice(0, 5).map(q => q.id));
}
