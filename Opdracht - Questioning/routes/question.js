exports.ask = function(req, res){
  res.render('ask', { title: 'Ask a question' });
};

exports.allQuestions = function(req, res){
  res.render('allquestions', { title: 'Ask a question' });
};