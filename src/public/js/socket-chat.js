const socket = io();

let params = new URLSearchParams(window.location.search);

if (!params.has('user') && !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre es necesario');
}

let user = params.get('user');
let sala = params.get('sala');

socket.on('connect', () => {
    console.log('%cConectado ', 'color:green;font-size:20px')

    socket.emit('configurar-user',{user,sala},(resp)=>{
        if (resp.status === 200) {
            console.log(resp)
        }
    })
})

socket.on('crear-mensaje',(data)=>{
    console.table(data);
})

socket.on('disconnect', () => {
    console.log('%cDesconectado ', 'color:red;font-size:20px')
})

socket.emit('enviar-mensaje', {
    user,
    mensaje: 'Hola mundo'
}, (res) => {
    console.log('respuesta del servidor: ', res)
});

socket.on('lista-conectados',({users})=>{
    console.log(users);
})

socket.on('enviar-mensaje', (mensaje) => {
    console.log(mensaje)
});

socket.on('mensaje-privado',(mensaje)=>{
    console.log('mensaje privado',mensaje)
})

