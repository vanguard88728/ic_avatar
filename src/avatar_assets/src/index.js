import { avatar } from "../../declarations/avatar";

document.getElementById("clickMeBtn").addEventListener("click", async () => {
  const name = document.getElementById("name").value.toString();
  // Interact with avatar actor, calling the greet method
  const greeting = await avatar.greet(name);

  document.getElementById("greeting").innerText = greeting;
});
