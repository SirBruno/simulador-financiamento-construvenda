// ######################### Taxa de Júros #########################
// Taxa de júros usada nos cálculos (ex. 0.6434),
// NÃO é necessário altera-la em nenhum outro lugar.
var taxaDeJuros = 0.6434;
// ######################### Taxa de Júros #########################

var options = {
  reverse: true,
  onKeyPress: function () {
    calcularFinanciamento();
  },
  onChange: function () {
    calcularFinanciamento();
  }
};

$(document).ready(function () {
  $('.money').mask('000.000.000.000.000,00', options);
});

function calcularFinanciamento() {

  var valorDoLote = document.querySelector('#valorDoLote').value.replace(/\./g, "").replace(/,/g, ".")
  var valorDaEntrada = document.querySelector('#valorDaEntrada').value.replace(/\./g, "").replace(/,/g, ".")
  valorDoFinanciamento = ((valorDoLote - valorDaEntrada).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

  if (!(valorDaEntrada >= (valorDoLote * 0.2)) && (valorDaEntrada != "")) {
    document.getElementById('errorMessage').style.color = 'red';
    document.getElementById('valorDaEntrada').style.color = 'red';
    document.getElementById('valorDaEntrada').style.border = 'thin solid red';
    document.getElementById('valorDoFinanciamento').style.textDecoration = 'line-through';
  } else {
    document.getElementById('errorMessage').style.color = 'black';
    document.getElementById('valorDaEntrada').style.color = 'black';
    document.getElementById('valorDaEntrada').style.border = 'thin solid #eee';
    document.getElementById('valorDoFinanciamento').style.textDecoration = 'none';
  }

  if ((valorDoLote != "") && (valorDaEntrada != "") && (valorDaEntrada >= (valorDoLote * 0.2))) {
    document.getElementById("valorDoFinanciamento").innerText = 'R$ ' + valorDoFinanciamento.replace(/\./g, "x").replace(/,/g, ".").replace(/\x/g, ",");

    function getValorParcelas(parcelas, noPmt) {

      var valueToCalculate = parseFloat(valorDoFinanciamento.replace(/\,/g, ""))

      function pmt(i, p, n) {
        i /= 100
        return i * p * Math.pow((1 + i), n) / (1 - Math.pow((1 + i), n))
      }

      if (noPmt) {
        return ((valueToCalculate / parcelas)
          .toFixed(2))
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
          .replace(/\./g, "x")
          .replace(/,/g, ".")
          .replace(/\x/g, ",")
      } else {
        return (
          // O primeiro valor passado pra essa função é a taxa de júros (ex. 0.6434)
          pmt(taxaDeJuros, -valueToCalculate, parcelas)
            .toFixed(2)
        )
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
          .replace(/\./g, "x")
          .replace(/,/g, ".")
          .replace(/\x/g, ",")
      }
    }

    document.getElementById("12parcelas").innerText = 'R$ ' + getValorParcelas(12, true);
    document.getElementById("18parcelas").innerText = 'R$ ' + getValorParcelas(18, false);
    document.getElementById("24parcelas").innerText = 'R$ ' + getValorParcelas(24, false);
    document.getElementById("30parcelas").innerText = 'R$ ' + getValorParcelas(30, false);
    document.getElementById("36parcelas").innerText = 'R$ ' + getValorParcelas(36, false);
    document.getElementById("48parcelas").innerText = 'R$ ' + getValorParcelas(48, false);
    document.getElementById("60parcelas").innerText = 'R$ ' + getValorParcelas(60, false);
    document.getElementById("120parcelas").innerText = 'R$ ' + getValorParcelas(120, false);
  }
}