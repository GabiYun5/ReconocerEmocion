
var modelo = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/SXbAakvwg/model.json", listo)

function listo() {
    console.log("estoy listo!")
}

Webcam.set({
    width: 360, height: 265, image_format: "png", png_quality: 90
});

Webcam.attach("#camara")

function hablar(mensaje){
    var leva = window.speechSynthesis;
    var lectura = new SpeechSynthesisUtterance(mensaje);
    lectura.lang = "es"
    leva.speak(lectura)
}

function tomarFoto() {
    Webcam.snap(function (foto) {
        document.getElementById("resultado").innerHTML = '<img src="' + foto + '" id="foto">'
    })
}

function analizarFoto() {
    img = document.getElementById("foto");
    modelo.classify(img, resultados)
}

function resultados(error, respuesta){
    console.log(respuesta);
    e1 = respuesta[0].label
    e2 = respuesta[1].label
    document.getElementById("emocion1").innerHTML = e1 + emoji(e1)
    document.getElementById("emocion2").innerHTML = e2 + emoji(e2)
    hablar("Predicción 1," + e1 + ", Predicción 2" + e2)
}

function emoji(e) {
    switch (e) {
        case "feliz":
            return " 😄"
        case "enojado":
            return " 😠"
        case "triste":
            return " 😦"
        default:
            return "error"
            break;
    }
}