const socket = io();

socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on("products", (products) => {
  fetch("http://localhost:3000/products.hbs")
    .then((res) => res.text())
    .then((text) => {
      const template = Handlebars.compile(text);
      const html = template({ prods: products });
      document.getElementById("products").innerHTML = html;
    });
});

socket.on("update-messages", (getMessages) => {
  document.getElementById("msg").innerHTML = "";

  getMessages
    .sort((a, b) => a.messagedate - b.messagedate)
    .forEach((msg) => createMessage(msg));
});

createMessage = (msg) => {
  document.getElementById("msg").innerHTML += `
    <div class="bg-dark bg-gradient p-2">
      <b><span class="text-primary">${msg.messageemail}</span><span class="text-danger">(${msg.messagedate}):</span></b> 
      <span class="text-success">${msg.messagecontent}</span>
    </div>
  `;
};

sendMessage = () => {
  const messageemail = document.getElementById("messageemail").value;
  const messagecontent = document.getElementById("messagecontent").value;

  socket.emit("post-message", { messageemail, messagecontent });

  document.getElementById("messagecontent").value = '';
};

clearFields = () => {
  document.getElementById("messageemail").value = '';
  document.getElementById("messagecontent").value = '';
}