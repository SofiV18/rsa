function generarClaves() {
 var p = parseInt(document.getElementById("p").value);
 var q = parseInt(document.getElementById("q").value);

 if (!esPrimo(p) || !esPrimo(q) || p < 1000 || p > 9999 || q < 1000 || q > 9999) {
   alert("Los valores utilizados para p y q deben ser números primos de 4 dígitos");
   return;
 }

 if (p === q) {
   alert("Los valores utilizados para p y q deben ser distintos");
   return;
 }

 var n = p * q;
 var fi = (p - 1) * (q - 1);

 var e = generarE(fi);
 var d = generarD(e, fi);

 document.getElementById("clavePublica").textContent = e;
 document.getElementById("clavePrivada").textContent = d;
 document.getElementById("calculoFi").textContent = "Cálculo de φ(n): fi = (" + p + " - 1) * (" + q + " - 1) = " + fi;
 document.getElementById("calculoN").textContent = "Cálculo de n: n = (" + p + ") * (" + q + ") = " + n;
 document.getElementById("calculoE").textContent = "Cálculo de e: 1 < e < fi(n) = " + e;
 document.getElementById("calculoD").textContent = "Cálculo de d: d = e^-1 mod fi = " + d;
}


function generarE(fi) {
 var e = 2;
 while (e < fi) {
   if (esPrimo(e) && esCoprimo(e, fi)) {
     return e;
   }
   e++;
 }
 return null;
}

function generarD(e, fi) {
 var d = inversoMultiplicativo(e, fi);
 return d;
}

function esPrimo(num) {
 for (var i = 2; i <= Math.sqrt(num); i++) {
   if (num % i === 0) {
     return false;
   }
 }
 return num > 1;
}

function esCoprimo(a, b) {
 while (b !== 0) {
   var temp = b;
   b = a % b;
   a = temp;
 }
 return a === 1;
}

function inversoMultiplicativo(a, m) {
 var originalM = m;
 var y = 0;
 var x = 1;

 while (a > 1) {
   var q = Math.floor(a / m);
   var temp = m;
   m = a % m;
   a = temp;
   temp = y;
   y = x - q * y;
   x = temp;
 }

 if (x < 0) {
   x += originalM;
 }

 return x;
}

function cifrarMensaje() {
 var mensaje = document.getElementById("mensaje").value;
 var e = parseInt(document.getElementById("clavePublica").textContent);
 var n = parseInt(document.getElementById("p").value) * parseInt(document.getElementById("q").value);

 var cifrado = [];

 for (var i = 0; i < mensaje.length; i++) {
   var charCode = mensaje.charCodeAt(i);
   cifrado.push(modularExponentiation(charCode, e, n));
 }

 document.getElementById("mensajeCifrado").value = cifrado.join(" ");
}

function modularExponentiation(base, exponente, n) {
 if (exponente === 0) {
   return 1;
 }

 var result = 1;
 base = base % n;

 while (exponente > 0) {
   if (exponente % 2 === 1) {
     result = (result * base) % n;
   }
   base = (base * base) % n;
   exponente = Math.floor(exponente / 2);
 }

 return result;
}

function descifrarMensaje() {
 var mensajeCifrado = document.getElementById("mensajeCifrado").value;
 var d = parseInt(document.getElementById("clavePrivada").textContent);
 var n = parseInt(document.getElementById("p").value) * parseInt(document.getElementById("q").value);

 var cifrado = mensajeCifrado.split(" ");
 var descifrado = [];

 for (var i = 0; i < cifrado.length; i++) {
   var charCode = modularExponentiation(parseInt(cifrado[i]), d, n);
   descifrado.push(String.fromCharCode(charCode));
 }

 document.getElementById("mensajeDescifrado").value = descifrado.join("");
}

function descifrarMensajeUsuario() {
 var mensajeCifrado = document.getElementById("mensajeCifradoUsuario").value;
 var d = parseInt(document.getElementById("clavePrivada").textContent);
 var n = parseInt(document.getElementById("p").value) * parseInt(document.getElementById("q").value);

 var cifrado = mensajeCifrado.split(" ");
 var descifrado = [];

 for (var i = 0; i < cifrado.length; i++) {
   var charCode = modularExponentiation(parseInt(cifrado[i]), d, n);
   descifrado.push(String.fromCharCode(charCode));
 }

 document.getElementById("mensajeDescifradoUsuario").value = descifrado.join("");
}