<template>
  <div>
    <h1>Registro de Usuario</h1>
    <form @submit.prevent="registrarUsuario">
      <label for="nombreRegistro">Nombre:</label>
      <input v-model="nombre" id="nombreRegistro" type="text" required>
      <br>
      <label for="apellidoRegistro">Apellido:</label>
      <input v-model="apellido" id="apellidoRegistro" type="text" required>
      <br>
      <label for="edadRegistro">Edad:</label>
      <input v-model="edad" id="edadRegistro" type="number" required>
      <br>
      <label for="usernameRegistro">Nombre de Usuario:</label>
      <input v-model="usernameRegistro" id="usernameRegistro" type="text" required>
      <br>
      <label for="passwordRegistro">Contraseña:</label>
      <input v-model="passwordRegistro" id="passwordRegistro" type="password" required>
      <br>
      <label for="rolRegistro">Rol:</label>
      <select v-model="rolRegistro" id="rolRegistro">
        <option value="usuario">Usuario</option>
        <option value="admin">Administrador</option>
      </select>
      <br>
      <button type="submit">Registrar</button>
    </form>

    <h1>Iniciar Sesión</h1>
    <form @submit.prevent="iniciarSesion">
      <label for="usernameInicioSesion">Nombre de Usuario:</label>
      <input v-model="usernameInicioSesion" id="usernameInicioSesion" type="text" required>
      <br>
      <label for="passwordInicioSesion">Contraseña:</label>
      <input v-model="passwordInicioSesion" id="passwordInicioSesion" type="password" required>
      <br>
      <button type="submit">Iniciar Sesión</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nombre: '',
      apellido: '',
      edad: null,
      usernameRegistro: '',
      passwordRegistro: '',
      rolRegistro: 'usuario',
      usernameInicioSesion: '',
      passwordInicioSesion: '',
    };
  },
  methods: {
    registrarUsuario() {
      fetch('http://localhost:3000/registrarUsuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: this.nombre,
          apellido: this.apellido,
          edad: this.edad,
          username: this.usernameRegistro,
          password: this.passwordRegistro,
          rol: this.rolRegistro,
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data.message);
          this.nombre = '';
          this.apellido = '';
          this.edad = null;
          this.usernameRegistro = '';
          this.passwordRegistro = '';
          this.rolRegistro = 'usuario';
        })
        .catch(error => {
          console.error('Error al registrar el usuario:', error);
        });
    },

    iniciarSesion() {
      fetch('http://localhost:3000/iniciarSesion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.usernameInicioSesion,
          password: this.passwordInicioSesion,
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data.message);
          this.usernameInicioSesion = '';
          this.passwordInicioSesion = '';
        })
        .catch(error => {
          console.error('Error al iniciar sesión:', error);
        });
    },
  },
};
</script>

<style>
/* Estilos CSS opcionales */
</style>
