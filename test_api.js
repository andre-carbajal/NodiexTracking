const jwt = require('jsonwebtoken');

const token = jwt.sign(
  { sub: "u-admin", id: "u-admin", username: "admin", role: "superadmin", roles: ["superadmin"] },
  "xGM0Kz5BiYjXbfnLKXyhB4IJH8shE0dbWhuxuoRDRI4",
  { expiresIn: 3600 }
);

async function test() {
  const res = await fetch("http://localhost:3000/api/admin", {
    headers: { "Authorization": `Bearer ${token}` }
  });
  
  console.log("Status:", res.status);
  const text = await res.text();
  console.log("Response:", text);
}

test();
