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
    .sort((a, b) => a.date - b.date)
    .forEach((msg) => createMessage(msg));
});

socket.on("new-message", (msg) => {
  createMessage(msg);
});

createMessage = (msg) => {
  document.getElementById("msg").innerHTML += `
    <div class="bg-dark bg-gradient p-2">
      <b><span class="text-primary">${msg.email}</span><span class="text-danger">(${msg.date}):</span></b> 
      <span class="text-success">${msg.message}</span>
    </div>
  `;
};

sendMessage = () => {
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  socket.emit("post-message", { email, message });

  document.getElementById("message").value = '';
};

clearFields = () => {
  document.getElementById("email").value = '';
  document.getElementById("message").value = '';
}