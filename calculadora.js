//Display
let display = document.getElementById('display')

// Array com os numeros digitados
let valores = [[], [], []]

// Variavel que atribui se valores vao para primeiro ou segundo array de numeros
let posicaoValor = 0

// Soma 2 numeros
const soma = (n1, n2) => n1 + n2

// Subtrai 2 numeros
const subtrai = (n1, n2) => n1 - n2

// Multiplica 2 numeros
const multiplica = (n1, n2) => n1 * n2

// Divide 2 numeros
const divide = (n1, n2) => n1 / n2

// Adiciona numero clicado ao array valores
function adicionaNum(e) {
    if (e.target.id == '.' && valores[1].length == 0) {
        valores[0].push(e.target.id)
    } else {
        valores[posicaoValor].push(e.target.id)
    }
    display.innerHTML += e.target.id
}

// Limpa valores
function limpa() {
    valores = [[], [], []]
    display.innerHTML = ''
    display.style.fontSize = '70px'
    posicaoValor = 0
}

// Verifica o tamanho em caracteres do numero
const tamanhoNumero = num => String(num).length

// Formata resultado para aparecer no display
function formataNumero(num) {
    indice = 0
    let res = `${num}`
    let tamanho = tamanhoNumero(num)
    while (num > 10 && tamanho > 6) {
        num = num / 10
        indice++
        res = `${num}x10<sup>${indice}</sup>`
    }
    while (num < -10 && tamanho > 6) {
        num = num / 10
        indice++
        res = `${num}x10<sup>${indice}</sup>`
    }
    while (num < 0.01 && num > 0 && tamanho > 6) {
        num = num * 10
        indice--
        res = `${num}x10<sup>${indice}</sup>`
    }
    while (num > -0.01 && num < 0 && tamanho > 6) {
        num = num * 10
        indice--
        res = `${num}x10<sup>${indice}</sup>`
    }

    // Se o resultado for em notação científica o tamanho da fonte diminui
    if (res.includes('x10')) {
        display.style.fontSize = '35px'
    }
    else {
        display.style.fontSize = '70px'
    }
    return res
}

function principal(e) {
    console.log(valores)
    if (valores[0] != 0) posicaoValor = 1
    let numeroAtual = valores[posicaoValor]
    if (e.target.id != '=') {
        if (e.target.id == '-') {
            // Checar se array ja é negativo
            if (!numeroAtual.includes('-')) {
                numeroAtual.push('-')
            }
            // Se usuario inserir '-' no meio do numero mostra erro no display
            if (valores[1].length > 1) {
                display.innerHTML = 'Erro!'
                return
            }
            display.innerHTML += e.target.id
            return
        } else {
            valores[2].push(e.target.id)
        }
    }

    // Se usuario chamar mais de uma operação seguida mostra erro no display
    if (valores[2].length > 1) {
        display.innerHTML = 'Erro!'
        return
    }
    display.innerHTML += e.target.id

    // Variavel que recebe o resultado da operação
    let res = 0


    // Pega valor do numero dentro dos arrays                
    n1 = parseFloat(valores[0].join(''))
    n2 = parseFloat(valores[1].join(''))

    // Quando o usuario clicar o sinal de igual
    if (e.target.id == '=') {
        let resultado = 0
        // Verifica qual operação foi chamada pelo usuario e calcula valor de respota
        if (valores[2] == '+') resultado = soma(n1, n2)
        else if (valores[2] == 0) resultado = soma(n1, n2)
        else if (valores[2] == 'x') resultado = multiplica(n1, n2)
        else if (valores[2] == '/') resultado = divide(n1, n2)
        res = parseFloat(resultado.toFixed(8))
        valores[0] = [res]
        valores[1] = []
        valores[2].pop()

        // Mostra resultado no display
        display.innerHTML = formataNumero(valores[0])

    }
}
