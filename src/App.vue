<template>
  <div>
    <h1>Registrar Persona</h1>
    <form @submit.prevent="agregarPersona">
      <label for="nombre">Nombre:</label>
      <input v-model="nombre" id="nombre" type="text" required>
      <br>
      <label for="apellido">Apellido:</label>
      <input v-model="apellido" id="apellido" type="text" required>
      <br>
      <label for="edad">Edad:</label>
      <input v-model="edad" id="edad" type="number" required>
      <br>
      <button type="submit">Registrar</button>
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
    };
  },
  methods: {
    agregarPersona() {
      // Envía los datos al servidor Node.js
      fetch('http://localhost:3000/agregarPersona', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: this.nombre,
          apellido: this.apellido,
          edad: this.edad,
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data.message);
          // Limpia los campos del formulario
          this.nombre = '';
          this.apellido = '';
          this.edad = null;
        })
        .catch(error => {
          console.error('Error al registrar la persona:', error);
        });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
