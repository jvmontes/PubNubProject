import ChatEngineCore from 'chat-engine';

let myChat;
let publish;

// setup up PubNub API keys
ChatEngine = ChatEngineCore.create({
    publishKey: 'pub-c-dd8ac8ce-c97f-4f98-8655-97063a7810ce',
    subscribeKey: 'sub-c-b0680b64-fa6f-11e8-ba8a-aef4d14eb57e'
});
// Provide a unique id and other profile information for your user here.
const uuid = String(new Date().getTime());
ChatEngine.connect(uuid, {
    nickName: "TestUserNickName",
    favoriteColor: "Teal"
});

ChatEngine.on('$.ready', (data) => {
    // store my user as me
    me = data.me;
    // create a new ChatEngine chat room
    myChat = new ChatEngine.Chat('chat-engine-demo-room');
    // connect to the chat room
    myChat.on('$.connected', () => {
        console.log('The chat is connected!');
        // when we receive messages in this chat, render them
        myChat.on('message', (message) => {
            console.log('Incoming Message: ', message);
        });
        // send a message to everyone in the chat room
        myChat.emit('message', {
            text: "Hi Everyone!"
        });
    });
});