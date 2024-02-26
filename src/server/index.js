
const express = require('express');

const cors = require('cors');

const http = require('http');

const OpenAI = require('openai');



const PORT = process.env.PORT || 5000;

var app = express();
var server = http.createServer(app);

var io =  require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});
app.use(cors());
app.use(express.static('public'));

server.listen(PORT, () => console.log("Server has started listening at port " + PORT));

io.on('connection', function (io) {
    console.log('made socket connection', io.id);
    io.on('message', data => {
        console.log(data[0]);
        console.log(data[1])
        if(data[1] != "dall-e-3"){
            askQuestion(data[0], data[1], data[2]);
        } else {
            askImageQuestion(data[0], data[1], data[2]);
        }
      
    });

    io.on('disconnect', function() {
        console.log('user disconnected');
    });

});

async function askImageQuestion(question, model, apikey){

    const openai = new OpenAI({
         apiKey: apikey,
     });

    const image = await openai.images.generate({ model: model, prompt: question });

    io.send(image.data[0].url);
    console.log(image.data[0].url);

}

async function askQuestion(question, model, apikey) {

    const openai = new OpenAI({
         apiKey: apikey,
    });
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: question }],
      model: model,
    });
  
    io.send(">> " + question + "\n" + "\nClient-GPT: \n" + ">> " + completion.choices[0].message.content + "\n");
    console.log(completion.choices[0]);
  }

