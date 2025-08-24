// scripts/testDeleteFull.js
import fetch from "node-fetch";

const BASE_URL = "http://localhost:3000/api";
const EMAIL = "prueba@prueba.com";
const PASSWORD = "prueba1234";

async function testDelete() {
  try {
    // 1️⃣ Login para obtener token
    const loginRes = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
    });

    const loginText = await loginRes.text();
    let loginData;
    try {
      loginData = JSON.parse(loginText);
    } catch {
      console.error("Error parseando JSON del login:", loginText);
      return;
    }

    if (!loginRes.ok) {
      console.error("Login fallido:", loginData);
      return;
    }

    console.log("Login correcto, token obtenido:", loginData.token);

    // 2️⃣ Llamada al endpoint DELETE
    const deleteRes = await fetch(`${BASE_URL}/users/delete`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${loginData.token}`,
      },
    });

    const deleteText = await deleteRes.text();
    let deleteData;
    try {
      deleteData = JSON.parse(deleteText);
    } catch {
      console.error("Error parseando JSON del delete:", deleteText);
      return;
    }

    console.log("DELETE status:", deleteRes.status);
    console.log("Respuesta DELETE:", deleteData);
  } catch (err) {
    console.error("Error general:", err);
  }
}

testDelete();
